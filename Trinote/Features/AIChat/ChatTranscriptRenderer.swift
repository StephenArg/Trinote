import Foundation
import SwiftUI

// What `chat-viewer.html` draws: a transcript rendered to HTML fragments on this side (Markdown through the same
// converter Markdown notes use), with every label already localized, so the page stays static and script-free.

/// A rendered block of a message, as the page draws it.
struct ChatTranscriptBlock: Encodable, Equatable, Sendable {
    /// `html` (rendered Markdown), `thinking`, `tool`, `image` or `file`.
    var type: String
    var html: String?
    var text: String?
    var toolName: String?
    /// Keeps a tool card open across redraws, and from the streamed reply into the stored one.
    var toolCallId: String?
    var toolInput: String?
    var toolResult: String?
    var toolError: Bool?
    var running: Bool?
    /// `pending` while the call waits for the user to allow it, `declined` once they denied it.
    var approval: String?
    var attachmentId: String?
    var mime: String?
    var title: String?

    static func html(_ html: String) -> ChatTranscriptBlock { ChatTranscriptBlock(type: "html", html: html) }
    static func thinking(_ text: String) -> ChatTranscriptBlock { ChatTranscriptBlock(type: "thinking", text: text) }
    static func image(_ ref: AttachmentBlockRef) -> ChatTranscriptBlock {
        ChatTranscriptBlock(type: "image", attachmentId: ref.attachmentId, mime: ref.mime, title: ref.title)
    }
    static func file(_ ref: AttachmentBlockRef) -> ChatTranscriptBlock {
        ChatTranscriptBlock(type: "file", attachmentId: ref.attachmentId, mime: ref.mime, title: ref.title)
    }
    static func tool(_ call: ToolCall) -> ChatTranscriptBlock {
        var input: String? = call.input.isEmpty ? nil : JSONValue.object(call.input).prettyText
        if input == nil, let streaming = call.inputStreaming, !streaming.isEmpty { input = streaming }
        return ChatTranscriptBlock(
            type: "tool",
            toolName: call.toolName,
            toolCallId: call.id,
            toolInput: input,
            toolResult: call.result,
            toolError: call.failed,
            running: call.result == nil,
            approval: call.approval?.rawValue
        )
    }
}

struct ChatTranscriptCitation: Encodable, Equatable, Sendable {
    var title: String
    var url: String?
    var site: String?
}

struct ChatTranscriptMessage: Encodable, Equatable, Sendable {
    var id: String
    /// `user`, `assistant` or `system`.
    var role: String
    /// `message`, `error` or `thinking`.
    var kind: String
    var blocks: [ChatTranscriptBlock]
    /// Plain text, for thinking and error messages.
    var text: String?
    var time: String
    var fullTime: String
    var model: String?
    var tokens: String?
    var cost: String?
    var citations: [ChatTranscriptCitation]?
    var citationsLabel: String?
    var errorTitle: String?
    var errorDetails: String?
    var canRetry: Bool
}

/// The reply being streamed: what has arrived so far.
struct ChatStreamingPayload: Encodable, Equatable, Sendable {
    var status: String?
    var thinking: String?
    var blocks: [ChatTranscriptBlock]
}

/// The page's own words, localized here.
struct ChatTranscriptLabels: Encodable, Equatable, Sendable {
    var thoughtProcess = String(localized: "Thought process", comment: "AI chat: collapsible card with the model's reasoning")
    var showDetails = String(localized: "Show details", comment: "AI chat: expands a failed turn's technical details")
    var retry = String(localized: "Retry", comment: "AI chat: re-run the failed turn")
    var running = String(localized: "Running…", comment: "AI chat: a tool call without a result yet")
    var awaitingApproval = String(localized: "Waiting for approval…", comment: "AI chat: a tool call waits for the user to allow it")
    var denied = String(localized: "denied", comment: "AI chat: a tool call the user refused to allow")
    var input = String(localized: "Input", comment: "AI chat: a tool call's arguments")
    var result = String(localized: "Result", comment: "AI chat: a tool call's result")
    var attachment = String(localized: "Attachment", comment: "AI chat: a file attached to a message, when its name is unknown")
    var diagramError = String(localized: "This diagram couldn't be drawn: its Mermaid code has an error.", comment: "AI chat: a Mermaid diagram in a reply that can't be parsed; its code shows below")
}

struct ChatTranscriptPayload: Encodable, Equatable, Sendable {
    var messages: [ChatTranscriptMessage]
    var labels = ChatTranscriptLabels()
    var emptyText: String
}

enum ChatTranscriptRenderer {

    // MARK: Transcript

