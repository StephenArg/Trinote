import SwiftUI
import WebKit

struct MermaidEditorView: View {
    @Binding var editableContent: String
    var onSave: () -> Void
    var isSaving: Bool
    /// Off with Settings → Autosave → Hide Save Button.
    var showsSaveButton: Bool = true

    @Environment(\.colorScheme) private var colorScheme
    @State private var renderSource: String = ""
    @State private var debounceTask: Task<Void, Never>?
    @State private var sourceEditor = MermaidSourceEditorController()

    /// True when the user hasn't typed anything (and hasn't picked a sample yet). Drives the
    /// starter-chooser-vs-preview swap in the upper pane. Trimmed so a stray newline doesn't
    /// keep the chooser hidden on freshly created notes.
    private var hasNoContent: Bool {
        editableContent.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var body: some View {
        GeometryReader { geo in
            VStack(spacing: 0) {
                if hasNoContent {
                    MermaidStarterChooser { sample in
                        editableContent = sample
                        renderSource = sample
                        debounceTask?.cancel()
                    }
                    .frame(height: geo.size.height * 0.5)
                } else {
                    MermaidPreviewWebView(source: $renderSource, colorScheme: colorScheme)
                        .frame(height: geo.size.height * 0.5)
                }

                Divider()

                ZStack(alignment: .bottomTrailing) {
                    VStack(alignment: .leading, spacing: 0) {
                        HStack(spacing: 0) {
                            Text(String(localized: "Source", comment: "Mermaid editor label"))
                                .font(.caption.weight(.medium))
                                .foregroundStyle(.secondary)
                            Spacer(minLength: 8)
                            sourceTools
                        }
                        .padding(.leading)
                        .padding(.trailing, 8)
                        .padding(.top, 4)

                        MermaidSourceTextView(text: $editableContent, controller: sourceEditor)
                    }

                    if showsSaveButton {
                        saveChip
                            .padding(.trailing, 16)
                            .padding(.bottom, 16)
                    }
                }
                .frame(height: geo.size.height * 0.5)
            }
        }
        .onAppear {
            renderSource = editableContent
        }
        .onChange(of: editableContent) { _, newValue in
            scheduleRender(newValue)
        }
    }

    /// Small editing tools on the Source bar (the iOS keyboard has no Tab, brackets or `-->` within easy reach).
    private var sourceTools: some View {
        HStack(spacing: 0) {
            toolButton("arrow.uturn.backward", String(localized: "Undo", comment: "Mermaid editor undo")) {
                sourceEditor.undo()
            }
            .disabled(!sourceEditor.canUndo)
            toolButton("arrow.uturn.forward", String(localized: "Redo", comment: "Mermaid editor redo")) {
                sourceEditor.redo()
            }
            .disabled(!sourceEditor.canRedo)
            toolButton("decrease.indent", String(localized: "Outdent", comment: "Mermaid editor remove indentation")) {
                sourceEditor.outdent()
            }
            toolButton("increase.indent", String(localized: "Indent", comment: "Mermaid editor add indentation")) {
                sourceEditor.indent()
            }
            toolButton("percent", String(localized: "Comment Out Lines", comment: "Mermaid editor toggle %% comment")) {
                sourceEditor.toggleComment()
            }
            insertMenu
        }
        .font(.system(size: 15))
    }

    private func toolButton(_ systemImage: String, _ label: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: systemImage)
                .frame(width: 32, height: 30)
                .contentShape(Rectangle())
        }
        .buttonStyle(.borderless)
        .accessibilityLabel(label)
    }

    /// Syntax that takes several keyboard switches to type; the caret lands where the text goes.
    private var insertMenu: some View {
        Menu {
            Button("-->  " + String(localized: "Arrow", comment: "Mermaid insert arrow")) {
                sourceEditor.insert(" --> ")
            }
            Button("-- … -->  " + String(localized: "Arrow with Text", comment: "Mermaid insert labelled arrow")) {
                sourceEditor.insert(" -- text --> ", select: NSRange(location: 4, length: 4))
            }
            Button("[ ]  " + String(localized: "Box", comment: "Mermaid insert rectangle node")) {
                sourceEditor.insert("[]", select: NSRange(location: 1, length: 0))
            }
            Button("( )  " + String(localized: "Rounded Box", comment: "Mermaid insert rounded node")) {
                sourceEditor.insert("()", select: NSRange(location: 1, length: 0))
            }
            Button("{ }  " + String(localized: "Decision", comment: "Mermaid insert rhombus node")) {
                sourceEditor.insert("{}", select: NSRange(location: 1, length: 0))
            }
            Button("subgraph … end  " + String(localized: "Group", comment: "Mermaid insert subgraph")) {
                sourceEditor.insert("subgraph title\n    \nend", select: NSRange(location: 9, length: 5))
            }
            Button("<br>  " + String(localized: "Line Break", comment: "Mermaid insert line break in a label")) {
                sourceEditor.insert("<br>")
            }
        } label: {
            Image(systemName: "plus.square")
                .frame(width: 32, height: 30)
                .contentShape(Rectangle())
        }
        .accessibilityLabel(String(localized: "Insert", comment: "Mermaid editor insert syntax menu"))
    }

    private func scheduleRender(_ source: String) {
        debounceTask?.cancel()
        debounceTask = Task { @MainActor in
            try? await Task.sleep(for: .milliseconds(2500))
            guard !Task.isCancelled else { return }
            renderSource = source
        }
    }

    @ViewBuilder
    private var saveChip: some View {
        Button(action: onSave) {
            ZStack {
                if isSaving {
                    ProgressView()
                        .controlSize(.small)
                } else {
                    Image("SaveNoteFloating")
                        .resizable()
                        .renderingMode(.template)
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 24, height: 24)
                }
            }
            .foregroundStyle(.primary)
            .frame(width: 48, height: 48)
            .background(.ultraThinMaterial, in: Circle())
            .shadow(color: .black.opacity(0.12), radius: 5, y: 2)
        }
        .buttonStyle(.plain)
        .disabled(isSaving)
        .accessibilityLabel(String(localized: "Save", comment: "Mermaid editor save"))
    }
}

