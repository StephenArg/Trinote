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
    /// Opens a Trilium note when a rendered Markdown internal hash link is tapped.
    var onNoteLinkTapped: ((String) -> Void)?
    /// Loads attachment bytes for Markdown hash links that target `viewMode=attachments`.
    var loadAttachmentPreview: ((String) async -> AttachmentPreviewItem?)?

    @State private var bodyWidth: CGFloat = 0
    @State private var viewportHeight: CGFloat = 160
    @State private var attachmentPreview: AttachmentPreviewItem?
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
                MarkdownPreviewView(
                    source: content,
                    onNoteLinkTapped: onNoteLinkTapped,
                    onAttachmentLinkTapped: { attachmentId in
                        guard let loadAttachmentPreview else { return }
                        Task { @MainActor in
                            attachmentPreview = await loadAttachmentPreview(attachmentId)
                        }
                    }
                )
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
        .fullScreenCover(item: $attachmentPreview) { item in
            AttachmentPreviewView(item: item) {
                attachmentPreview = nil
            }
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
/// desktop. iOS doesn't bundle markdown-it, so we use Apple's markdown → attributed-string
/// path for inline formatting (bold, italic, links, inline code) and a small block parser
/// for headings, lists, blockquotes, fenced code, and horizontal rules. Anything we don't
/// recognise falls through as a plain paragraph — the user can always flip to **Source**.
///
/// Inline runs are rendered in a selectable `UITextView` so text selection and link taps
/// both work. External `http(s)` / `mailto` links open in Safari via `UIApplication.open`
/// (same as HTML notes); Trilium `#root/…` hashes navigate in-app.
struct MarkdownPreviewView: View {
    let source: String
    var onNoteLinkTapped: ((String) -> Void)?
    var onAttachmentLinkTapped: ((String) -> Void)?

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
            MarkdownSelectableText(
                markdown: text,
                font: Self.headingUIFont(for: level),
                textColor: .label,
                onNoteLinkTapped: onNoteLinkTapped,
                onAttachmentLinkTapped: onAttachmentLinkTapped
            )
        case .paragraph(let text):
            MarkdownSelectableText(
                markdown: text,
                font: .preferredFont(forTextStyle: .body),
                textColor: .label,
                onNoteLinkTapped: onNoteLinkTapped,
                onAttachmentLinkTapped: onAttachmentLinkTapped
            )
        case .bulletList(let items):
            VStack(alignment: .leading, spacing: 4) {
                ForEach(Array(items.enumerated()), id: \.offset) { _, item in
                    HStack(alignment: .firstTextBaseline, spacing: 8) {
                        Text("\u{2022}").foregroundStyle(.secondary)
                        MarkdownSelectableText(
                            markdown: item,
                            font: .preferredFont(forTextStyle: .body),
                            textColor: .label,
                            onNoteLinkTapped: onNoteLinkTapped,
                            onAttachmentLinkTapped: onAttachmentLinkTapped
                        )
                    }
                }
            }
        case .orderedList(let items):
            VStack(alignment: .leading, spacing: 4) {
                ForEach(Array(items.enumerated()), id: \.offset) { idx, item in
                    HStack(alignment: .firstTextBaseline, spacing: 8) {
                        Text("\(idx + 1).").foregroundStyle(.secondary)
                        MarkdownSelectableText(
                            markdown: item,
                            font: .preferredFont(forTextStyle: .body),
                            textColor: .label,
                            onNoteLinkTapped: onNoteLinkTapped,
                            onAttachmentLinkTapped: onAttachmentLinkTapped
                        )
                    }
                }
            }
        case .blockquote(let text):
            HStack(spacing: 0) {
                Rectangle().fill(Color.secondary.opacity(0.4)).frame(width: 3)
                MarkdownSelectableText(
                    markdown: text,
                    font: {
                        let base = UIFont.preferredFont(forTextStyle: .body)
                        return UIFont(descriptor: base.fontDescriptor.withSymbolicTraits(.traitItalic) ?? base.fontDescriptor, size: base.pointSize)
                    }(),
                    textColor: .secondaryLabel,
                    onNoteLinkTapped: onNoteLinkTapped,
                    onAttachmentLinkTapped: onAttachmentLinkTapped
                )
                .padding(.leading, 10)
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

    private static func headingUIFont(for level: Int) -> UIFont {
        let style: UIFont.TextStyle
        let weight: UIFont.Weight
        switch level {
        case 1: style = .largeTitle; weight = .bold
        case 2: style = .title1; weight = .bold
        case 3: style = .title2; weight = .bold
        case 4: style = .title3; weight = .semibold
        case 5: style = .headline; weight = .semibold
        default: style = .subheadline; weight = .semibold
        }
        let base = UIFont.preferredFont(forTextStyle: style)
        return UIFont.systemFont(ofSize: base.pointSize, weight: weight)
    }
}

/// Selectable UITextView that keeps text selection and opens Markdown links (Safari for
/// http(s), in-app for Trilium `#root/…` hashes).
///
/// Uses an explicit tap recognizer in addition to `UITextViewDelegate` link handling —
/// SwiftUI `ScrollView` often swallows the built-in link gesture, so taps never reach Safari.
private struct MarkdownSelectableText: UIViewRepresentable {
    let markdown: String
    let font: UIFont
    let textColor: UIColor
    var onNoteLinkTapped: ((String) -> Void)?
    var onAttachmentLinkTapped: ((String) -> Void)?

    func makeCoordinator() -> Coordinator {
        Coordinator(
            onNoteLinkTapped: onNoteLinkTapped,
            onAttachmentLinkTapped: onAttachmentLinkTapped
        )
    }

    func makeUIView(context: Context) -> IntrinsicHeightTextView {
        let tv = IntrinsicHeightTextView()
        tv.isEditable = false
        tv.isSelectable = true
        tv.isScrollEnabled = false
        tv.isUserInteractionEnabled = true
        tv.backgroundColor = .clear
        tv.textContainerInset = .zero
        tv.textContainer.lineFragmentPadding = 0
        tv.dataDetectorTypes = []
        tv.font = font
        tv.textColor = textColor
        tv.linkTextAttributes = [
            .foregroundColor: UIColor.link,
            .underlineStyle: NSUnderlineStyle.single.rawValue
        ]
        tv.delegate = context.coordinator
        tv.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)
        tv.setContentHuggingPriority(.required, for: .vertical)

        let tap = UITapGestureRecognizer(target: context.coordinator, action: #selector(Coordinator.handleTap(_:)))
        tap.numberOfTapsRequired = 1
        tap.cancelsTouchesInView = false
        tap.delegate = context.coordinator
        tv.addGestureRecognizer(tap)
        context.coordinator.tapRecognizer = tap
        context.coordinator.textView = tv

        tv.attributedText = Self.attributedMarkdown(markdown, font: font, textColor: textColor)
        context.coordinator.lastMarkdown = markdown
        context.coordinator.lastFontName = font.fontName
        context.coordinator.lastFontSize = font.pointSize
        return tv
    }

    func updateUIView(_ uiView: IntrinsicHeightTextView, context: Context) {
        context.coordinator.onNoteLinkTapped = onNoteLinkTapped
        context.coordinator.onAttachmentLinkTapped = onAttachmentLinkTapped
        context.coordinator.textView = uiView
        if markdown != context.coordinator.lastMarkdown
            || font.fontName != context.coordinator.lastFontName
            || abs(font.pointSize - context.coordinator.lastFontSize) > 0.01 {
            context.coordinator.lastMarkdown = markdown
            context.coordinator.lastFontName = font.fontName
            context.coordinator.lastFontSize = font.pointSize
            uiView.font = font
            uiView.textColor = textColor
            uiView.attributedText = Self.attributedMarkdown(markdown, font: font, textColor: textColor)
            uiView.invalidateIntrinsicContentSize()
        }
    }

    /// Parses inline Markdown, then forces a real `UIFont` on every run.
    /// SwiftUI `Font` → `NSAttributedString` often drops the font, leaving UITextView's 12pt default.
    static func attributedMarkdown(_ markdown: String, font: UIFont, textColor: UIColor) -> NSAttributedString {
        var opts = AttributedString.MarkdownParsingOptions()
        opts.allowsExtendedAttributes = true
        opts.interpretedSyntax = .inlineOnlyPreservingWhitespace
        opts.failurePolicy = .returnPartiallyParsedIfPossible

        let parsed = (try? AttributedString(markdown: markdown, options: opts)) ?? AttributedString(markdown)
        let mutable = NSMutableAttributedString(attributedString: NSAttributedString(parsed))
        let full = NSRange(location: 0, length: mutable.length)
        guard full.length > 0 else {
            return NSAttributedString(string: markdown, attributes: [
                .font: font,
                .foregroundColor: textColor
            ])
        }

        mutable.enumerateAttributes(in: full) { attrs, range, _ in
            var traits = font.fontDescriptor.symbolicTraits
            if let existing = attrs[.font] as? UIFont {
                let existingTraits = existing.fontDescriptor.symbolicTraits
                if existingTraits.contains(.traitBold) { traits.insert(.traitBold) }
                if existingTraits.contains(.traitItalic) { traits.insert(.traitItalic) }
            }
            // Inline code from Markdown often uses a monospaced font — keep that family at our size.
            let baseDescriptor: UIFontDescriptor
            if let existing = attrs[.font] as? UIFont,
               existing.fontDescriptor.symbolicTraits.contains(.traitMonoSpace) {
                baseDescriptor = UIFont.monospacedSystemFont(ofSize: font.pointSize, weight: .regular).fontDescriptor
            } else {
                baseDescriptor = font.fontDescriptor
            }
            let applied: UIFont
            if let withTraits = baseDescriptor.withSymbolicTraits(traits) {
                applied = UIFont(descriptor: withTraits, size: font.pointSize)
            } else {
                applied = UIFont(descriptor: baseDescriptor, size: font.pointSize)
            }
            mutable.addAttribute(.font, value: applied, range: range)

            let hasLink = attrs[.link] != nil
            if !hasLink {
                mutable.addAttribute(.foregroundColor, value: textColor, range: range)
            }

            // Normalize link values to absolute `URL`s so UITextView + our tap handler agree.
            if let linkValue = attrs[.link] {
                if let url = MarkdownLinkOpening.normalizedURL(from: linkValue) {
                    mutable.addAttribute(.link, value: url, range: range)
                }
            }
        }

        return mutable
    }

    final class Coordinator: NSObject, UITextViewDelegate, UIGestureRecognizerDelegate {
        var onNoteLinkTapped: ((String) -> Void)?
        var onAttachmentLinkTapped: ((String) -> Void)?
        var lastMarkdown: String = ""
        var lastFontName: String = ""
        var lastFontSize: CGFloat = 0
        weak var textView: UITextView?
        weak var tapRecognizer: UITapGestureRecognizer?

        init(
            onNoteLinkTapped: ((String) -> Void)?,
            onAttachmentLinkTapped: ((String) -> Void)?
        ) {
            self.onNoteLinkTapped = onNoteLinkTapped
            self.onAttachmentLinkTapped = onAttachmentLinkTapped
        }

        func textView(
            _ textView: UITextView,
            shouldInteractWith url: URL,
            in characterRange: NSRange,
            interaction: UITextItemInteraction
        ) -> Bool {
            guard interaction == .invokeDefaultAction else { return false }
            open(url)
            return false
        }

        @objc func handleTap(_ gesture: UITapGestureRecognizer) {
            guard gesture.state == .ended, let textView else { return }
            let point = gesture.location(in: textView)
            guard let url = Self.linkURL(at: point, in: textView) else { return }
            open(url)
        }

        private func open(_ url: URL) {
            MarkdownLinkOpening.handle(
                url: url,
                onNoteLinkTapped: onNoteLinkTapped,
                onAttachmentLinkTapped: onAttachmentLinkTapped
            )
        }

        /// Character-index hit test that accounts for textContainer insets.
        static func linkURL(at point: CGPoint, in textView: UITextView) -> URL? {
            var location = point
            location.x -= textView.textContainerInset.left
            location.y -= textView.textContainerInset.top
            guard textView.bounds.contains(point), textView.textStorage.length > 0 else { return nil }

            let index = textView.layoutManager.characterIndex(
                for: location,
                in: textView.textContainer,
                fractionOfDistanceBetweenInsertionPoints: nil
            )
            guard index < textView.textStorage.length else { return nil }

            var effective = NSRange(location: 0, length: 0)
            let value = textView.textStorage.attribute(.link, at: index, effectiveRange: &effective)
            return MarkdownLinkOpening.normalizedURL(from: value)
        }

        func gestureRecognizer(
            _ gestureRecognizer: UIGestureRecognizer,
            shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer
        ) -> Bool {
            true
        }

        func gestureRecognizer(
            _ gestureRecognizer: UIGestureRecognizer,
            shouldReceive touch: UITouch
        ) -> Bool {
            guard gestureRecognizer === tapRecognizer, let textView else { return true }
            let point = touch.location(in: textView)
            // Only claim the tap when it lands on a link — leave other taps for selection / scroll.
            return Self.linkURL(at: point, in: textView) != nil
        }
    }
}

/// Non-scrolling UITextView that reports its natural height to Auto Layout / SwiftUI.
private final class IntrinsicHeightTextView: UITextView {
    override var intrinsicContentSize: CGSize {
        let targetWidth = bounds.width > 1 ? bounds.width : UIScreen.main.bounds.width - 64
        let fitted = sizeThatFits(CGSize(width: targetWidth, height: .greatestFiniteMagnitude))
        return CGSize(width: UIView.noIntrinsicMetric, height: max(ceil(fitted.height), font?.lineHeight ?? 17))
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        invalidateIntrinsicContentSize()
    }
}

/// Resolves taps on links inside `MarkdownPreviewView`.
enum MarkdownLinkOpening {
    enum Outcome: Equatable {
        /// External URL was handed to Safari / the system browser.
        case openedInBrowser
        /// Trilium note / attachment handled in-app.
        case handledInternally
        case discarded
    }

    /// Coerces Markdown / UIKit `.link` attribute values into an absolute `URL`.
    /// Adds `https://` when the destination looks like a host without a scheme (`example.com/…`).
    static func normalizedURL(from value: Any?) -> URL? {
        guard let value else { return nil }
        if let url = value as? URL {
            return ensureScheme(url)
        }
        if let s = value as? String {
            return ensureScheme(URL(string: s.trimmingCharacters(in: .whitespacesAndNewlines)))
        }
        if let s = value as? NSString {
            return ensureScheme(URL(string: s as String))
        }
        return nil
    }

    private static func ensureScheme(_ url: URL?) -> URL? {
        guard let url else { return nil }
        let absolute = url.absoluteString.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !absolute.isEmpty else { return nil }

        if let scheme = url.scheme?.lowercased(), !scheme.isEmpty {
            return url
        }
        // Hash-only Trilium / in-note anchors — leave as-is for the hash parser.
        if absolute.hasPrefix("#") {
            return url
        }
        // Bare host / path → assume https.
        return URL(string: "https://\(absolute)")
    }

    /// Opens `http` / `https` / `mailto` in Safari via `UIApplication.open`.
    /// Trilium `#root/…` hashes call the in-app callbacks.
    @MainActor
    @discardableResult
    static func handle(
        url: URL,
        onNoteLinkTapped: ((String) -> Void)?,
        onAttachmentLinkTapped: ((String) -> Void)?
    ) -> Outcome {
        let resolved = normalizedURL(from: url) ?? url
        let absolute = resolved.absoluteString.trimmingCharacters(in: .whitespacesAndNewlines)
        let looksLikeTriliumHash =
            absolute.hasPrefix("#")
            || absolute.contains("#/")
            || absolute.localizedCaseInsensitiveContains("#root")
            || (resolved.fragment?.hasPrefix("/") == true)
            || (resolved.fragment?.localizedCaseInsensitiveContains("root/") == true)

        if looksLikeTriliumHash {
            if let parsed = TriliumHashLinkNavigation.parse(url: resolved)
                ?? TriliumHashLinkNavigation.parse(href: absolute) {
                if parsed.viewMode == "attachments",
                   let attachmentId = parsed.attachmentId,
                   !attachmentId.isEmpty {
                    if let onAttachmentLinkTapped {
                        onAttachmentLinkTapped(attachmentId)
                        return .handledInternally
                    }
                    return .discarded
                }
                if let noteId = parsed.noteId, !noteId.isEmpty {
                    onNoteLinkTapped?(noteId)
                    return .handledInternally
                }
            }
            // Bare `#fragment` (in-note anchor) — nothing to open on iOS preview.
            return .discarded
        }

        guard let scheme = resolved.scheme?.lowercased(), !scheme.isEmpty else {
            return .discarded
        }

        // Prefer Safari for web links; `universalLinksOnly: false` avoids silent failure when
        // another app claims the domain via Universal Links.
        if scheme == "http" || scheme == "https" {
            UIApplication.shared.open(
                resolved,
                options: [.universalLinksOnly: false],
                completionHandler: nil
            )
            return .openedInBrowser
        }
        if scheme == "mailto" {
            UIApplication.shared.open(resolved, options: [:], completionHandler: nil)
            return .openedInBrowser
        }
        UIApplication.shared.open(resolved, options: [:], completionHandler: nil)
        return .openedInBrowser
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
