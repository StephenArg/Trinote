import SwiftUI
import UIKit

enum IncludeEmbedMenuAction: Equatable {
    case open
    case openInNewTab
    case change(ContentEmbedEdit.Change)
    /// "Show Caption" on a card without one: the text has to be asked for first.
    case askForCaption
}

struct IncludeEmbedMenuView: View {
    private enum Page {
        case main, size, position
    }

    let model: IncludeEmbedMenuModel
    var onAction: (IncludeEmbedMenuAction) -> Void
    var onHeightChange: (CGFloat) -> Void

    @State private var page = Page.main

    static let width: CGFloat = 260
    private static let rowHeight: CGFloat = 44
    private static let headerHeight: CGFloat = 30

    private static func mainHeight(_ model: IncludeEmbedMenuModel) -> CGFloat {
        var rows = 1 + (model.canOpenInNewTab ? 1 : 0)
        if model.canChange {
            rows += 3
            if model.offersEditable { rows += 1 }
            if !model.breakPositions.isEmpty { rows += 1 }
            if model.offersTitleAndCaption { rows += 2 }
        }
        return CGFloat(rows) * rowHeight + 14
    }

    /// A first guess, until the menu has measured itself.
    static func preferredHeight(for model: IncludeEmbedMenuModel) -> CGFloat {
        mainHeight(model)
    }

    private func show(_ next: Page) {
        page = next
    }

    /// The rows scroll: a popover given less room than they need (the keyboard up, the button mid-screen) would otherwise
    /// cut off the first and last ones. Their measured height becomes the popover's, page by page.
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                switch page {
                case .main: mainPage
                case .size: sizePage
                case .position: positionPage
                }
            }
            .padding(.vertical, 6)
            .onGeometryChange(for: CGFloat.self) { $0.size.height } action: { height in
                onHeightChange(height)
            }
        }
        .scrollBounceBehavior(.basedOnSize)
    }

    @ViewBuilder
    private var mainPage: some View {
        row(String(localized: "Open", comment: "Include note open button"), systemImage: "arrow.right.to.line") { onAction(.open) }
        if model.canOpenInNewTab {
            row(String(localized: "Open in New Tab", comment: "Included note menu"), systemImage: "plus.square.on.square") { onAction(.openInNewTab) }
        }
        if model.canChange {
            Divider()
            if model.offersEditable {
                row(String(localized: "Editable", comment: "Included note menu: can be edited in place on desktop"), systemImage: "square.and.pencil", isChecked: model.isEditable) {
                    onAction(.change(.editable(!model.isEditable)))
                }
            }
            row(String(localized: "Size", comment: "Included note menu"), systemImage: "arrow.up.and.down", opensPage: true) { show(.size) }
            if !model.breakPositions.isEmpty {
                row(String(localized: "Position", comment: "Included note menu"), systemImage: "text.alignleft", opensPage: true) { show(.position) }
            }
            if model.offersTitleAndCaption {
                row(String(localized: "Show Title", comment: "Included note menu"), systemImage: "macwindow", isChecked: model.isTitleShown, isEnabled: model.canToggleTitle) {
                    onAction(.change(.showTitle(!model.isTitleShown)))
                }
                row(String(localized: "Show Caption", comment: "Included note menu"), systemImage: "captions.bubble", isChecked: model.hasCaption, isEnabled: model.canToggleCaption) {
                    onAction(model.hasCaption ? .change(.caption(nil)) : .askForCaption)
                }
            }
            Divider()
            row(String(localized: "Delete Block", comment: "Included note menu: removes the embed from this note"), systemImage: "trash", isDestructive: true) {
                onAction(.change(.delete))
            }
            row(String(localized: "Convert to Link", comment: "Included note menu"), systemImage: "link") {
                onAction(.change(.convertToLink(title: "")))
            }
        }
    }

    @ViewBuilder
    private var sizePage: some View {
        backRow(String(localized: "Size", comment: "Included note menu"))
        if let defaultSize = model.defaultSize {
            row(String(localized: "Default", comment: "Included note size: what it started with"), isEnabled: !model.isAtDefaultSize) {
                onAction(.change(.defaultSize(defaultSize)))
            }
        }
        ForEach(model.sizes, id: \.value) { option in
            row(option.title, isChecked: option.value == model.currentSize) {
                onAction(.change(.size(option.value)))
            }
        }
    }

    @ViewBuilder
    private var positionPage: some View {
        backRow(String(localized: "Position", comment: "Included note menu"))
        header(String(localized: "Break Text", comment: "Included note position group: on lines of its own"))
        ForEach(model.breakPositions, id: \.value) { option in
            row(option.title, isChecked: option.value == (model.currentPosition ?? "center")) {
                onAction(.change(.position(option.value == "center" ? nil : option.value)))
            }
        }
        if !model.wrapPositions.isEmpty {
            header(String(localized: "Wrap Text", comment: "Included note position group: text runs beside it"))
            ForEach(model.wrapPositions, id: \.value) { option in
                row(option.title, isChecked: option.value == model.currentPosition) {
                    onAction(.change(.position(option.value)))
                }
            }
        }
    }

    private func header(_ title: String) -> some View {
        Text(title)
            .font(.caption.weight(.semibold))
            .foregroundStyle(.secondary)
            .padding(.horizontal, 16)
            .frame(maxWidth: .infinity, minHeight: Self.headerHeight, alignment: .leading)
    }

    private func backRow(_ title: String) -> some View {
        Button {
            show(.main)
        } label: {
            HStack(spacing: 8) {
                Image(systemName: "chevron.left")
                    .font(.footnote.weight(.semibold))
                Text(title)
                    .font(.body.weight(.semibold))
                Spacer()
            }
            .foregroundStyle(.primary)
            .padding(.horizontal, 16)
            .frame(height: Self.rowHeight)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(String(localized: "Back", comment: "Back from note detail"))
    }

    private func row(
        _ title: String,
        systemImage: String? = nil,
        isChecked: Bool = false,
        isEnabled: Bool = true,
        isDestructive: Bool = false,
        opensPage: Bool = false,
        action: @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            HStack(spacing: 12) {
                if let systemImage {
                    Image(systemName: systemImage)
                        .frame(width: 20)
                        .accessibilityHidden(true)
                }
                Text(title)
                    .lineLimit(1)
                Spacer(minLength: 4)
                if isChecked {
                    Image(systemName: "checkmark")
                        .font(.body.weight(.semibold))
                } else if opensPage {
                    Image(systemName: "chevron.right")
                        .font(.footnote.weight(.semibold))
                        .foregroundStyle(.secondary)
                }
            }
            .foregroundStyle(isDestructive ? Color.red : Color.primary)
            .padding(.horizontal, 16)
            .frame(height: Self.rowHeight)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .disabled(!isEnabled)
        .opacity(isEnabled ? 1 : 0.4)
        .accessibilityAddTraits(isChecked ? .isSelected : [])
    }
}