// MARK: - Source editor

/// Monospaced mermaid source field. `TextEditor` turns `--` into an en dash (smart dashes)
/// and cannot scroll the last line above the keyboard; `UITextView` gives us both knobs.
private struct MermaidSourceTextView: UIViewRepresentable {
    @Binding var text: String
    let controller: MermaidSourceEditorController

    /// Extra space under the last line, on top of chip clearance, so the caret can sit
    /// above the keyboard / save chip.
    private static let extraScrollBelowLastLine: CGFloat = 48

    func makeCoordinator() -> Coordinator {
        Coordinator(text: $text, controller: controller)
    }

    func makeUIView(context: Context) -> UITextView {
        let tv = UITextView()
        tv.delegate = context.coordinator
        tv.backgroundColor = .clear
        tv.textColor = .label
        tv.font = Self.monospacedBodyFont()
        tv.adjustsFontForContentSizeCategory = true
        if #available(iOS 17.0, *) {
            tv.inlinePredictionType = .no
        }
        tv.smartDashesType = .no
        tv.smartQuotesType = .no
        tv.smartInsertDeleteType = .no
        tv.autocorrectionType = .no
        tv.autocapitalizationType = .none
        tv.spellCheckingType = .no
        tv.keyboardDismissMode = .interactive
        tv.alwaysBounceVertical = true
        tv.contentInsetAdjustmentBehavior = .never
        tv.textContainer.lineFragmentPadding = 5
        tv.textContainerInset = UIEdgeInsets(
            top: 8,
            left: 8,
            bottom: Self.bottomPaddingBelowLastLine,
            right: 8
        )
        tv.text = text
        tv.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)
        tv.setContentCompressionResistancePriority(.defaultLow, for: .vertical)
        context.coordinator.textView = tv
        controller.textView = tv
        controller.onTextChanged = { [coordinator = context.coordinator] newText in
            coordinator.text.wrappedValue = newText
        }
        context.coordinator.observeKeyboard()
        return tv
    }

    func updateUIView(_ uiView: UITextView, context: Context) {
        context.coordinator.textView = uiView
        controller.textView = uiView
        if uiView.text != text {
            let selected = uiView.selectedRange
            uiView.text = text
            // Text replaced from outside (a starter sample) leaves nothing the undo steps could apply to.
            uiView.undoManager?.removeAllActions()
            let maxLocation = (text as NSString).length
            uiView.selectedRange = NSRange(location: min(selected.location, maxLocation), length: 0)
            controller.refreshUndoState()
        }
    }

    static func dismantleUIView(_ uiView: UITextView, coordinator: Coordinator) {
        coordinator.stopObservingKeyboard()
        coordinator.textView = nil
    }

    private static var bottomPaddingBelowLastLine: CGFloat {
        NoteDetailFloatingChipLayout.scrollClearance(findBarPresented: false, editing: true)
            + extraScrollBelowLastLine
    }

    private static func monospacedBodyFont() -> UIFont {
        let base = UIFont.monospacedSystemFont(ofSize: 17, weight: .regular)
        return UIFontMetrics(forTextStyle: .body).scaledFont(for: base)
    }

    final class Coordinator: NSObject, UITextViewDelegate {
        var text: Binding<String>
        let controller: MermaidSourceEditorController
        weak var textView: UITextView?
        private var keyboardTokens: [NSObjectProtocol] = []

        init(text: Binding<String>, controller: MermaidSourceEditorController) {
            self.text = text
            self.controller = controller
        }

        func textViewDidChange(_ textView: UITextView) {
            text.wrappedValue = textView.text ?? ""
            controller.refreshUndoStateSoon()
        }

        func observeKeyboard() {
            guard keyboardTokens.isEmpty else { return }
            let center = NotificationCenter.default
            keyboardTokens = [
                center.addObserver(forName: UIResponder.keyboardWillChangeFrameNotification, object: nil, queue: .main) { [weak self] note in
                    self?.applyKeyboardFrame(from: note)
                },
                center.addObserver(forName: UIResponder.keyboardDidChangeFrameNotification, object: nil, queue: .main) { [weak self] note in
                    // Recompute after SwiftUI has resized the split pane above the keyboard.
                    DispatchQueue.main.async { self?.applyKeyboardFrame(from: note) }
                },
                center.addObserver(forName: UIResponder.keyboardWillHideNotification, object: nil, queue: .main) { [weak self] note in
                    let duration = (note.userInfo?[UIResponder.keyboardAnimationDurationUserInfoKey] as? NSNumber)?.doubleValue
                    self?.setKeyboardOverlap(0, duration: duration ?? 0.25)
                },
            ]
        }

        func stopObservingKeyboard() {
            keyboardTokens.forEach { NotificationCenter.default.removeObserver($0) }
            keyboardTokens.removeAll()
        }

        private func applyKeyboardFrame(from notification: Notification) {
            guard let frame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect,
                  let textView else { return }
            let duration = (notification.userInfo?[UIResponder.keyboardAnimationDurationUserInfoKey] as? NSNumber)?.doubleValue ?? 0.25
            let viewFrame = textView.convert(textView.bounds, to: nil)
            let overlap = max(0, viewFrame.maxY - frame.minY)
            setKeyboardOverlap(overlap, duration: duration)
            let selected = textView.selectedRange
            if selected.location != NSNotFound {
                textView.scrollRangeToVisible(selected)
            }
        }

        private func setKeyboardOverlap(_ overlap: CGFloat, duration: TimeInterval) {
            guard let textView else { return }
            let apply = {
                textView.contentInset.bottom = overlap
                textView.verticalScrollIndicatorInsets.bottom = overlap
            }
            if duration > 0 {
                UIView.animate(withDuration: duration, delay: 0, options: [.curveEaseInOut, .beginFromCurrentState], animations: apply)
            } else {
                apply()
            }
        }
    }
}

