import SwiftUI
import UniformTypeIdentifiers

/// A tree row dragged out of the tree in the iPad layout: dropped in the rich-text editor it becomes a link to the
/// note (the HTML representation). Reordering within the tree is the List's own `onMove`.
struct TreeNoteDrag: Codable {
    /// Declared in Info.plist (`UTExportedTypeDeclarations`).
    static let type = UTType(exportedAs: "com.trinote.tree-note")

    let noteId: String
    let branchId: String
    let parentNoteId: String
    let title: String

    func itemProvider() -> NSItemProvider {
        let provider = NSItemProvider()
        provider.suggestedName = title
        if let json = try? JSONEncoder().encode(self) {
            provider.registerDataRepresentation(forTypeIdentifier: Self.type.identifier, visibility: .ownProcess) { completion in
                completion(json, nil)
                return nil
            }
        }
        // Trilium's internal link markup; the editor keeps `reference-link` on `#root/…` links.
        let html = "<a class=\"reference-link\" href=\"#root/\(noteId)\">\(Self.escapedHTML(title))</a>"
        provider.registerDataRepresentation(forTypeIdentifier: UTType.html.identifier, visibility: .ownProcess) { completion in
            completion(Data(html.utf8), nil)
            return nil
        }
        provider.registerObject(title as NSString, visibility: .all)
        return provider
    }

    private static func escapedHTML(_ text: String) -> String {
        text
            .replacingOccurrences(of: "&", with: "&amp;")
            .replacingOccurrences(of: "<", with: "&lt;")
            .replacingOccurrences(of: ">", with: "&gt;")
            .replacingOccurrences(of: "\"", with: "&quot;")
    }
}
