import SwiftUI
import UIKit

private enum CodeNoteTextWidthKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value = nextValue()
    }
}

struct CodeNoteView: View {
    let content: String
    let mime: String
    var findControl: FindOnPageControl?

    @State private var bodyWidth: CGFloat = 0
    @State private var viewportHeight: CGFloat = 160
    /// Trilium v0.103+ treats Markdown as a first-class code variant with preview. Mirror the
    /// rendered/source toggle on iOS for `text/markdown` notes; defaults to rendered since
    /// reading is the primary use case in the mobile reader.
    @State private var markdownShowSource = false

    private var isMarkdown: Bool {
        mime.lowercased().contains("markdown")
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 8) {
                Text(languageLabel)
                    .font(.caption.weight(.medium))
                    .foregroundStyle(.secondary)
                Spacer()
                if isMarkdown {
                    Button {
                        markdownShowSource.toggle()
                    } label: {
                        Label(
                            markdownShowSource
                                ? String(localized: "Rendered", comment: "Markdown note: switch back to rendered view")
                                : String(localized: "Source", comment: "Markdown note: switch to raw source view"),
                            systemImage: markdownShowSource ? "doc.richtext" : "chevron.left.forwardslash.chevron.right"
                        )
                        .font(.caption)
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.mini)
                    .accessibilityLabel(String(localized: "Toggle Markdown rendering", comment: "Accessibility label for Markdown preview toggle"))
                }
                Button {
                    UIPasteboard.general.string = content
                } label: {
                    Label("Copy", systemImage: "doc.on.doc")
                        .font(.caption)
                }
                .buttonStyle(.bordered)
                .controlSize(.mini)
                .accessibilityLabel("Copy code to clipboard")
            }
            .padding(.horizontal)
            .padding(.vertical, 8)

            if isMarkdown && !markdownShowSource {
                MarkdownPreviewView(source: content)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 12)
                    .background(Color(.secondarySystemGroupedBackground))
            } else {
                CodeReadonlyTextView(
                    text: content,
                    findControl: findControl
                )
                .frame(maxWidth: .infinity)
                .frame(height: viewportHeight)
                .background {
                    GeometryReader { g in
                        Color.clear.preference(key: CodeNoteTextWidthKey.self, value: g.size.width)
                    }
                }
                .background(Color(.secondarySystemGroupedBackground))
            }
        }
        .onPreferenceChange(CodeNoteTextWidthKey.self) { w in
            bodyWidth = w
            viewportHeight = CodeNoteView.naturalCodeBodyHeight(text: content, availableWidth: w)
        }
        .onChange(of: content) { _, new in
            viewportHeight = CodeNoteView.naturalCodeBodyHeight(text: new, availableWidth: bodyWidth)
        }
    }

    private var languageLabel: String {
        let lang = mime
            .replacingOccurrences(of: "text/x-", with: "")
            .replacingOccurrences(of: "text/", with: "")
            .replacingOccurrences(of: "application/", with: "")
            .replacingOccurrences(of: "x-", with: "")

        if lang.isEmpty || lang == "plain" {
            return "Plain Text"
        }
        return lang.capitalized
    }

    /// Width from `GeometryReader` is often `0` on the first pass; using that for measurement forces a ~`minH` frame until a second pass, which can never arrive. Fall back to screen width (minus a typical inset) for **measurement** only; the real width still applies once layout settles.
    private static func widthForTextMeasurement(geometryWidth: CGFloat) -> CGFloat {
        if geometryWidth > 1 {
            return geometryWidth
        }
        let screen = UIScreen.main.bounds.width
        return max(280, screen - 64)
    }

    /// Read-only code body height. Uses `UITextView`’s `sizeThatFits` to match `CodeReadonlyTextView` (NSString `boundingRect` often over-estimates and leaves a blank band at the bottom).
    private static func naturalCodeBodyHeight(text: String, availableWidth: CGFloat) -> CGFloat {
        let minH: CGFloat = 120
        let w = widthForTextMeasurement(geometryWidth: availableWidth)
        let h = textViewMeasureHeight(matching: text, width: w)
        return max(minH, h)
    }

    private static func textViewMeasureHeight(matching text: String, width: CGFloat) -> CGFloat {
        let tv = UITextView()
        tv.isScrollEnabled = false
        tv.isEditable = false
        tv.font = UIFont.monospacedSystemFont(ofSize: 17, weight: .regular)
        tv.textContainer.lineFragmentPadding = 0
        tv.textContainerInset = UIEdgeInsets(top: 12, left: 12, bottom: 12, right: 12)
        tv.text = text
        let sz = tv.sizeThatFits(CGSize(width: width, height: .greatestFiniteMagnitude))
        return ceil(sz.height)
    }
}

