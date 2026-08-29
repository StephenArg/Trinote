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
    /// Server base URL so relative `api/…` links in Markdown preview resolve like text notes.
    var baseURL: URL?
    var findControl: FindOnPageControl?
    /// Opens a Trilium note when a rendered Markdown internal hash link is tapped.
    var onNoteLinkTapped: ((String) -> Void)?
    /// Loads attachment bytes for Markdown hash links that target `viewMode=attachments`.
    var loadAttachmentPreview: ((String) async -> AttachmentPreviewItem?)?
    /// Called when the user picks a new language from the MIME pill.
    var onMimeSelected: ((String) -> Void)?
    /// Cycles a Markdown todo marker in the source (`[ ]`→`[x]`→`[/]`→`[?]`→`[-]`).
    var onTaskStateCycled: ((Int) -> Void)?
    /// Matches text-note checkbox toggles: lets `HTMLNoteView` skip a full reload when only a task state changed.
    var checkboxOnlyRevision: Int = 0

    @Environment(\.colorScheme) private var colorScheme
    @State private var bodyWidth: CGFloat = 0
    @State private var viewportHeight: CGFloat = 160
    @State private var renderedHTML: String = ""
    @State private var showLanguagePicker = false
    /// Trilium v0.103+ treats Markdown as a first-class code variant with preview. Mirror the
    /// rendered/source toggle on iOS for `text/markdown` notes; defaults to rendered since
    /// reading is the primary use case in the mobile reader.
    @State private var markdownShowSource = false
    /// Last markdown we fully converted into `renderedHTML` (for cycle-only skip).
    @State private var lastConvertedMarkdown: String?

    private var isMarkdown: Bool {
        CodeNoteLanguage.isMarkdownMime(mime)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 8) {
                Button {
                    showLanguagePicker = true
                } label: {
                    HStack(spacing: 4) {
                        Text(CodeNoteLanguage.displayTitle(for: mime))
                            .font(.caption.weight(.medium))
                        Image(systemName: "chevron.up.chevron.down")
                            .font(.caption2.weight(.semibold))
                    }
                }
                .buttonStyle(.bordered)
                .controlSize(.mini)
                .accessibilityLabel(String(localized: "Code language", comment: "Accessibility: code note language pill"))
                .accessibilityHint(String(localized: "Changes the note’s language", comment: "Accessibility hint for language pill"))
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
                // Reuse the text-note WKWebView pipeline (tables, Mermaid, todo-list CSS, find-on-page).
                HTMLNoteView(
                    html: renderedHTML.isEmpty ? "<p></p>" : renderedHTML,
                    baseURL: baseURL,
                    checkboxOnlyRevision: checkboxOnlyRevision,
                    onNoteLinkTapped: onNoteLinkTapped,
                    onTaskStateCycled: onTaskStateCycled,
                    loadAttachmentPreview: loadAttachmentPreview,
                    findControl: findControl,
                    listInteractionEnabled: onTaskStateCycled != nil,
                    taskStateCycleEnabled: onTaskStateCycled != nil,
                    allowListReorder: false,
                    allowCollapsibleReorder: false
                )
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color(.secondarySystemGroupedBackground))
            } else {
                CodeReadonlyTextView(
                    text: content,
                    mime: mime,
                    darkMode: colorScheme == .dark,
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
        .task(id: content) {
            guard isMarkdown else {
                renderedHTML = ""
                lastConvertedMarkdown = nil
                return
            }
            let source = content
            // Task-state cycles already mutate the live DOM; skip reconvert+reload to avoid flicker.
            if let previous = lastConvertedMarkdown,
               MarkdownToNoteHTML.equalsIgnoringTaskMarkers(previous, source) {
                lastConvertedMarkdown = source
                return
            }
            // Convert on the calling executor so the first paint is real HTML (async left a blank flash).
            let html = MarkdownToNoteHTML.convert(source, options: .preview)
            renderedHTML = html
            lastConvertedMarkdown = source
        }
        .onChange(of: markdownShowSource) { _, showSource in
            // Cycles leave `renderedHTML` intentionally stale (live DOM already matches). Reconvert
            // when returning to rendered mode so a remounted WebView shows the saved markers.
            guard isMarkdown, !showSource else { return }
            let source = content
            Task {
                let html = await Task.detached(priority: .userInitiated) {
                    MarkdownToNoteHTML.convert(source, options: .preview)
                }.value
                renderedHTML = html
                lastConvertedMarkdown = source
            }
        }
        .onPreferenceChange(CodeNoteTextWidthKey.self) { w in
            bodyWidth = w
            viewportHeight = CodeNoteView.naturalCodeBodyHeight(text: content, availableWidth: w)
        }
        .onChange(of: content) { _, new in
            viewportHeight = CodeNoteView.naturalCodeBodyHeight(text: new, availableWidth: bodyWidth)
        }
        .sheet(isPresented: $showLanguagePicker) {
            CodeNoteLanguagePickerSheet(
                currentMime: mime,
                onSelect: { selected in
                    showLanguagePicker = false
                    guard selected != mime else { return }
                    onMimeSelected?(selected)
                }
            )
        }
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

// MARK: - Language picker

private struct CodeNoteLanguagePickerSheet: View {
    let currentMime: String
    var onSelect: (String) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var query = ""

    private var filtered: [CodeNoteLanguage] {
        let q = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard !q.isEmpty else { return CodeNoteLanguage.defaults }
        return CodeNoteLanguage.defaults.filter {
            $0.title.lowercased().contains(q) || $0.mime.lowercased().contains(q)
        }
    }

    var body: some View {
        NavigationStack {
            List {
                if !CodeNoteLanguage.defaults.contains(where: { $0.mime.caseInsensitiveCompare(currentMime) == .orderedSame }) {
                    Section {
                        languageRow(
                            title: CodeNoteLanguage.displayTitle(for: currentMime),
                            mime: currentMime,
                            isCurrent: true
                        )
                    } header: {
                        Text(String(localized: "Current", comment: "Code language picker: current MIME not in defaults"))
                    }
                }
                Section {
                    ForEach(filtered) { lang in
                        languageRow(
                            title: lang.title,
                            mime: lang.mime,
                            isCurrent: lang.mime.caseInsensitiveCompare(currentMime) == .orderedSame
                        )
                    }
                }
            }
            .searchable(
                text: $query,
                prompt: String(localized: "Search languages", comment: "Code language picker search prompt")
            )
            .navigationTitle(String(localized: "Language", comment: "Code note language picker title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss language picker")) {
                        dismiss()
                    }
                }
            }
        }
        .presentationDetents([.medium, .large])
    }

    private func languageRow(title: String, mime: String, isCurrent: Bool) -> some View {
        Button {
            onSelect(mime)
        } label: {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .foregroundStyle(.primary)
                    Text(mime)
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                if isCurrent {
                    Image(systemName: "checkmark")
                        .foregroundStyle(Color.accentColor)
                }
            }
        }
    }
}