// MARK: - Source bar tools

/// Runs the Source bar's tools on the mermaid `UITextView`. Edits go through `replace(_:withText:)`, so each is one
/// step on the text view's own undo stack, next to the typing around it.
@MainActor
@Observable
final class MermaidSourceEditorController {
    @ObservationIgnored weak var textView: UITextView?
    /// Hands the edited text to the note's binding.
    @ObservationIgnored var onTextChanged: ((String) -> Void)?
    private(set) var canUndo = false
    private(set) var canRedo = false

    static let indentUnit = "    "

    func refreshUndoState() {
        let undoManager = textView?.undoManager
        if canUndo != (undoManager?.canUndo ?? false) { canUndo = undoManager?.canUndo ?? false }
        if canRedo != (undoManager?.canRedo ?? false) { canRedo = undoManager?.canRedo ?? false }
    }

    /// Typing is grouped per run loop, so the undo stack settles just after the change is reported.
    func refreshUndoStateSoon() {
        refreshUndoState()
        DispatchQueue.main.async { [weak self] in self?.refreshUndoState() }
    }

    func undo() {
        textView?.undoManager?.undo()
        textDidChange()
    }

    func redo() {
        textView?.undoManager?.redo()
        textDidChange()
    }

    /// Puts `snippet` over the selection, then selects `select` within it (the caret at its end when `nil`).
    func insert(_ snippet: String, select: NSRange? = nil) {
        guard let textView, let range = textView.selectedTextRange else { return }
        let start = textView.offset(from: textView.beginningOfDocument, to: range.start)
        textView.replace(range, withText: snippet)
        let placed = select ?? NSRange(location: (snippet as NSString).length, length: 0)
        textView.selectedRange = NSRange(location: start + placed.location, length: placed.length)
        textDidChange()
    }

