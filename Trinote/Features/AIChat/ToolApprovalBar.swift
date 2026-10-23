import SwiftUI

/// A tool call the running turn holds until the user answers (Trilium 0.107+): which tool it is, Deny and Allow, and
/// "Always allow" for the rest of the chat. Sits above the reply box while calls wait, the oldest first; its card in the
/// transcript shows what the call would do.
struct ToolApprovalBar: View {
    let call: ToolCall
    let isAnswering: Bool
    /// Why the last answer didn't reach the server.
    let error: String?
    let onAnswer: (_ approved: Bool, _ forChat: Bool) -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .firstTextBaseline, spacing: 8) {
                Image(systemName: "hand.raised.fill")
                    .foregroundStyle(.orange)
                    .accessibilityHidden(true)
                VStack(alignment: .leading, spacing: 2) {
                    Text(String(localized: "Allow this tool call?", comment: "AI chat: a tool call waits for the user's approval"))
                        .font(.subheadline.weight(.semibold))
                    Text(call.toolName)
                        .font(.footnote.monospaced())
                        .foregroundStyle(.secondary)
                }
                Spacer(minLength: 0)
                if isAnswering {
                    ProgressView()
                        .controlSize(.small)
                }
            }
            if let error {
                Text(error)
                    .font(.footnote)
                    .foregroundStyle(.red)
            }
            HStack(spacing: 8) {
                Button(String(localized: "Deny", comment: "AI chat: refuse the tool call that waits"), role: .destructive) {
                    onAnswer(false, false)
                }
                .buttonStyle(.bordered)
                Button(String(localized: "Allow", comment: "AI chat: let the tool call that waits run")) {
                    onAnswer(true, false)
                }
                .buttonStyle(.borderedProminent)
                Spacer(minLength: 0)
            }
            Button(allowForChatTitle) {
                onAnswer(true, true)
            }
            .font(.footnote)
            .buttonStyle(.borderless)
        }
        .disabled(isAnswering)
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(.bar)
    }

    private var allowForChatTitle: String {
        String(
            format: String(localized: "Always allow %@ for this chat", comment: "AI chat: let a tool run without asking for the rest of the chat; %@ is the tool's name"),
            locale: .current,
            call.toolName
        )
    }
}
