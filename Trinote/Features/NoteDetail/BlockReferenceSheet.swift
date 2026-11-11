import SwiftUI
import WebKit

/// A heading or paragraph that a block link or excerpt (Trilium v0.107) can point at.
struct NoteBlock: Identifiable, Equatable, Sendable, Decodable {
    /// The editor's document position for the open note; the block's order in the stored HTML for another one.
    let id: Int
    let headingLevel: Int?
    let text: String
    let blockId: String?
    /// Another note only: where the block's start tag begins in its stored HTML, in UTF-8 bytes.
    var tagOffset: Int? = nil

    private enum CodingKeys: String, CodingKey {
        case id = "pos", headingLevel = "level", text, blockId
    }
}

/// The headings and paragraphs of a text note's stored HTML. A string scan rather than a parse, so that giving a block
/// an id changes nothing else in the note.
enum NoteBlockOutline {
    private static let contentless: Set<String> = ["figure", "table", "pre", "script", "style"]

    static func blocks(in html: String) -> [NoteBlock] {
        let bytes = Array(html.utf8)
        var blocks: [NoteBlock] = []
        var index = 0
        while index < bytes.count {
            guard bytes[index] == UInt8(ascii: "<") else { index += 1; continue }
            if hasPrefix("<!--", bytes, at: index) {
                index = find("-->", bytes, from: index + 4).map { $0 + 3 } ?? bytes.count
                continue
            }
            guard let tag = startTag(bytes, at: index) else { index += 1; continue }
            if contentless.contains(tag.name), !tag.isSelfClosing {
                index = elementEnd(bytes, name: tag.name, afterStartTag: tag.end).end
                continue
            }
            let level = headingLevel(tag.name)
            guard tag.name == "p" || level != nil else { index = tag.end; continue }
            let attributes = String(decoding: bytes[tag.nameEnd..<tag.end], as: UTF8.self)
            let element = elementEnd(bytes, name: tag.name, afterStartTag: tag.end)
            if !hasClass("trilium-tab-title", in: attributes) {
                let text = plainText(String(decoding: bytes[tag.end..<element.contentEnd], as: UTF8.self))
                if !text.isEmpty {
                    blocks.append(NoteBlock(
                        id: blocks.count,
                        headingLevel: level,
                        text: text,
                        blockId: attribute("data-trilium-block-id", in: attributes),
                        tagOffset: index
                    ))
                }
            }
            index = element.end
        }
        return blocks
    }

    /// `html` with `id` on the block whose start tag begins at `tagOffset`.
    static func html(_ html: String, assigning id: String, atTagOffset tagOffset: Int) -> String? {
        var bytes = Array(html.utf8)
        guard let tag = startTag(bytes, at: tagOffset) else { return nil }
        bytes.insert(contentsOf: Array(" data-trilium-block-id=\"\(id)\"".utf8), at: tag.nameEnd)
        return String(decoding: bytes, as: UTF8.self)
    }

