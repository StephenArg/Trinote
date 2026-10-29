import SwiftUI
import UIKit

/// A to-do checkbox in one task state, drawn as Trilium draws it: a filled rounded box with the state's icon in white.
struct TaskStateBoxView: View {
    let state: TaskStateDefinition
    var size: CGFloat = 20

    @Environment(\.colorScheme) private var colorScheme

    private static let boxiconsAvailable = UIFont(name: BoxiconsCatalog.fontPostScriptName, size: 12) != nil

    private var glyph: Character? {
        // None is an empty box, as in Trilium.
        guard state.name != TaskStateCatalog.noneName, Self.boxiconsAvailable,
              BoxiconsResolver.isCatalogIcon(state.iconClass)
        else { return nil }
        return BoxiconsResolver.glyphCharacter(from: state.iconClass)
    }

    var body: some View {
        RoundedRectangle(cornerRadius: size * 4 / 18, style: .continuous)
            .fill(Color(uiColor: TaskStateStyles.fillColor(for: state, dark: colorScheme == .dark)))
            .frame(width: size, height: size)
            .overlay {
                if let glyph {
                    Text(String(glyph))
                        .font(.custom(BoxiconsCatalog.fontPostScriptName, fixedSize: size * 0.8))
                        .foregroundStyle(.white)
                }
            }
            .accessibilityHidden(true)
    }
}

/// The menu a held checkbox opens: the visible states in the server's order, the current one ticked, then Edit States.
struct TaskStateMenuView: View {
    let states: [TaskStateDefinition]
    let current: String
    var onPick: (String) -> Void
    var onEditStates: (() -> Void)?

    static let rowHeight: CGFloat = 44
    static let width: CGFloat = 250

    static func contentHeight(stateCount: Int, hasEditRow: Bool) -> CGFloat {
        CGFloat(stateCount) * rowHeight + (hasEditRow ? rowHeight + 1 : 0) + 12
    }

    var body: some View {
        VStack(spacing: 0) {
            ForEach(states) { state in
                Button {
                    onPick(state.name)
                } label: {
                    HStack(spacing: 12) {
                        TaskStateBoxView(state: state, size: 20)
                        Text(state.displayTitle)
                            .foregroundStyle(.primary)
                            .lineLimit(1)
                        Spacer(minLength: 4)
                        if state.name == current {
                            Image(systemName: "checkmark")
                                .font(.body.weight(.semibold))
                                .foregroundStyle(Color.accentColor)
                        }
                    }
                    .padding(.horizontal, 16)
                    .frame(height: Self.rowHeight)
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel(state.displayTitle)
                .accessibilityAddTraits(state.name == current ? .isSelected : [])
            }
            if let onEditStates {
                Divider()
                Button(action: onEditStates) {
                    HStack(spacing: 12) {
                        Image(systemName: "pencil")
                            .frame(width: 20)
                        Text(String(localized: "Edit States…", comment: "To-do state menu: open the task states settings"))
                        Spacer()
                    }
                    .foregroundStyle(Color.accentColor)
                    .padding(.horizontal, 16)
                    .frame(height: Self.rowHeight)
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.vertical, 6)
        .frame(width: Self.width)
    }
}

/// Shows `TaskStateMenuView` as a popover pointing at a checkbox, also on iPhone.
@MainActor
enum TaskStateMenuPresenter {
    private final class PopoverDelegate: NSObject, UIPopoverPresentationControllerDelegate {
        func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
            .none
        }
    }

    private static let delegate = PopoverDelegate()

    /// `rect` is in `sourceView`'s coordinates. `onPick` gets the chosen state's name after the menu closes.
    static func present(
        states: [TaskStateDefinition],
        current: String,
        from sourceView: UIView,
        rect: CGRect,
        onPick: @escaping (String) -> Void,
        onEditStates: (() -> Void)?
    ) {
        guard let presenter = NavigationControllerFinder.topViewController() else { return }
        weak var hosting: UIHostingController<TaskStateMenuView>?
        let menu = TaskStateMenuView(
            states: states,
            current: current,
            onPick: { name in hosting?.dismiss(animated: true) { onPick(name) } },
            onEditStates: onEditStates.map { edit in { hosting?.dismiss(animated: true) { edit() } } }
        )
        let controller = UIHostingController(rootView: menu)
        hosting = controller
        controller.modalPresentationStyle = .popover
        controller.preferredContentSize = CGSize(
            width: TaskStateMenuView.width,
            height: TaskStateMenuView.contentHeight(stateCount: states.count, hasEditRow: onEditStates != nil)
        )
        if let popover = controller.popoverPresentationController {
            popover.sourceView = sourceView
            popover.sourceRect = rect.insetBy(dx: -4, dy: -4)
            popover.permittedArrowDirections = [.up, .down]
            popover.delegate = delegate
        }
        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
        presenter.present(controller, animated: true)
    }
}