@MainActor
enum IncludeEmbedMenuPresenter {
    private final class PopoverDelegate: NSObject, UIPopoverPresentationControllerDelegate {
        func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
            .none
        }
    }

    private static let delegate = PopoverDelegate()

    /// Tells when it's gone, however it went (a choice, a tap outside).
    private final class MenuHostingController: UIHostingController<IncludeEmbedMenuView> {
        var onDisappear: (() -> Void)?

        override func viewDidDisappear(_ animated: Bool) {
            super.viewDidDisappear(animated)
            onDisappear?()
            onDisappear = nil
        }
    }

    /// `rect` is in `sourceView`'s coordinates. `onAction` runs after the menu closes; `onDismiss` whenever it closes.
    static func present(
        model: IncludeEmbedMenuModel,
        from sourceView: UIView,
        rect: CGRect,
        onDismiss: (() -> Void)? = nil,
        onAction: @escaping (IncludeEmbedMenuAction) -> Void
    ) {
        weak var hosting: MenuHostingController?
        let menu = IncludeEmbedMenuView(
            model: model,
            onAction: { action in hosting?.dismiss(animated: true) { onAction(action) } },
            onHeightChange: { height in
                hosting?.preferredContentSize = CGSize(width: IncludeEmbedMenuView.width, height: height)
            }
        )
        let controller = MenuHostingController(rootView: menu)
        controller.onDisappear = onDismiss
        hosting = controller
        controller.modalPresentationStyle = .popover
        controller.preferredContentSize = CGSize(
            width: IncludeEmbedMenuView.width,
            height: IncludeEmbedMenuView.preferredHeight(for: model)
        )
        if let popover = controller.popoverPresentationController {
            popover.sourceView = sourceView
            popover.sourceRect = rect.insetBy(dx: -4, dy: -4)
            // Beside the button too: there's usually far more height there than above or below it.
            popover.permittedArrowDirections = .any
            popover.delegate = delegate
        }
        present(controller, from: sourceView, retriesLeft: 2)
    }

    /// Presents from the controller showing `sourceView`, not whatever the key window shows on top: just after the
    /// editor opens, that can be one still on its way in or out, and iOS then drops the popover without a word. If it
    /// didn't take, it's tried again a moment later.
    private static func present(_ controller: UIViewController, from sourceView: UIView, retriesLeft: Int) {
        guard let presenter = presenter(for: sourceView) else {
            retry(controller, from: sourceView, retriesLeft: retriesLeft)
            return
        }
        presenter.present(controller, animated: true)
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            guard controller.presentingViewController == nil else { return }
            retry(controller, from: sourceView, retriesLeft: retriesLeft)
        }
    }

    private static func retry(_ controller: UIViewController, from sourceView: UIView, retriesLeft: Int) {
        guard retriesLeft > 0, sourceView.window != nil else {
            (controller as? MenuHostingController)?.onDisappear?()
            return
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
            present(controller, from: sourceView, retriesLeft: retriesLeft - 1)
        }
    }

    /// The view controller whose view holds `view`, then whatever it shows on top that's settled in a window.
    static func presenter(for view: UIView) -> UIViewController? {
        var responder: UIResponder? = view
        var owner: UIViewController?
        while let next = responder?.next {
            if let controller = next as? UIViewController {
                owner = controller
                break
            }
            responder = next
        }
        guard var top = owner ?? NavigationControllerFinder.topViewController() else { return nil }
        while let presented = top.presentedViewController, !presented.isBeingDismissed, presented.viewIfLoaded?.window != nil {
            top = presented
        }
        guard top.viewIfLoaded?.window != nil, !top.isBeingDismissed, !top.isBeingPresented else { return nil }
        return top
    }

    static func askForCaption(onAdd: @escaping (String) -> Void) {
        guard let presenter = NavigationControllerFinder.topViewController() else { return }
        let alert = UIAlertController(title: String(localized: "Caption", comment: "Included note: title of the caption prompt"), message: nil, preferredStyle: .alert)
        alert.addTextField()
        alert.addAction(UIAlertAction(title: String(localized: "Cancel", comment: "Cancel"), style: .cancel))
        alert.addAction(UIAlertAction(title: String(localized: "Add", comment: "Add the caption"), style: .default) { [weak alert] _ in
            onAdd(alert?.textFields?.first?.text ?? "")
        })
        presenter.present(alert, animated: true)
    }
}
