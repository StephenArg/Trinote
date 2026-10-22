import Foundation

/// What a chat's options are called and what they do, shared by the reply box's status button and the Chat
/// Options sheet.
enum ChatToolDescriptions {
    static var webSearchTitle: String { String(localized: "Web search", comment: "AI chat options: let the model search the web") }
    static var noteToolsTitle: String { String(localized: "Note tools", comment: "AI chat options: let the model search and read notes") }
    static var thinkingTitle: String { String(localized: "Extended thinking", comment: "AI chat options: let the model think longer before answering") }
    static var effortTitle: String { String(localized: "Reasoning effort", comment: "AI chat options: how much the model reasons") }

    static var webSearchDescription: String {
        String(localized: "Search the internet and cite sources.", comment: "AI chat: what web search does")
    }
    static var noteToolsDescription: String {
        String(localized: "Search, read and edit your notes on the server.", comment: "AI chat: what the note tools do")
    }
    static var thinkingDescription: String {
        String(localized: "Think longer before answering; the reasoning shows as “Thought process”.", comment: "AI chat: what extended thinking does")
    }
    static var effortDescription: String {
        String(localized: "How long the model thinks before answering.", comment: "AI chat: what reasoning effort does")
    }
}
