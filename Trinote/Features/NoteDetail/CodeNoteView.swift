import SwiftUI

struct CodeNoteView: View {
    let content: String
    let mime: String

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

            ScrollView(.horizontal, showsIndicators: true) {
                Text(content)
                    .font(.system(.body, design: .monospaced))
                    .textSelection(.enabled)
                    .padding()
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
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

#Preview {
    CodeNoteView(content: """
    func hello() {
        print("Hello, world!")
    }
    """, mime: "text/x-swift")
}
