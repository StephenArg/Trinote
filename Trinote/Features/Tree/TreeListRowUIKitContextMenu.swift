import SwiftUI
import UIKit

/// Drives a `UIContextMenuInteraction` so the Share / Sharing toggle can use `keepsMenuPresented` and
/// `updateVisibleMenu` — SwiftUI's `.contextMenu` snapshots content and cannot refresh while open.
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
    var onPresentShareSheet: (URL) -> Void
    var onSharingError: (String) -> Void
    var onShareLocally: () -> Void
    var onCopyToAnotherInstance: () -> Void
    var showsCopyToAnotherInstance: Bool
    var onMove: () -> Void
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
        host.view.clipsToBounds = true
        host.view.translatesAutoresizingMaskIntoConstraints = false
        coordinator.hostingController = host

        let box = UIView()
        box.backgroundColor = .clear
        box.clipsToBounds = true
        box.addSubview(host.view)
        NSLayoutConstraint.activate([
            host.view.topAnchor.constraint(equalTo: box.topAnchor),
            host.view.leadingAnchor.constraint(equalTo: box.leadingAnchor),
            host.view.trailingAnchor.constraint(equalTo: box.trailingAnchor),
            host.view.bottomAnchor.constraint(equalTo: box.bottomAnchor),
        ])

        // Attach interaction to the container that lives in UIKit's hierarchy.
        // Attaching to `host.view` makes UIKit resolve the detached `UIHostingController`
        // as presenter, which triggers "presenting from detached view controller".
        let interaction = UIContextMenuInteraction(delegate: coordinator)
        box.addInteraction(interaction)
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
        return CGSize(width: w, height: ceil(max(fitted.height, 44)))
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

        /// Sibling `UIMenu` sections (each `.displayInline`) get system separators between groups — unlike a flat list of actions.
        private func buildMenuChildren() -> [UIMenuElement] {
            let newNote = UIAction(
                title: String(localized: "New Note"),
                image: UIImage(systemName: "plus")
            ) { [weak self] _ in
                guard let self else { return }
                DispatchQueue.main.async {
                    self.model.onNewNote()
                }
            }

            var sections: [UIMenuElement] = [
                UIMenu(title: "", options: .displayInline, children: [newNote]),
            ]

            guard !model.isRootRow else { return sections }

            var duplicateMove: [UIMenuElement] = []
            if !model.note.isProtected {
                duplicateMove.append(UIAction(
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
            if !model.note.isProtected, model.client != nil {
                duplicateMove.append(UIAction(
                    title: String(localized: "Move", comment: "Tree context menu: move note under another parent"),
                    image: UIImage(systemName: "arrow.forward.folder")
                ) { [weak self] _ in
                    guard let self else { return }
                    DispatchQueue.main.async {
                        self.model.onMove()
                    }
                })
            }
            if !duplicateMove.isEmpty {
                sections.append(UIMenu(title: "", options: .displayInline, children: duplicateMove))
            }

            let share = shareMenuElements()
            if !share.isEmpty {
                sections.append(UIMenu(title: "", options: .displayInline, children: share))
            }

            let favorite = UIAction(
                title: model.isFavorite
                    ? String(localized: "Remove from Favorites")
                    : String(localized: "Add to Favorites"),
                image: UIImage(systemName: model.isFavorite ? "star.slash" : "star")
            ) { [weak self] _ in
                guard let self else { return }
                DispatchQueue.main.async {
                    self.model.onFavoriteToggle()
                }
            }
            let delete = UIAction(
                title: String(localized: "Delete Note"),
                image: UIImage(systemName: "trash"),
                attributes: .destructive
            ) { [weak self] _ in
                guard let self else { return }
                DispatchQueue.main.async {
                    self.model.onDelete()
                }
            }
            sections.append(UIMenu(title: "", options: .displayInline, children: [favorite, delete]))

            return sections
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
                var disabled: [UIMenuElement] = [
                    UIAction(
                        title: String(localized: "Share locally unavailable (protected note)", comment: "Local share disabled"),
                        image: UIImage(systemName: "lock.fill"),
                        attributes: .disabled
                    ) { _ in },
                ]
                if model.showsCopyToAnotherInstance {
                    disabled.append(
                        UIAction(
                            title: String(localized: "Copy to Instance unavailable (protected note)", comment: "Copy to instance disabled"),
                            image: UIImage(systemName: "lock.fill"),
                            attributes: .disabled
                        ) { _ in }
                    )
                }
                disabled.append(
                    UIAction(
                        title: String(localized: "Sharing unavailable (protected note)", comment: "Share menu disabled"),
                        image: UIImage(systemName: "lock.fill"),
                        attributes: .disabled
                    ) { _ in }
                )
                return disabled
            }

            var elements: [UIMenuElement] = [
                UIAction(
                    title: String(localized: "Share locally", comment: "Note overflow: nearby device transfer"),
                    image: UIImage(systemName: "square.and.arrow.up")
                ) { [weak self] _ in
                    guard let self else { return }
                    DispatchQueue.main.async {
                        self.model.onShareLocally()
                    }
                },
            ]
            if model.showsCopyToAnotherInstance {
                elements.append(
                    UIAction(
                        title: String(localized: "Copy to Instance…", comment: "Tree context menu: copy note to another signed-in instance"),
                        image: UIImage(systemName: "square.on.square")
                    ) { [weak self] _ in
                        guard let self else { return }
                        DispatchQueue.main.async {
                            self.model.onCopyToAnotherInstance()
                        }
                    }
                )
            }
            if model.client == nil {
                return elements + [
                    UIAction(
                        title: String(localized: "Sharing requires connection", comment: "Share menu offline"),
                        image: UIImage(systemName: "wifi.slash"),
                        attributes: .disabled
                    ) { _ in },
                ]
            }

            elements.append(makeShareToggleAction())
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