    /// A new id, in Trilium's form: twelve letters and digits.
    static func newBlockId() -> String {
        let characters = Array("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
        return String((0..<12).map { _ in characters.randomElement()! })
    }

    private struct StartTag {
        let name: String
        let nameEnd: Int
        let end: Int
        let isSelfClosing: Bool
    }

    private static func startTag(_ bytes: [UInt8], at index: Int) -> StartTag? {
        guard index + 1 < bytes.count, bytes[index] == UInt8(ascii: "<"), isNameByte(bytes[index + 1]) else { return nil }
        var cursor = index + 1
        while cursor < bytes.count, isNameByte(bytes[cursor]) { cursor += 1 }
        let name = String(decoding: bytes[(index + 1)..<cursor], as: UTF8.self).lowercased()
        let nameEnd = cursor
        var quote: UInt8?
        while cursor < bytes.count {
            let byte = bytes[cursor]
            if let open = quote {
                if byte == open { quote = nil }
            } else if byte == UInt8(ascii: "\"") || byte == UInt8(ascii: "'") {
                quote = byte
            } else if byte == UInt8(ascii: ">") {
                return StartTag(name: name, nameEnd: nameEnd, end: cursor + 1, isSelfClosing: bytes[cursor - 1] == UInt8(ascii: "/"))
            }
            cursor += 1
        }
        return nil
    }

    /// Where the element ends, counting nested elements of its own name.
    private static func elementEnd(_ bytes: [UInt8], name: String, afterStartTag start: Int) -> (contentEnd: Int, end: Int) {
        let open = Array("<\(name)".utf8)
        let close = Array("</\(name)".utf8)
        var depth = 1
        var index = start
        while index < bytes.count {
            if bytes[index] == UInt8(ascii: "<") {
                if matches(close, bytes, at: index), isBoundary(bytes, at: index + close.count) {
                    depth -= 1
                    if depth == 0 {
                        let end = find(">", bytes, from: index).map { $0 + 1 } ?? bytes.count
                        return (index, end)
                    }
                } else if matches(open, bytes, at: index), isBoundary(bytes, at: index + open.count) {
                    if let nested = startTag(bytes, at: index), !nested.isSelfClosing { depth += 1 }
                }
            }
            index += 1
        }
        return (bytes.count, bytes.count)
    }

    private static func headingLevel(_ name: String) -> Int? {
        guard name.count == 2, name.first == "h", let level = name.last?.wholeNumberValue, (1...6).contains(level) else { return nil }
        return level
    }

    private static func attribute(_ name: String, in attributes: String) -> String? {
        guard let range = attributes.range(of: "\(name)=\"[^\"]*\"", options: .regularExpression) else { return nil }
        let value = attributes[range].dropFirst(name.count + 2).dropLast()
        return value.isEmpty ? nil : String(value)
    }

    private static func hasClass(_ name: String, in attributes: String) -> Bool {
        guard let value = attribute("class", in: attributes) else { return false }
        return value.split(whereSeparator: \.isWhitespace).contains { $0 == name }
    }

    private static func plainText(_ html: String) -> String {
        let withoutTags = html.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)
        var text = withoutTags
        for (entity, value) in [("&nbsp;", " "), ("&lt;", "<"), ("&gt;", ">"), ("&quot;", "\""), ("&#39;", "'"), ("&amp;", "&")] {
            text = text.replacingOccurrences(of: entity, with: value)
        }
        return text.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private static func isNameByte(_ byte: UInt8) -> Bool {
        (byte >= UInt8(ascii: "a") && byte <= UInt8(ascii: "z"))
            || (byte >= UInt8(ascii: "A") && byte <= UInt8(ascii: "Z"))
            || (byte >= UInt8(ascii: "0") && byte <= UInt8(ascii: "9"))
    }

    private static func isBoundary(_ bytes: [UInt8], at index: Int) -> Bool {
        index >= bytes.count || !isNameByte(bytes[index])
    }

    private static func matches(_ needle: [UInt8], _ bytes: [UInt8], at index: Int) -> Bool {
        guard index + needle.count <= bytes.count else { return false }
        for offset in 0..<needle.count {
            var byte = bytes[index + offset]
            if byte >= UInt8(ascii: "A") && byte <= UInt8(ascii: "Z") { byte += 32 }
            if byte != needle[offset] { return false }
        }
        return true
    }

    private static func hasPrefix(_ prefix: String, _ bytes: [UInt8], at index: Int) -> Bool {
        matches(Array(prefix.utf8), bytes, at: index)
    }

    private static func find(_ needle: String, _ bytes: [UInt8], from start: Int) -> Int? {
        let pattern = Array(needle.utf8)
        var index = start
        while index + pattern.count <= bytes.count {
            if matches(pattern, bytes, at: index) { return index }
            index += 1
        }
        return nil
    }
}

/// Picks a heading or paragraph to link to or embed: from the open note, or from another one.
struct BlockReferenceSheet: View {
    enum Kind: String, Identifiable {
        case link, excerpt
        var id: String { rawValue }
    }

    struct Pick {
        let kind: Kind
        let noteId: String
        let noteTitle: String
        let blockId: String
        let excerpt: String
    }

    private struct OtherNote {
        let noteId: String
        let title: String
        let html: String
    }

    let kind: Kind
    let currentNoteId: String
    let currentNoteTitle: String
    let viewModel: NoteDetailViewModel
    /// The open note's blocks, from the editor, so edits not saved yet count.
    let readEditorBlocks: () async -> [NoteBlock]
    /// Gives a block of the open note an id in the editor; `nil` if it can't have one.
    let assignEditorBlockId: (NoteBlock) async -> String?
    let onPick: (Pick) -> Void