// MARK: - Read-only monospaced text with optional in-page find

private struct CodeReadonlyTextView: UIViewRepresentable {
    let text: String
    var findControl: FindOnPageControl?

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> UITextView {
        let tv = UITextView()
        tv.isEditable = false
        tv.isSelectable = true
        tv.font = .monospacedSystemFont(ofSize: 17, weight: .regular)
        tv.backgroundColor = UIColor.secondarySystemGroupedBackground
        tv.textContainerInset = UIEdgeInsets(top: 12, left: 12, bottom: 12, right: 12)
        tv.textContainer.lineFragmentPadding = 0
        tv.isScrollEnabled = true
        tv.alwaysBounceVertical = false
        tv.showsVerticalScrollIndicator = false
        tv.showsHorizontalScrollIndicator = true
        tv.textColor = .label
        tv.text = text
        context.coordinator.lastText = text
        context.coordinator.textView = tv
        findControl?.registerCodeTextView(tv, plainText: text)
        return tv
    }

    func updateUIView(_ uiView: UITextView, context: Context) {
        context.coordinator.textView = uiView
        findControl?.registerCodeTextView(uiView, plainText: text)

        if text != context.coordinator.lastText {
            context.coordinator.lastText = text
            let font = UIFont.monospacedSystemFont(ofSize: 17, weight: .regular)
            uiView.attributedText = NSAttributedString(
                string: text,
                attributes: [
                    .font: font,
                    .foregroundColor: UIColor.label
                ]
            )
            if let fc = findControl, !fc.query.isEmpty {
                fc.applyQueryFromFieldChange()
            }
        }
    }

    final class Coordinator {
        weak var textView: UITextView?
        var lastText: String = ""
    }
}

// MARK: - Markdown preview

/// Lightweight block-level Markdown viewer for `text/markdown` code notes.
///
/// Trilium v0.103+ ships first-class Markdown notes with preview / sync-scrolling on the
/// desktop. iOS doesn't bundle markdown-it, so we use Apple's `AttributedString(markdown:)`
/// for inline formatting (bold, italic, links, inline code) and apply a small block parser
/// for headings, lists, blockquotes, fenced code, and horizontal rules. Anything we don't
/// recognise falls through as a plain paragraph — the user can always flip to **Source**.
struct MarkdownPreviewView: View {
    let source: String

