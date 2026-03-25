import SwiftUI
import UIKit

/// Drives a `UIContextMenuInteraction` so the Share / Sharing toggle can use `keepsMenuPresented` and
/// `updateVisibleMenu` — SwiftUI’s `.contextMenu` snapshots content and cannot refresh while open.
struct TreeListRowContextMenuModel {
    var note: NoteItem
    var vm: TreeViewModel
    var isFavorite: Bool
    var duplicateParentNoteId: String
    var isRootRow: Bool
    var client: (any TriliumClientProtocol)?
    var onNewNote: () -> Void
    var onDuplicateSuccess: (NoteItem) -> Void
    var onFavoriteToggle: () -> Void
    var onDelete: () -> Void
    /// Caller should defer flipping the sheet binding (e.g. two `DispatchQueue.main.async`) so presentation waits until the UIKit context menu has dismissed.
    var onPresentShareSheet: (URL) -> Void
    var onSharingError: (String) -> Void
}

struct TreeListRowUIKitContextMenu<Content: View>: UIViewRepresentable {
    var model: TreeListRowContextMenuModel
    @ViewBuilder var content: () -> Content

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> UIView {
        let coordinator = context.coordinator
        coordinator.model = model
        let host = UIHostingController(rootView: AnyView(content()))
        host.view.backgroundColor = .clear
        host.view.translatesAutoresizingMaskIntoConstraints = false
        coordinator.hostingController = host

        let box = UIView()
        box.backgroundColor = .clear
        box.addSubview(host.view)
        NSLayoutConstraint.activate([
            host.view.topAnchor.constraint(equalTo: box.topAnchor),
            host.view.leadingAnchor.constraint(equalTo: box.leadingAnchor),
            host.view.trailingAnchor.constraint(equalTo: box.trailingAnchor),
            host.view.bottomAnchor.constraint(equalTo: box.bottomAnchor),
        ])

        let interaction = UIContextMenuInteraction(delegate: coordinator)
        host.view.addInteraction(interaction)
        coordinator.menuInteraction = interaction

        return box
    }

    func updateUIView(_ uiView: UIView, context: Context) {
        context.coordinator.model = model
        context.coordinator.hostingController?.rootView = AnyView(content())
    }

    func sizeThatFits(_ proposal: ProposedViewSize, uiView: UIView, context: Context) -> CGSize? {
        guard let host = context.coordinator.hostingController else { return nil }
        let w = proposal.width ?? UIView.layoutFittingExpandedSize.width
        let target = CGSize(width: w, height: UIView.layoutFittingCompressedSize.height)
        let fitted = host.sizeThatFits(in: target)
        return CGSize(width: w, height: max(fitted.height, 44))
    }

    final class Coordinator: NSObject, UIContextMenuInteractionDelegate {
        var model: TreeListRowContextMenuModel!
        var hostingController: UIHostingController<AnyView>?
        weak var menuInteraction: UIContextMenuInteraction?
        private var shareToggleInFlightNoteId: String?

        func contextMenuInteraction(_ interaction: UIContextMenuInteraction, configurationForMenuAtLocation location: CGPoint) -> UIContextMenuConfiguration? {
            menuInteraction = interaction
            return UIContextMenuConfiguration(identifier: nil, previewProvider: nil) { [weak self] _ in
                guard let self else { return nil }
                return UIMenu(title: "", children: self.buildMenuChildren())
            }
        }

        /// Anchor the menu near the **leading** edge of the row so it opens toward the left (LTR) instead of from the trailing side.
        func contextMenuInteraction(
            _ interaction: UIContextMenuInteraction,
            previewForHighlightingMenuWith _: UIContextMenuConfiguration
        ) -> UITargetedPreview? {
            leadingEdgeMenuPreview(interaction: interaction)
        }

        func contextMenuInteraction(
            _ interaction: UIContextMenuInteraction,
            previewForDismissingMenuWith _: UIContextMenuConfiguration
        ) -> UITargetedPreview? {
            leadingEdgeMenuPreview(interaction: interaction)
        }

        private func leadingEdgeMenuPreview(interaction: UIContextMenuInteraction) -> UITargetedPreview? {
            guard let view = interaction.view else { return nil }
            let bounds = view.bounds
            let inset = min(28.0, max(8.0, bounds.width * 0.12))
            let x: CGFloat
            switch view.effectiveUserInterfaceLayoutDirection {
            case .rightToLeft:
                x = bounds.maxX - inset
            default:
                x = bounds.minX + inset
            }
            let center = CGPoint(x: x, y: bounds.midY)
            let parameters = UIPreviewParameters()
            parameters.backgroundColor = .clear
            let target = UIPreviewTarget(container: view, center: center)
            return UITargetedPreview(view: view, parameters: parameters, target: target)
        }

