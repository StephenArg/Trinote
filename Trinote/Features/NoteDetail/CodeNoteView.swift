import SwiftUI
import UIKit

struct CodeNoteView: View {
    let content: String
    let mime: String
    var findControl: FindOnPageControl?

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text(languageLabel)
                    .font(.caption.weight(.medium))
                    .foregroundStyle(.secondary)
                Spacer()
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

            CodeReadonlyTextView(text: content, findControl: findControl)
                .frame(minHeight: 120)
                .background(Color(.secondarySystemGroupedBackground))
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
        tv.showsHorizontalScrollIndicator = true
        tv.showsVerticalScrollIndicator = true
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

#Preview {
    CodeNoteView(content: """
    func hello() {
        print("Hello, world!")
    }
    """, mime: "text/x-swift")
}
