import Foundation

struct CloudflareAccessCredentials: Codable, Equatable, Sendable {
    let clientId: String
    let clientSecret: String

    static let clientIdHeader = "CF-Access-Client-Id"
    static let clientSecretHeader = "CF-Access-Client-Secret"

    var httpHeaders: [String: String] {
        [
            Self.clientIdHeader: clientId,
            Self.clientSecretHeader: clientSecret,
        ]
    }

    init(clientId: String, clientSecret: String) {
        self.clientId = clientId.trimmingCharacters(in: .whitespacesAndNewlines)
        self.clientSecret = clientSecret.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    var isComplete: Bool {
        !clientId.isEmpty && !clientSecret.isEmpty
    }
}

enum CloudflareAccessValidation {
    static func errorMessage(clientId: String, clientSecret: String) -> String? {
        let id = clientId.trimmingCharacters(in: .whitespacesAndNewlines)
        let secret = clientSecret.trimmingCharacters(in: .whitespacesAndNewlines)
        let hasId = !id.isEmpty
        let hasSecret = !secret.isEmpty
        if hasId == hasSecret { return nil }
        return String(
            localized: "Both Cloudflare Access Client ID and Client Secret are required when using Cloudflare Access.",
            comment: "Validation error when only one Cloudflare field is filled"
        )
    }
}