    func toggleComment() { transformSelectedLines(Self.togglingComment) }
    /// With a bare caret the line is indented even when blank, as Tab would; a selection leaves its blank lines alone.
    func indent() {
        let caretOnly = textView?.selectedRange.length == 0
        transformSelectedLines { Self.indenting($0, includingBlankLines: caretOnly) }
    }
    func outdent() { transformSelectedLines(Self.outdenting) }

    /// `%% ` after each line's indentation, or off again when every non-blank line already has it.
    nonisolated static func togglingComment(_ lines: [String]) -> [String] {
        let written = lines.filter { !$0.trimmingCharacters(in: .whitespaces).isEmpty }
        let allCommented = !written.isEmpty && written.allSatisfy { $0.trimmingCharacters(in: .whitespaces).hasPrefix("%%") }
        return lines.map { line in
            let indent = line.prefix { $0 == " " || $0 == "\t" }
            let body = line.dropFirst(indent.count)
            if allCommented {
                guard body.hasPrefix("%%") else { return line }
                var rest = body.dropFirst(2)
                if rest.hasPrefix(" ") { rest = rest.dropFirst() }
                return String(indent) + rest
            }
            return body.isEmpty ? line : String(indent) + "%% " + body
        }
    }

    nonisolated static func indenting(_ lines: [String], includingBlankLines: Bool = false) -> [String] {
        lines.map { $0.isEmpty && !includingBlankLines ? $0 : indentUnit + $0 }
    }

    /// Removes one tab or up to one indent's worth of spaces.
    nonisolated static func outdenting(_ lines: [String]) -> [String] {
        lines.map { line in
            if line.hasPrefix("\t") { return String(line.dropFirst()) }
            let spaces = line.prefix(indentUnit.count).prefix { $0 == " " }.count
            return String(line.dropFirst(spaces))
        }
    }

