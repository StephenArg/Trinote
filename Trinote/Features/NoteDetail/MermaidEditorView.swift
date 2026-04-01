import SwiftUI
import WebKit

struct MermaidEditorView: View {
    @Binding var editableContent: String
    var onSave: () -> Void
    var isSaving: Bool

    @State private var renderSource: String = ""
    @State private var debounceTask: Task<Void, Never>?

    var body: some View {
        GeometryReader { geo in
            VStack(spacing: 0) {
                MermaidPreviewWebView(source: $renderSource)
                    .frame(height: geo.size.height * 0.5)

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

                        TextEditor(text: $editableContent)
                            .font(.system(.body, design: .monospaced))
                            .scrollContentBackground(.hidden)
                            .autocorrectionDisabled()
                            .textInputAutocapitalization(.never)
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

// MARK: - Preview WebView

private struct MermaidPreviewWebView: UIViewRepresentable {
    @Binding var source: String

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

        if let fileURL = Bundle.main.url(forResource: "mermaid-editor", withExtension: "html") {
            webView.loadFileURL(fileURL, allowingReadAccessTo: Bundle.main.bundleURL)
        }
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let coordinator = context.coordinator
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
        private var lastRenderedSource: String?

        func userContentController(_ uc: WKUserContentController, didReceive message: WKScriptMessage) {
            guard message.name == "mermaidEditorReady" else { return }
            isReady = true
            if let pending = pendingSource {
                pendingSource = nil
                render(pending)
            }
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

            webView.evaluateJavaScript("window.mermaidEditor.render('\(escaped)');") { _, error in
                if let error {
                    Log.api.error("Mermaid editor render failed: \(error)")
                }
            }
        }
    }
}
