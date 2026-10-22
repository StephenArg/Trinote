import Foundation

/// Server-Sent Events as `POST /api/llm-chat/stream` sends them: one or more `data:` lines make a frame, an empty
/// line ends it, and a line starting with `:` is a comment (the server's 30 s heartbeat). Feed it lines (as
/// `URLSession.AsyncBytes.lines` gives them) or raw bytes in any chunking; it hands back each frame's data.
struct SSEFrameParser: Sendable {
    private var dataLines: [String] = []
    private var pendingBytes: [UInt8] = []

    init() {}

    /// One line without its terminator. Returns the frame's data when the line ends a frame.
    mutating func feed(line: String) -> String? {
        if line.isEmpty { return flushFrame() }
        if line.hasPrefix(":") { return nil }
        let field: Substring
        var value: Substring
        if let colon = line.firstIndex(of: ":") {
            field = line[..<colon]
            value = line[line.index(after: colon)...]
            if value.hasPrefix(" ") { value = value.dropFirst() }
        } else {
            field = line[...]
            value = ""
        }
        if field == "data" { dataLines.append(String(value)) }
        return nil
    }

    /// One raw byte. Returns the frame's data when the byte ends a frame (`\n` or `\r\n` line ends).
    mutating func feed(byte: UInt8) -> String? {
        guard byte == 0x0A else {
            pendingBytes.append(byte)
            return nil
        }
        return feed(line: takePendingLine())
    }

    /// Raw bytes in any chunking. Returns the frames these bytes complete.
    mutating func feed(bytes: some Sequence<UInt8>) -> [String] {
        var frames: [String] = []
        for byte in bytes {
            if let frame = feed(byte: byte) { frames.append(frame) }
        }
        return frames
    }

    /// What is still open when the stream ends: a last line without its terminator and a frame without its empty
    /// line. Returns that frame's data, if any.
    mutating func finish() -> String? {
        var frame: String?
        if !pendingBytes.isEmpty {
            frame = feed(line: takePendingLine())
        }
        return frame ?? flushFrame()
    }

    private mutating func takePendingLine() -> String {
        if pendingBytes.last == 0x0D { pendingBytes.removeLast() }
        defer { pendingBytes.removeAll(keepingCapacity: true) }
        return String(decoding: pendingBytes, as: UTF8.self)
    }

    private mutating func flushFrame() -> String? {
        guard !dataLines.isEmpty else { return nil }
        defer { dataLines.removeAll() }
        return dataLines.joined(separator: "\n")
    }
}