    @Environment(AppState.self) private var appState
    @Environment(\.dismiss) private var dismiss
    @State private var other: OtherNote?
    @State private var blocks: [NoteBlock] = []
    @State private var isLoading = true
    @State private var isWorking = false
    @State private var showNotePicker = false
    @State private var showFailure = false

    private var title: String {
        kind == .link
            ? String(localized: "Link to Block", comment: "Editor: insert a link to a heading or paragraph")
            : String(localized: "Note Excerpt", comment: "Editor: embed part of another note")
    }

    private var topLevel: Int { blocks.compactMap(\.headingLevel).min() ?? 1 }

    var body: some View {
        NavigationStack {
            content
                .navigationTitle(title)
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .cancellationAction) {
                        Button(String(localized: "Cancel", comment: "Close the block picker")) { dismiss() }
                    }
                    ToolbarItem(placement: .primaryAction) {
                        Button(String(localized: "Another Note…", comment: "Block picker: choose a different note")) {
                            showNotePicker = true
                        }
                    }
                }
        }
        .disabled(isWorking)
        .task {
            if kind == .excerpt {
                // A note can't embed itself, so an excerpt starts by choosing the note.
                isLoading = false
                showNotePicker = true
            } else {
                blocks = await readEditorBlocks()
                isLoading = false
            }
        }
        .sheet(isPresented: $showNotePicker) {
            NotePickerSheet(
                excludeNoteId: kind == .excerpt ? currentNoteId : nil,
                navigationTitleOverride: title,
                hidesEmbeddedTreeToolbar: true,
                hidesEmbeddedTreeRootHeader: true,
                hidesEmbeddedTreeTabsBar: true
            ) { noteId, noteTitle in
                Task { await loadOther(noteId: noteId, title: noteTitle) }
            }
            .environment(appState)
        }
        .alert(String(localized: "This block couldn’t be linked. Check your connection and try again.", comment: "Block picker: giving the block an id failed"), isPresented: $showFailure) {
            Button(String(localized: "OK", comment: "Dismiss"), role: .cancel) {}
        }
    }

    @ViewBuilder
    private var content: some View {
        if isLoading {
            ProgressView().frame(maxWidth: .infinity, maxHeight: .infinity)
        } else if blocks.isEmpty {
            ContentUnavailableView(
                other?.title ?? (kind == .link ? currentNoteTitle : title),
                systemImage: "text.alignleft",
                description: Text(String(localized: "This note has no headings or paragraphs to link to.", comment: "Block picker: nothing to choose"))
            )
        } else {
            List(blocks) { block in
                Button {
                    Task { await pick(block) }
                } label: {
                    Text(block.text)
                        .font(block.headingLevel != nil ? .subheadline.weight(.semibold) : .subheadline)
                        .foregroundStyle(block.headingLevel != nil ? Color.primary : Color.secondary)
                        .lineLimit(2)
                        .padding(.leading, CGFloat(((block.headingLevel ?? (topLevel + 1)) - topLevel)) * 14)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
            }
            .listStyle(.plain)
        }
    }

    private func loadOther(noteId: String, title: String) async {
        isLoading = true
        defer { isLoading = false }
        let html = await viewModel.storedHTML(ofNote: noteId) ?? ""
        other = OtherNote(noteId: noteId, title: title, html: html)
        blocks = NoteBlockOutline.blocks(in: html)
    }

    private func pick(_ block: NoteBlock) async {
        isWorking = true
        defer { isWorking = false }
        let blockId: String?
        if let other {
            blockId = await viewModel.ensureBlockId(block, inNote: other.noteId, storedHTML: other.html)
        } else {
            blockId = await assignEditorBlockId(block)
        }
        guard let blockId else {
            showFailure = true
            return
        }
        onPick(Pick(
            kind: kind,
            noteId: other?.noteId ?? currentNoteId,
            noteTitle: other?.title ?? currentNoteTitle,
            blockId: blockId,
            excerpt: String(block.text.prefix(60))
        ))
        dismiss()
    }
}
