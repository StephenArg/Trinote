import SwiftUI
import WebKit

struct MermaidEditorView: View {
    @Binding var editableContent: String
    var onSave: () -> Void
    var isSaving: Bool

    @Environment(\.colorScheme) private var colorScheme
    @State private var renderSource: String = ""
    @State private var debounceTask: Task<Void, Never>?

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
                        HStack {
                            Text(String(localized: "Source", comment: "Mermaid editor label"))
                                .font(.caption.weight(.medium))
                                .foregroundStyle(.secondary)
                            Spacer()
                        }
                        .padding(.horizontal)
                        .padding(.top, 8)
                        .padding(.bottom, 4)

                        MermaidSourceTextView(text: $editableContent)
                    }

                    saveChip
                        .padding(.trailing, 16)
                        .padding(.bottom, 16)
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

    /// Extra space under the last line, on top of chip clearance, so the caret can sit
    /// above the keyboard / save chip.
    private static let extraScrollBelowLastLine: CGFloat = 48

    func makeCoordinator() -> Coordinator {
        Coordinator(text: $text)
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
        context.coordinator.observeKeyboard()
        return tv
    }

    func updateUIView(_ uiView: UITextView, context: Context) {
        context.coordinator.textView = uiView
        if uiView.text != text {
            let selected = uiView.selectedRange
            uiView.text = text
            let maxLocation = (text as NSString).length
            uiView.selectedRange = NSRange(location: min(selected.location, maxLocation), length: 0)
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
        weak var textView: UITextView?
        private var keyboardTokens: [NSObjectProtocol] = []

        init(text: Binding<String>) {
            self.text = text
        }

        func textViewDidChange(_ textView: UITextView) {
            text.wrappedValue = textView.text ?? ""
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