    /// Rewrites the lines the selection touches in one replacement (one undo step), keeping the caret on its line or
    /// selecting the rewritten lines.
    private func transformSelectedLines(_ transform: ([String]) -> [String]) {
        guard let textView else { return }
        let text = (textView.text ?? "") as NSString
        let selected = textView.selectedRange
        // A selection ending at the start of a line does not take that line in.
        var probe = selected
        if probe.length > 0, text.character(at: probe.location + probe.length - 1) == 10 { probe.length -= 1 }
        var lineRange = text.lineRange(for: probe)
        if lineRange.length > 0, text.character(at: lineRange.location + lineRange.length - 1) == 10 { lineRange.length -= 1 }

        let block = text.substring(with: lineRange)
        let lines = (block as NSString).components(separatedBy: "\n")
        let rewritten = transform(lines).joined(separator: "\n")
        guard rewritten != block,
              let start = textView.position(from: textView.beginningOfDocument, offset: lineRange.location),
              let end = textView.position(from: start, offset: lineRange.length),
              let range = textView.textRange(from: start, to: end)
        else { return }

        textView.replace(range, withText: rewritten)
        let newLength = (rewritten as NSString).length
        if selected.length == 0 && lines.count == 1 {
            let caret = max(lineRange.location, selected.location + newLength - lineRange.length)
            textView.selectedRange = NSRange(location: caret, length: 0)
        } else {
            textView.selectedRange = NSRange(location: lineRange.location, length: newLength)
        }
        textDidChange()
    }

    private func textDidChange() {
        guard let textView else { return }
        onTextChanged?(textView.text ?? "")
        refreshUndoStateSoon()
    }
}

// MARK: - Preview WebView

private struct MermaidPreviewWebView: UIViewRepresentable {
    @Binding var source: String
    var colorScheme: ColorScheme

    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> WKWebView {
        let uc = WKUserContentController()
        uc.add(context.coordinator, name: "mermaidEditorReady")
        let config = WKWebViewConfiguration()
        config.userContentController = uc
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.scrollView.minimumZoomScale = 1.0
        webView.scrollView.maximumZoomScale = 5.0
        webView.scrollView.bouncesZoom = true
        if #available(iOS 16.4, *) {
            webView.isInspectable = true
        }
        context.coordinator.webView = webView
        context.coordinator.lastAppliedColorScheme = colorScheme
        webView.applyTrinoteAppearanceMode()

        if let fileURL = Bundle.main.url(forResource: "mermaid-editor", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        }
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        webView.applyTrinoteAppearanceMode()
        let coordinator = context.coordinator
        if let last = coordinator.lastAppliedColorScheme, last != colorScheme {
            coordinator.lastAppliedColorScheme = colorScheme
            coordinator.pendingSource = source
            coordinator.reloadForAppearanceChange()
            return
        }
        coordinator.lastAppliedColorScheme = colorScheme
        if coordinator.isReady {
            coordinator.render(source)
        } else {
            coordinator.pendingSource = source
        }
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        webView.configuration.userContentController
            .removeScriptMessageHandler(forName: "mermaidEditorReady")
    }

    class Coordinator: NSObject, WKScriptMessageHandler {
        weak var webView: WKWebView?
        var isReady = false
        var pendingSource: String?
        var lastAppliedColorScheme: ColorScheme?
        private var lastRenderedSource: String?

        func userContentController(_ uc: WKUserContentController, didReceive message: WKScriptMessage) {
            guard message.name == "mermaidEditorReady" else { return }
            isReady = true
            if let pending = pendingSource {
                pendingSource = nil
                render(pending)
            }
        }

        func reloadForAppearanceChange() {
            guard let webView else { return }
            webView.applyTrinoteAppearanceMode()
            isReady = false
            lastRenderedSource = nil
            webView.reload()
        }

        func render(_ source: String) {
            guard isReady, let webView else { return }
            guard source != lastRenderedSource else { return }
            lastRenderedSource = source

            let escaped = source
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
                .replacingOccurrences(of: "\n", with: "\\n")
                .replacingOccurrences(of: "\r", with: "\\r")
            let isDark = lastAppliedColorScheme == .dark

            webView.evaluateJavaScript("window.mermaidEditor.render('\(escaped)', \(isDark));") { _, error in
                if let error {
                    Log.api.error("Mermaid editor render failed: \(error)")
                }
            }
        }
    }
}
