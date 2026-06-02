import Foundation

/// Bonjour service type for Trinote local note transfer (MultipeerConnectivity).
enum LocalNoteTransferConstants {
    static let serviceType = "trinote-xfer"
    static let discoveryReceiveModeKey = "rm"
    static let discoveryAppVersionKey = "av"
    static let transferProtocolVersion = 2
    /// Prefix for `MCSession.sendResource` payload files.
    static let resourceNamePrefix = "trinote-payload"
    static let senderAckTimeoutSeconds: TimeInterval = 90

    static func resourceName(for transferId: UUID) -> String {
        "\(resourceNamePrefix)-\(transferId.uuidString)"
    }

    static func transferId(fromResourceName name: String) -> UUID? {
        guard name.hasPrefix("\(resourceNamePrefix)-") else { return nil }
        let raw = String(name.dropFirst(resourceNamePrefix.count + 1))
        return UUID(uuidString: raw)
    }
}

struct LocalTransferServerInfo: Codable, Equatable, Sendable {
    var appVersion: String
    var dbVersion: Int?
    var syncVersion: Int?

    init(from info: AppInfoResponse) {
        appVersion = info.appVersion
        dbVersion = info.dbVersion
        syncVersion = info.syncVersion
    }

    func asAppInfoResponse() -> AppInfoResponse {
        AppInfoResponse(
            appVersion: appVersion,
            dbVersion: dbVersion,
            syncVersion: syncVersion,
            buildDate: nil,
            buildRevision: nil,
            dataDirectory: nil,
            clipperProtocolVersion: nil,
            utcDateTime: nil
        )
    }
}

struct LocalTransferPeer: Identifiable, Equatable, Sendable {
    let id: String
    let displayName: String
    var serverInfo: LocalTransferServerInfo?
    var isConnected: Bool

    init(displayName: String, serverInfo: LocalTransferServerInfo? = nil, isConnected: Bool = false) {
        self.id = displayName
        self.displayName = displayName
        self.serverInfo = serverInfo
        self.isConnected = isConnected
    }
}

struct LocalNoteOffer: Identifiable, Equatable, Sendable {
    let id: UUID
    let title: String
    let noteType: String
    let mime: String
    let contentByteCount: Int
    let senderDisplayName: String

    init(
        id: UUID = UUID(),
        title: String,
        noteType: String,
        mime: String,
        contentByteCount: Int,
        senderDisplayName: String
    ) {
        self.id = id
        self.title = title
        self.noteType = noteType
        self.mime = mime
        self.contentByteCount = contentByteCount
        self.senderDisplayName = senderDisplayName
    }
}

struct LocalTransferAttachmentPayload: Codable, Equatable, Sendable {
    var role: String
    var mime: String
    var title: String
    var position: Int
    var data: Data
}

struct NoteTransferBundle: Codable, Equatable, Sendable {
    var transferVersion: Int
    var title: String
    var noteType: String
    var mime: String
    var textContent: String?
    var binaryContent: Data?
    var attachments: [LocalTransferAttachmentPayload]

    var totalByteCount: Int {
        (textContent?.utf8.count ?? 0) + (binaryContent?.count ?? 0) + attachments.reduce(0) { $0 + $1.data.count }
    }
}

// MARK: - Wire messages (small JSON only — payload bytes use `sendResource`)

enum LocalTransferWireKind: String, Codable, Sendable {
    case peerHello
    case noteOffer
    case offerResponse
    case payloadBegin
    case payloadComplete
    case transferAck
    case error
}

struct LocalTransferPeerHello: Codable, Sendable {
    var protocolVersion: Int
    var trinoteAppVersion: String
    var serverInfo: LocalTransferServerInfo
}

struct LocalTransferNoteOffer: Codable, Sendable {
    var offerId: UUID
    var title: String
    var noteType: String
    var mime: String
    var contentByteCount: Int
}

struct LocalTransferOfferResponse: Codable, Sendable {
    var offerId: UUID
    var accepted: Bool
    var parentNoteId: String?
}