// MARK: - Read-only monospaced text with optional in-page find

private struct CodeReadonlyTextView: UIViewRepresentable {
    let text: String
    let mime: String
    let darkMode: Bool
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
        let attributed = CodeSyntaxHighlighter.attributedString(code: text, mime: mime, darkMode: darkMode)
        tv.attributedText = attributed
        context.coordinator.lastText = text
        context.coordinator.lastMime = mime
        context.coordinator.lastDarkMode = darkMode
        context.coordinator.baseAttributedText = attributed
        context.coordinator.textView = tv
        findControl?.registerCodeTextView(tv, plainText: text, baseAttributedText: attributed)
        return tv
    }

    func updateUIView(_ uiView: UITextView, context: Context) {
        context.coordinator.textView = uiView

        let needsRefresh =
            text != context.coordinator.lastText
            || mime != context.coordinator.lastMime
            || darkMode != context.coordinator.lastDarkMode

        if needsRefresh {
            context.coordinator.lastText = text
            context.coordinator.lastMime = mime
            context.coordinator.lastDarkMode = darkMode
            let attributed = CodeSyntaxHighlighter.attributedString(code: text, mime: mime, darkMode: darkMode)
            context.coordinator.baseAttributedText = attributed
            uiView.attributedText = attributed
            findControl?.registerCodeTextView(uiView, plainText: text, baseAttributedText: attributed)
            if let fc = findControl, !fc.query.isEmpty {
                fc.applyQueryFromFieldChange()
            }
        } else {
            findControl?.registerCodeTextView(
                uiView,
                plainText: text,
                baseAttributedText: context.coordinator.baseAttributedText
            )
        }
    }

    final class Coordinator {
        weak var textView: UITextView?
        var lastText: String = ""
        var lastMime: String = ""
        var lastDarkMode: Bool = false
        var baseAttributedText: NSAttributedString = NSAttributedString()
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

    | A | B |
    |---|---|
    | 1 | 2 |

    ```mermaid
    flowchart LR
      A --> B
    ```

    - [x] done
    - [ ] todo

    - one
      - nested
    """, mime: "text/x-markdown")
}