    private var blocks: [MarkdownBlock] {
        MarkdownBlock.parse(source)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            ForEach(Array(blocks.enumerated()), id: \.offset) { _, block in
                render(block)
            }
        }
    }

    @ViewBuilder
    private func render(_ block: MarkdownBlock) -> some View {
        switch block {
        case .heading(let level, let text):
            Text(inlineAttributed(text))
                .font(Self.headingFont(for: level))
                .fontWeight(level <= 3 ? .bold : .semibold)
                .textSelection(.enabled)
                .fixedSize(horizontal: false, vertical: true)
        case .paragraph(let text):
            Text(inlineAttributed(text))
                .font(.body)
                .textSelection(.enabled)
                .fixedSize(horizontal: false, vertical: true)
        case .bulletList(let items):
            VStack(alignment: .leading, spacing: 4) {
                ForEach(Array(items.enumerated()), id: \.offset) { _, item in
                    HStack(alignment: .firstTextBaseline, spacing: 8) {
                        Text("\u{2022}").foregroundStyle(.secondary)
                        Text(inlineAttributed(item))
                            .font(.body)
                            .textSelection(.enabled)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }
            }
        case .orderedList(let items):
            VStack(alignment: .leading, spacing: 4) {
                ForEach(Array(items.enumerated()), id: \.offset) { idx, item in
                    HStack(alignment: .firstTextBaseline, spacing: 8) {
                        Text("\(idx + 1).").foregroundStyle(.secondary)
                        Text(inlineAttributed(item))
                            .font(.body)
                            .textSelection(.enabled)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }
            }
        case .blockquote(let text):
            HStack(spacing: 0) {
                Rectangle().fill(Color.secondary.opacity(0.4)).frame(width: 3)
                Text(inlineAttributed(text))
                    .font(.body.italic())
                    .foregroundStyle(.secondary)
                    .padding(.leading, 10)
                    .textSelection(.enabled)
                    .fixedSize(horizontal: false, vertical: true)
                Spacer(minLength: 0)
            }
        case .fencedCode(let language, let code):
            VStack(alignment: .leading, spacing: 0) {
                if let language, !language.isEmpty {
                    Text(language)
                        .font(.caption2.weight(.medium))
                        .foregroundStyle(.secondary)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color(.tertiarySystemGroupedBackground))
                }
                Text(code)
                    .font(.system(.callout, design: .monospaced))
                    .textSelection(.enabled)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(8)
                    .background(Color(.tertiarySystemGroupedBackground))
            }
            .clipShape(RoundedRectangle(cornerRadius: 6))
        case .horizontalRule:
            Divider()
        }
    }

    private func inlineAttributed(_ markdown: String) -> AttributedString {
        // `.full` keeps inline emphasis, links, and code spans; falls back to the raw text if the
        // input doesn't parse (e.g. when a literal `*` is intended as a list bullet on a stray line).
        var opts = AttributedString.MarkdownParsingOptions()
        opts.allowsExtendedAttributes = true
        opts.interpretedSyntax = .inlineOnlyPreservingWhitespace
        opts.failurePolicy = .returnPartiallyParsedIfPossible
        if let parsed = try? AttributedString(markdown: markdown, options: opts) {
            return parsed
        }
        return AttributedString(markdown)
    }

    private static func headingFont(for level: Int) -> Font {
        switch level {
        case 1: return .largeTitle
        case 2: return .title
        case 3: return .title2
        case 4: return .title3
        case 5: return .headline
        default: return .subheadline
        }
    }
}

enum MarkdownBlock {
    case heading(level: Int, text: String)
    case paragraph(String)
    case bulletList([String])
    case orderedList([String])
    case blockquote(String)
    case fencedCode(language: String?, code: String)
    case horizontalRule