struct LocalTransferPayloadBegin: Codable, Sendable {
    var transferId: UUID
    var byteCount: Int
    var title: String
}

struct LocalTransferPayloadComplete: Codable, Sendable {
    var transferId: UUID
}

struct LocalTransferTransferAck: Codable, Sendable {
    var transferId: UUID
    var success: Bool
    var errorMessage: String?
    var noteTitle: String?
}

struct LocalTransferErrorMessage: Codable, Sendable {
    var message: String
}

struct LocalTransferWireMessage: Codable, Sendable {
    var kind: LocalTransferWireKind
    var peerHello: LocalTransferPeerHello?
    var noteOffer: LocalTransferNoteOffer?
    var offerResponse: LocalTransferOfferResponse?
    var payloadBegin: LocalTransferPayloadBegin?
    var payloadComplete: LocalTransferPayloadComplete?
    var transferAck: LocalTransferTransferAck?
    var error: LocalTransferErrorMessage?

    static func peerHello(_ hello: LocalTransferPeerHello) -> LocalTransferWireMessage {
        LocalTransferWireMessage(
            kind: .peerHello, peerHello: hello, noteOffer: nil, offerResponse: nil,
            payloadBegin: nil, payloadComplete: nil, transferAck: nil, error: nil
        )
    }

    static func noteOffer(_ offer: LocalTransferNoteOffer) -> LocalTransferWireMessage {
        LocalTransferWireMessage(
            kind: .noteOffer, peerHello: nil, noteOffer: offer, offerResponse: nil,
            payloadBegin: nil, payloadComplete: nil, transferAck: nil, error: nil
        )
    }

    static func offerResponse(_ response: LocalTransferOfferResponse) -> LocalTransferWireMessage {
        LocalTransferWireMessage(
            kind: .offerResponse, peerHello: nil, noteOffer: nil, offerResponse: response,
            payloadBegin: nil, payloadComplete: nil, transferAck: nil, error: nil
        )
    }

    static func payloadBegin(_ begin: LocalTransferPayloadBegin) -> LocalTransferWireMessage {
        LocalTransferWireMessage(
            kind: .payloadBegin, peerHello: nil, noteOffer: nil, offerResponse: nil,
            payloadBegin: begin, payloadComplete: nil, transferAck: nil, error: nil
        )
    }

    static func payloadComplete(_ complete: LocalTransferPayloadComplete) -> LocalTransferWireMessage {
        LocalTransferWireMessage(
            kind: .payloadComplete, peerHello: nil, noteOffer: nil, offerResponse: nil,
            payloadBegin: nil, payloadComplete: complete, transferAck: nil, error: nil
        )
    }

    static func transferAck(_ ack: LocalTransferTransferAck) -> LocalTransferWireMessage {
        LocalTransferWireMessage(
            kind: .transferAck, peerHello: nil, noteOffer: nil, offerResponse: nil,
            payloadBegin: nil, payloadComplete: nil, transferAck: ack, error: nil
        )
    }

    static func error(_ message: String) -> LocalTransferWireMessage {
        LocalTransferWireMessage(
            kind: .error, peerHello: nil, noteOffer: nil, offerResponse: nil,
            payloadBegin: nil, payloadComplete: nil, transferAck: nil,
            error: LocalTransferErrorMessage(message: message)
        )
    }
}

enum LocalNoteTransferCodec {
    static func encode(_ message: LocalTransferWireMessage) throws -> Data {
        try JSONEncoder().encode(message)
    }

    static func decode(_ data: Data) throws -> LocalTransferWireMessage {
        try JSONDecoder().decode(LocalTransferWireMessage.self, from: data)
    }

    static func encodeBundle(_ bundle: NoteTransferBundle) throws -> Data {
        try JSONEncoder().encode(bundle)
    }

    static func decodeBundle(_ data: Data) throws -> NoteTransferBundle {
        try JSONDecoder().decode(NoteTransferBundle.self, from: data)
    }
}