        private func buildMenuChildren() -> [UIMenuElement] {
            var children: [UIMenuElement] = []

            children.append(UIAction(
                title: String(localized: "New Note"),
                image: UIImage(systemName: "plus")
            ) { [weak self] _ in
                guard let self else { return }
                DispatchQueue.main.async {
                    self.model.onNewNote()
                }
            })

            if !model.isRootRow {
                if !model.note.isProtected {
                    children.append(UIAction(
                        title: String(localized: "Duplicate Note"),
                        image: UIImage(systemName: "doc.on.doc")
                    ) { [weak self] _ in
                        guard let self else { return }
                        Task { @MainActor in
                            if let newNote = await self.model.vm.duplicateNote(
                                sourceNoteId: self.model.note.noteId,
                                parentNoteId: self.model.duplicateParentNoteId
                            ) {
                                self.model.onDuplicateSuccess(newNote)
                            }
                        }
                    })
                }

                children.append(contentsOf: shareMenuElements())

                children.append(UIAction(
                    title: model.isFavorite
                        ? String(localized: "Remove from Favorites")
                        : String(localized: "Add to Favorites"),
                    image: UIImage(systemName: model.isFavorite ? "star.slash" : "star")
                ) { [weak self] _ in
                    guard let self else { return }
                    DispatchQueue.main.async {
                        self.model.onFavoriteToggle()
                    }
                })

                children.append(UIAction(
                    title: String(localized: "Delete Note"),
                    image: UIImage(systemName: "trash"),
                    attributes: .destructive
                ) { [weak self] _ in
                    guard let self else { return }
                    DispatchQueue.main.async {
                        self.model.onDelete()
                    }
                })
            }

            return children
        }

        private func shareMenuElements() -> [UIMenuElement] {
            let note = model.note
            let forbidden =
                note.noteId.hasPrefix("_options")
                || [TriliumSharing.shareRootNoteId, "_hidden"].contains(note.noteId)
            if forbidden {
                return []
            }
            if note.isProtected {
                return [
                    UIAction(
                        title: String(localized: "Sharing unavailable (protected note)", comment: "Share menu disabled"),
                        image: UIImage(systemName: "lock.fill"),
                        attributes: .disabled
                    ) { _ in },
                ]
            }
            if model.client == nil {
                return [
                    UIAction(
                        title: String(localized: "Sharing requires connection", comment: "Share menu offline"),
                        image: UIImage(systemName: "wifi.slash"),
                        attributes: .disabled
                    ) { _ in },
                ]
            }

            var elements: [UIMenuElement] = [makeShareToggleAction()]
            if appearsShared(note) {
                elements.append(UIAction(
                    title: String(localized: "Copy share link", comment: "Copy public Trilium URL"),
                    image: UIImage(systemName: "doc.on.doc")
                ) { [weak self] _ in
                    guard let self else { return }
                    Task { @MainActor in
                        await self.copyShareLink()
                    }
                })
                elements.append(UIAction(
                    title: String(localized: "Share link…", comment: "System share sheet for URL"),
                    image: UIImage(systemName: "square.and.arrow.up")
                ) { [weak self] _ in
                    guard let self else { return }
                    Task { @MainActor in
                        await self.presentShareSheet()
                    }
                })
            }
            return elements
        }

        private func appearsShared(_ note: NoteItem) -> Bool {
            TriliumSharing.isPublishedUnderShareRoot(note: note) || note.showsSharingBadge
        }

        private func makeShareToggleAction() -> UIAction {
            let note = model.note
            let appears = appearsShared(note)
            let title = appears
                ? String(localized: "Sharing ✓", comment: "Note overflow: public link when enabled")
                : String(localized: "Share", comment: "Note overflow: public link when disabled")
            let busy = shareToggleInFlightNoteId == note.noteId
            var attrs: UIMenuElement.Attributes = [.keepsMenuPresented]
            if busy {
                attrs.insert(.disabled)
            }
            return UIAction(
                title: title,
                image: UIImage(systemName: "scale.3d"),
                attributes: attrs
            ) { [weak self] _ in
                guard let self else { return }
                Task { @MainActor in
                    await self.handleShareToggle()
                }
            }
        }

        @MainActor
        private func refreshMenu() {
            menuInteraction?.updateVisibleMenu { [weak self] _ in
                guard let self else { return UIMenu(title: "", children: []) }
                return UIMenu(title: "", children: self.buildMenuChildren())
            }
        }

        @MainActor
        private func handleShareToggle() async {
            let noteId = model.note.noteId
            shareToggleInFlightNoteId = noteId
            refreshMenu()
            defer {
                shareToggleInFlightNoteId = nil
                refreshMenu()
            }
            guard let client = model.client else {
                model.onSharingError(String(localized: "Cannot change sharing while offline.", comment: "Share toggle without client"))
                return
            }
            do {
                let patched = try await model.vm.performPublicShareToggle(noteId: noteId, client: client)
                model.note = model.vm.noteItem(for: noteId) ?? patched
                refreshMenu()
            } catch let pe as TriliumSharing.PublicSharingMutationError {
                model.onSharingError(pe.localizedDescription)
            } catch {
                model.onSharingError(APIError.from(error).localizedDescription)
            }
        }

        @MainActor
        private func copyShareLink() async {
            guard let client = model.client else { return }
            let base = await client.baseURL
            guard let u = TriliumSharing.publicShareURL(baseURL: base, note: model.note) else { return }
            UIPasteboard.general.string = u.absoluteString
        }

        @MainActor
        private func presentShareSheet() async {
            guard let client = model.client else { return }
            let base = await client.baseURL
            guard let u = TriliumSharing.publicShareURL(baseURL: base, note: model.note) else { return }
            model.onPresentShareSheet(u)
        }
    }
}