    /// Minimal line-based block parser. Not a full CommonMark implementation — covers what's
    /// most useful for previewing notes on a phone screen and bails out to paragraphs for
    /// constructs it doesn't recognise. Detached from rendering so it can be unit-tested.
    static func parse(_ source: String) -> [MarkdownBlock] {
        var blocks: [MarkdownBlock] = []
        let lines = source.components(separatedBy: "\n")
        var i = 0
        var paragraphBuffer: [String] = []
        var bulletBuffer: [String] = []
        var orderedBuffer: [String] = []
        var blockquoteBuffer: [String] = []

        func flushParagraph() {
            if !paragraphBuffer.isEmpty {
                blocks.append(.paragraph(paragraphBuffer.joined(separator: " ")))
                paragraphBuffer.removeAll()
            }
        }
        func flushBullets() {
            if !bulletBuffer.isEmpty { blocks.append(.bulletList(bulletBuffer)); bulletBuffer.removeAll() }
        }
        func flushOrdered() {
            if !orderedBuffer.isEmpty { blocks.append(.orderedList(orderedBuffer)); orderedBuffer.removeAll() }
        }
        func flushBlockquote() {
            if !blockquoteBuffer.isEmpty {
                blocks.append(.blockquote(blockquoteBuffer.joined(separator: " ")))
                blockquoteBuffer.removeAll()
            }
        }
        func flushAll() {
            flushParagraph(); flushBullets(); flushOrdered(); flushBlockquote()
        }

        while i < lines.count {
            let raw = lines[i]
            let trimmed = raw.trimmingCharacters(in: .whitespaces)

            if trimmed.isEmpty {
                flushAll()
                i += 1
                continue
            }

            if trimmed.hasPrefix("```") {
                flushAll()
                let lang = trimmed.dropFirst(3).trimmingCharacters(in: .whitespaces)
                var codeLines: [String] = []
                i += 1
                while i < lines.count {
                    let cl = lines[i]
                    if cl.trimmingCharacters(in: .whitespaces).hasPrefix("```") { i += 1; break }
                    codeLines.append(cl)
                    i += 1
                }
                blocks.append(.fencedCode(language: lang.isEmpty ? nil : lang, code: codeLines.joined(separator: "\n")))
                continue
            }

            if let headingLevel = headingLevel(of: trimmed) {
                flushAll()
                let text = String(trimmed.drop(while: { $0 == "#" })).trimmingCharacters(in: .whitespaces)
                blocks.append(.heading(level: headingLevel, text: text))
                i += 1
                continue
            }

            if trimmed == "---" || trimmed == "***" || trimmed == "___" {
                flushAll()
                blocks.append(.horizontalRule)
                i += 1
                continue
            }

            if trimmed.hasPrefix("> ") || trimmed == ">" {
                flushParagraph(); flushBullets(); flushOrdered()
                let q = trimmed == ">" ? "" : String(trimmed.dropFirst(2))
                blockquoteBuffer.append(q)
                i += 1
                continue
            }

            if let bulletMatch = bulletItem(in: trimmed) {
                flushParagraph(); flushOrdered(); flushBlockquote()
                bulletBuffer.append(bulletMatch)
                i += 1
                continue
            }

            if let ordered = orderedItem(in: trimmed) {
                flushParagraph(); flushBullets(); flushBlockquote()
                orderedBuffer.append(ordered)
                i += 1
                continue
            }

            flushBullets(); flushOrdered(); flushBlockquote()
            paragraphBuffer.append(trimmed)
            i += 1
        }
        flushAll()
        return blocks
    }

    private static func headingLevel(of trimmed: String) -> Int? {
        guard trimmed.first == "#" else { return nil }
        var level = 0
        for ch in trimmed {
            if ch == "#" { level += 1; if level > 6 { return nil } } else { break }
        }
        guard level >= 1, level <= 6 else { return nil }
        let afterHashes = trimmed.dropFirst(level)
        // ATX headings require a space after the hashes per CommonMark.
        guard afterHashes.first == " " || afterHashes.isEmpty else { return nil }
        return level
    }

    private static func bulletItem(in trimmed: String) -> String? {
        for prefix in ["- ", "* ", "+ "] where trimmed.hasPrefix(prefix) {
            return String(trimmed.dropFirst(prefix.count))
        }
        return nil
    }

    private static func orderedItem(in trimmed: String) -> String? {
        var digits = ""
        for ch in trimmed {
            if ch.isNumber { digits.append(ch) } else { break }
        }
        guard !digits.isEmpty else { return nil }
        let after = trimmed.dropFirst(digits.count)
        guard after.first == "." || after.first == ")" else { return nil }
        let body = after.dropFirst().drop(while: { $0 == " " })
        return String(body)
    }
}

#Preview {
    CodeNoteView(content: """
    func hello() {
        print("Hello, world!")
    }
    """, mime: "text/x-swift")
}

#Preview("Markdown") {
    CodeNoteView(content: """
    # Hello

    Some **bold** and *italic* text with [a link](https://example.com).

    - one
    - two
    - three

    > A short quote.

    ```swift
    let x = 1
    ```
    """, mime: "text/markdown")
}