    /// The page's JSON for a transcript. `canRetryLast` offers Retry on a trailing error message.
    static func transcriptJSON(for content: LlmChatContent, canRetryLast: Bool, emptyText: String? = nil) -> String {
        let payload = ChatTranscriptPayload(
            messages: messages(for: content, canRetryLast: canRetryLast),
            emptyText: emptyText ?? String(localized: "No messages yet.", comment: "AI chat: empty transcript")
        )
        return encode(payload)
    }

    static func messages(for content: LlmChatContent, canRetryLast: Bool) -> [ChatTranscriptMessage] {
        let count = content.messages.count
        return content.messages.enumerated().map { index, message in
            self.message(message, canRetry: canRetryLast && index == count - 1 && message.kind == .error)
        }
    }

    static func message(_ message: StoredMessage, canRetry: Bool) -> ChatTranscriptMessage {
        let (time, fullTime) = timeLabels(createdAt: message.createdAt)
        var rendered = ChatTranscriptMessage(
            id: message.id,
            role: message.role.rawValue,
            kind: message.kind.rawValue,
            blocks: [],
            time: time,
            fullTime: fullTime,
            canRetry: canRetry
        )
        switch message.kind {
        case .thinking:
            rendered.text = message.text
        case .error:
            rendered.text = message.text
            rendered.errorTitle = errorTitle(message.errorDetails)
            rendered.errorDetails = errorDetails(message: message.text, details: message.errorDetails)
        default:
            rendered.blocks = blocks(for: message.content)
            if let usage = message.usage {
                rendered.model = usage.model
                rendered.tokens = tokensLabel(usage)
                rendered.cost = costLabel(usage.cost)
            }
            if let citations = message.citations, !citations.isEmpty {
                rendered.citations = citations.map(citation)
                rendered.citationsLabel = String(
                    format: String(localized: "Sources (%lld)", comment: "AI chat: collapsible list of web sources; %lld is how many"),
                    locale: .current,
                    citations.count
                )
            }
        }
        return rendered
    }

    /// A message's content as page blocks: consecutive text is one Markdown block; everything else keeps its place.
    static func blocks(for content: MessageContent) -> [ChatTranscriptBlock] {
        var out: [ChatTranscriptBlock] = []
        var pendingText = ""
        func flushText() {
            guard !pendingText.isEmpty else { return }
            out.append(.html(html(markdown: pendingText)))
            pendingText = ""
        }
        for block in content.blocks {
            switch block {
            case .text(let text):
                pendingText += text
            case .thinking(let text):
                flushText()
                out.append(.thinking(text))
            case .toolCall(let call):
                // A call with nothing to show (provider-run web searches report `{}`) would be an empty card.
                guard !isEmptyToolCall(call) else { continue }
                flushText()
                out.append(.tool(call))
            case .image(let ref):
                flushText()
                out.append(.image(ref))
            case .file(let ref), .textFile(let ref):
                flushText()
                out.append(.file(ref))
            case .unknown:
                break
            }
        }
        flushText()
        return out
    }

    /// Markdown as the page shows it, through the converter Markdown notes use (tables, task lists, Mermaid fences).
    /// Raw HTML in the Markdown is escaped by the converter, so model output can't bring its own markup.
    static func html(markdown: String) -> String {
        MarkdownToNoteHTML.convert(markdown, options: .preview)
    }

    // MARK: Streaming

    static func streamingJSON(status: String?, thinking: String, blocks: [ContentBlock]) -> String {
        let rendered = self.blocks(for: .blocks(blocks))
        // A running tool with no card says what it's doing in a line under the reply instead.
        var status = status
        if status == nil, case .toolCall(let call)? = blocks.last, call.result == nil, isEmptyToolCall(call) {
            status = toolActivity(call.toolName)
        }
        return encode(ChatStreamingPayload(status: status, thinking: thinking.isEmpty ? nil : thinking, blocks: rendered))
    }

    /// Whether a tool call has neither arguments nor a result worth a card.
    static func isEmptyToolCall(_ call: ToolCall) -> Bool {
        func isBlank(_ text: String?) -> Bool {
            guard let text = text?.trimmingCharacters(in: .whitespacesAndNewlines) else { return true }
            return ["", "{}", "[]", "null", "\"\""].contains(text)
        }
        return call.input.isEmpty && isBlank(call.inputStreaming) && isBlank(call.result)
    }

