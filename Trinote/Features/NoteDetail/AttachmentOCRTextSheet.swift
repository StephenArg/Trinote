import SwiftUI
import UIKit

/// Sheet that loads existing OCR text and can request processing when none is stored.
struct AttachmentOCRTextSheet: View {
    let attachment: AttachmentItem
    let viewModel: NoteDetailViewModel
    let onDismiss: () -> Void

    @State private var isLoading = true
    @State private var isProcessing = false
    @State private var state: AttachmentOCRState = .empty
    @State private var didAttemptProcess = false

    var body: some View {
        NavigationStack {
            Group {
                if isLoading {
                    ProgressView()
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if isProcessing {
                    VStack(spacing: 12) {
                        ProgressView()
                        Text(String(localized: "Extracting text… This can take a minute.", comment: "OCR processing progress"))
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else {
                    content
                }
            }
            .navigationTitle(String(localized: "Extracted Text", comment: "OCR sheet title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Done", comment: "Dismiss OCR sheet")) {
                        onDismiss()
                    }
                }
                if case .text(let text) = state, !text.isEmpty {
                    ToolbarItem(placement: .primaryAction) {
                        Button(String(localized: "Copy", comment: "Copy OCR text")) {
                            UIPasteboard.general.string = text
                        }
                    }
                }
            }
        }
        .task { await load() }
    }

    @ViewBuilder
    private var content: some View {
        switch state {
        case .text(let text):
            ScrollView {
                Text(text)
                    .textSelection(.enabled)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
            }
        case .empty:
            emptyState
        case .unsupported:
            ContentUnavailableView(
                String(localized: "OCR Unavailable", comment: "OCR not supported title"),
                systemImage: "text.viewfinder",
                description: Text(String(
                    localized: "This server does not support OCR. Trilium 0.103 or later is required.",
                    comment: "OCR API missing (pre-0.103)"
                ))
            )
        case .failed(let message):
            VStack(spacing: 16) {
                ContentUnavailableView(
                    String(localized: "Couldn’t Load Text", comment: "OCR load failed title"),
                    systemImage: "exclamationmark.triangle",
                    description: Text(message)
                )
                Button(String(localized: "Try Again", comment: "Retry OCR")) {
                    Task { await load() }
                }
                .buttonStyle(.bordered)
            }
            .padding()
        }
    }

    private var emptyState: some View {
        VStack(spacing: 16) {
            ContentUnavailableView(
                String(localized: "No Extracted Text", comment: "OCR empty title"),
                systemImage: "text.viewfinder",
                description: Text(
                    didAttemptProcess
                        ? String(
                            localized: "OCR did not extract readable text. The image may have low contrast or confidence.",
                            comment: "OCR processed but empty"
                        )
                        : String(
                            localized: "No extracted text is stored for this attachment yet.",
                            comment: "OCR not processed yet"
                        )
                )
            )
            Button {
                Task { await process() }
            } label: {
                if isProcessing {
                    ProgressView()
                } else {
                    Text(String(localized: "Process OCR", comment: "Run attachment OCR"))
                }
            }
            .buttonStyle(.borderedProminent)
            .disabled(isProcessing)
        }
        .padding()
    }

    private func load() async {
        isLoading = true
        defer { isLoading = false }
        state = await viewModel.fetchAttachmentOCR(attachment)
    }

    private func process() async {
        isProcessing = true
        defer { isProcessing = false }
        didAttemptProcess = true
        state = await viewModel.processAttachmentOCR(attachment)
    }
}
