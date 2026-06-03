import Foundation

struct TriliumOAuthStatusResponse: Decodable, Sendable {
    let success: Bool
    let enabled: Bool
    let missingVars: [String]?
    let name: String?
    let email: String?
}

enum TriliumOAuthStatusClient {
    /// Public endpoint — no Trilium session required.
    static func fetch(baseURL: URL, cloudflareAccessCredentials: CloudflareAccessCredentials?) async throws -> TriliumOAuthStatusResponse {
        guard var components = URLComponents(url: baseURL, resolvingAgainstBaseURL: false) else {
            throw APIError.invalidURL
        }
        var path = components.path
        if path.isEmpty { path = "/" }
        if path.hasSuffix("/") {
            components.path = path + "api/oauth/status"
        } else {
            components.path = path + "/api/oauth/status"
        }
        components.path = components.path.replacingOccurrences(of: "//", with: "/")
        guard let url = components.url else { throw APIError.invalidURL }

        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.cachePolicy = .reloadIgnoringLocalCacheData
        if let cloudflareAccessCredentials, cloudflareAccessCredentials.isComplete {
            for (name, value) in cloudflareAccessCredentials.httpHeaders {
                request.setValue(value, forHTTPHeaderField: name)
            }
        }

        let (data, response) = try await URLSession.shared.data(for: request)
        guard let http = response as? HTTPURLResponse else { throw APIError.invalidResponse }
        guard (200...299).contains(http.statusCode) else {
            throw APIError.serverError(statusCode: http.statusCode, message: String(data: data, encoding: .utf8))
        }

        do {
            return try JSONDecoder().decode(TriliumOAuthStatusResponse.self, from: data)
        } catch {
            throw APIError.decodingFailed(error.localizedDescription)
        }
    }
}