    /// What a running tool is doing, for the line under a streaming reply.
    static func toolActivity(_ toolName: String) -> String {
        switch toolName {
        case "web_search", "web_fetch":
            return String(localized: "Searching the web…", comment: "AI chat: a web search runs")
        case "search_notes":
            return String(localized: "Searching your notes…", comment: "AI chat: the model searches the notes")
        case "get_note", "get_note_content", "get_note_attachments", "get_attachment_content":
            return String(localized: "Reading a note…", comment: "AI chat: the model reads a note")
        case "set_note_content", "append_to_note", "edit_note_content", "rename_note":
            return String(localized: "Editing a note…", comment: "AI chat: the model changes a note")
        default:
            return String(
                format: String(localized: "Running %@…", comment: "AI chat: a tool runs; %@ is its name"),
                locale: .current,
                toolName
            )
        }
    }

    // MARK: Theme

    static func themeJSON(colors: HTMLThemeColors, scheme: ColorScheme) -> String {
        let dark = scheme == .dark
        let theme: [String: String] = [
            "scheme": dark ? "dark" : "light",
            "text": dark ? colors.darkText : colors.lightText,
            "link": dark ? colors.darkLink : colors.lightLink,
            "accent": dark ? colors.darkLink : colors.lightLink
        ]
        let data = (try? JSONSerialization.data(withJSONObject: theme, options: [.sortedKeys])) ?? Data("{}".utf8)
        return String(decoding: data, as: UTF8.self)
    }

    // MARK: Labels

    static func errorTitle(_ details: LlmErrorDetails?) -> String {
        if let status = details?.statusCode {
            return String(
                format: String(localized: "API error (HTTP %lld)", comment: "AI chat: a failed turn whose provider answered; %lld is the HTTP status"),
                locale: .current,
                status
            )
        }
        return String(localized: "Error", comment: "AI chat: a failed turn")
    }

    /// The failed call's endpoint and raw answer, when they say more than the message does.
    static func errorDetails(message: String, details: LlmErrorDetails?) -> String? {
        guard let details else { return nil }
        var lines: [String] = []
        if let url = details.url, !url.isEmpty { lines.append(url) }
        if let status = details.statusCode { lines.append("HTTP \(status)") }
        if let body = details.responseBody?.trimmingCharacters(in: .whitespacesAndNewlines), !body.isEmpty, body != message {
            lines.append(body)
        }
        return lines.isEmpty ? nil : lines.joined(separator: "\n")
    }

    static func tokensLabel(_ usage: LlmUsage) -> String? {
        let total = usage.totalTokens ?? ((usage.promptTokens ?? 0) + (usage.completionTokens ?? 0))
        guard total > 0 else { return nil }
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        let count = formatter.string(from: NSNumber(value: total)) ?? String(total)
        return String(format: String(localized: "%@ tokens", comment: "AI chat: tokens a reply used; %@ is the count"), locale: .current, count)
    }

    static func costLabel(_ cost: Double?) -> String? {
        guard let cost, cost > 0 else { return nil }
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencyCode = "USD"
        formatter.minimumFractionDigits = 2
        formatter.maximumFractionDigits = cost < 0.01 ? 4 : 2
        return formatter.string(from: NSNumber(value: cost))
    }

    static func citation(_ citation: LlmCitation) -> ChatTranscriptCitation {
        let title = citation.title ?? citation.citedText.map { String($0.prefix(80)) } ?? citation.url ?? ""
        var site: String?
        if let url = citation.url.flatMap(URL.init(string:)), let host = url.host {
            site = host.hasPrefix("www.") ? String(host.dropFirst(4)) : host
        }
        return ChatTranscriptCitation(title: title, url: citation.url, site: site)
    }

    /// The message's time, short and in full, from desktop's ISO-8601 `createdAt`.
    static func timeLabels(createdAt: String) -> (String, String) {
        guard let date = parseDate(createdAt) else { return ("", "") }
        let short = DateFormatter()
        short.timeStyle = .short
        short.dateStyle = .none
        let full = DateFormatter()
        full.timeStyle = .short
        full.dateStyle = .medium
        return (short.string(from: date), full.string(from: date))
    }

    static func parseDate(_ text: String) -> Date? {
        let withFraction = ISO8601DateFormatter()
        withFraction.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        if let date = withFraction.date(from: text) { return date }
        let plain = ISO8601DateFormatter()
        plain.formatOptions = [.withInternetDateTime]
        return plain.date(from: text)
    }

    private static func encode<T: Encodable>(_ value: T) -> String {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys, .withoutEscapingSlashes]
        return String(decoding: (try? encoder.encode(value)) ?? Data("{}".utf8), as: UTF8.self)
    }
}

extension JSONValue {
    /// Indented JSON for showing a tool call's arguments.
    var prettyText: String {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes]
        guard let data = try? encoder.encode(self) else { return jsonText }
        return String(decoding: data, as: UTF8.self)
    }
}
