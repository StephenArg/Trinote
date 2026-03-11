import Foundation
import UIKit

// MARK: - Protocol

protocol TriliumClientProtocol: Actor, Sendable {
    var baseURL: URL { get }
    var currentToken: String? { get }
    func setToken(_ token: String?)
    func login(password: String, tokenName: String?) async throws -> String
    func logout() async throws
    func getAppInfo() async throws -> AppInfoResponse
    func getNote(_ noteId: String) async throws -> NoteResponse
    func getNoteContent(_ noteId: String) async throws -> Data
    func updateNote(_ noteId: String, request: UpdateNoteRequest) async throws -> NoteResponse
    func updateNoteContent(_ noteId: String, content: Data, contentType: String) async throws
    func deleteNote(_ noteId: String) async throws
    func createNote(_ request: CreateNoteRequest) async throws -> CreateNoteResponse
    func searchNotes(query: String, fastSearch: Bool, includeArchived: Bool, ancestorNoteId: String?, orderBy: String?, orderDirection: String?, limit: Int?) async throws -> SearchResponse
    func getBranch(_ branchId: String) async throws -> BranchResponse
    func createBranch(_ request: CreateBranchRequest) async throws -> BranchResponse
    func updateBranch(_ branchId: String, request: UpdateBranchRequest) async throws -> BranchResponse
    func deleteBranch(_ branchId: String) async throws
    func getAttribute(_ attributeId: String) async throws -> AttributeResponse
    func createAttribute(_ request: CreateAttributeRequest) async throws -> AttributeResponse
    func deleteAttribute(_ attributeId: String) async throws
    func getNoteAttachments(_ noteId: String) async throws -> [AttachmentResponse]
    func getAttachment(_ attachmentId: String) async throws -> AttachmentResponse
    func getAttachmentContent(_ attachmentId: String) async throws -> Data
    func uploadAttachmentContent(_ attachmentId: String, data: Data, contentType: String) async throws
    func createAttachment(_ request: CreateAttachmentRequest) async throws -> AttachmentResponse
    func deleteAttachment(_ attachmentId: String) async throws
}

// MARK: - Implementation

actor TriliumClient: TriliumClientProtocol {
    let baseURL: URL
    private var token: String?
    var currentToken: String? { token }
    private let session: URLSession
    private let decoder: JSONDecoder
    private let encoder: JSONEncoder

    init(baseURL: URL, token: String? = nil, session: URLSession? = nil) {
        self.baseURL = baseURL
        self.token = token
        self.decoder = JSONDecoder()
        self.encoder = JSONEncoder()

        if let session {
            self.session = session
        } else {
            let config = URLSessionConfiguration.default
            config.timeoutIntervalForRequest = 30
            config.timeoutIntervalForResource = 120
            config.waitsForConnectivity = true
            self.session = URLSession(configuration: config)
        }
    }

    func setToken(_ token: String?) {
        self.token = token
    }

    // MARK: - Auth

    func login(password: String, tokenName: String? = nil) async throws -> String {
        let name = tokenName ?? "TriliumMobile-\(Self.deviceName())"
        let body = LoginRequest(password: password, tokenName: name)
        let response: LoginResponse = try await post("/etapi/auth/login", body: body, authenticated: false)
        self.token = response.authToken
        return response.authToken
    }

    func logout() async throws {
        try await postEmpty("/etapi/auth/logout")
    }

    // MARK: - App Info

    func getAppInfo() async throws -> AppInfoResponse {
        try await get("/etapi/app-info")
    }

    // MARK: - Notes

    func getNote(_ noteId: String) async throws -> NoteResponse {
        try await get("/etapi/notes/\(noteId)")
    }

    func getNoteContent(_ noteId: String) async throws -> Data {
        try await getRaw("/etapi/notes/\(noteId)/content")
    }

    func updateNote(_ noteId: String, request: UpdateNoteRequest) async throws -> NoteResponse {
        try await patch("/etapi/notes/\(noteId)", body: request)
    }

    func updateNoteContent(_ noteId: String, content: Data, contentType: String = "text/html") async throws {
        // Trilium's Express middleware only parses text/plain, application/json, and
        // application/octet-stream by default. Sending the note's mime (e.g. text/html)
        // causes req.body to be undefined on the server. Use application/octet-stream
        // so the body is always parsed correctly.
        try await putRaw("/etapi/notes/\(noteId)/content", data: content, contentType: "application/octet-stream")
    }

    func deleteNote(_ noteId: String) async throws {
        try await delete("/etapi/notes/\(noteId)")
    }

    func createNote(_ request: CreateNoteRequest) async throws -> CreateNoteResponse {
        try await post("/etapi/create-note", body: request)
    }

    // MARK: - Search

    func searchNotes(
        query: String,
        fastSearch: Bool = false,
        includeArchived: Bool = false,
        ancestorNoteId: String? = nil,
        orderBy: String? = nil,
        orderDirection: String? = nil,
        limit: Int? = nil
    ) async throws -> SearchResponse {
        var params: [String: String] = ["search": query]
        if fastSearch { params["fastSearch"] = "true" }
        if includeArchived { params["includeArchivedNotes"] = "true" }
        if let ancestorNoteId { params["ancestorNoteId"] = ancestorNoteId }
        if let orderBy { params["orderBy"] = orderBy }
        if let orderDirection { params["orderDirection"] = orderDirection }
        if let limit { params["limit"] = String(limit) }
        return try await get("/etapi/notes", queryParams: params)
    }

    // MARK: - Branches

    func getBranch(_ branchId: String) async throws -> BranchResponse {
        try await get("/etapi/branches/\(branchId)")
    }

    func createBranch(_ request: CreateBranchRequest) async throws -> BranchResponse {
        try await post("/etapi/branches", body: request)
    }

    func updateBranch(_ branchId: String, request: UpdateBranchRequest) async throws -> BranchResponse {
        try await patch("/etapi/branches/\(branchId)", body: request)
    }

    func deleteBranch(_ branchId: String) async throws {
        try await delete("/etapi/branches/\(branchId)")
    }

    // MARK: - Attributes

    func getAttribute(_ attributeId: String) async throws -> AttributeResponse {
        try await get("/etapi/attributes/\(attributeId)")
    }

    func createAttribute(_ request: CreateAttributeRequest) async throws -> AttributeResponse {
        try await post("/etapi/attributes", body: request)
    }

    func deleteAttribute(_ attributeId: String) async throws {
        try await delete("/etapi/attributes/\(attributeId)")
    }

    // MARK: - Attachments

    func getNoteAttachments(_ noteId: String) async throws -> [AttachmentResponse] {
        try await get("/etapi/notes/\(noteId)/attachments")
    }

    func getAttachment(_ attachmentId: String) async throws -> AttachmentResponse {
        try await get("/etapi/attachments/\(attachmentId)")
    }

    func getAttachmentContent(_ attachmentId: String) async throws -> Data {
        try await getRaw("/etapi/attachments/\(attachmentId)/content")
    }

    func uploadAttachmentContent(_ attachmentId: String, data: Data, contentType: String) async throws {
        try await putRaw("/etapi/attachments/\(attachmentId)/content", data: data, contentType: contentType)
    }

    func createAttachment(_ request: CreateAttachmentRequest) async throws -> AttachmentResponse {
        try await post("/etapi/attachments", body: request)
    }

    func deleteAttachment(_ attachmentId: String) async throws {
        try await delete("/etapi/attachments/\(attachmentId)")
    }

    // MARK: - Request Building

    private func buildRequest(
        path: String,
        method: String,
        queryParams: [String: String]? = nil,
        authenticated: Bool = true
    ) throws -> URLRequest {
        guard var components = URLComponents(url: baseURL.appendingPathComponent(path), resolvingAgainstBaseURL: true) else {
            throw APIError.invalidURL
        }

        if let queryParams, !queryParams.isEmpty {
            components.queryItems = queryParams.map { URLQueryItem(name: $0.key, value: $0.value) }
        }

        guard let url = components.url else {
            throw APIError.invalidURL
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        if authenticated {
            guard let token else { throw APIError.noToken }
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }

        return request
    }

    // MARK: - HTTP Methods (typed JSON)

    private func get<T: Decodable>(_ path: String, queryParams: [String: String]? = nil) async throws -> T {
        let request = try buildRequest(path: path, method: "GET", queryParams: queryParams)
        return try await execute(request)
    }

    private func post<B: Encodable, T: Decodable>(_ path: String, body: B, authenticated: Bool = true) async throws -> T {
        var request = try buildRequest(path: path, method: "POST", authenticated: authenticated)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        do {
            request.httpBody = try encoder.encode(body)
        } catch {
            throw APIError.encodingFailed(error.localizedDescription)
        }
        return try await execute(request)
    }

    private func postEmpty(_ path: String) async throws {
        let request = try buildRequest(path: path, method: "POST")
        let (data, response) = try await performRequest(request)
        try validateResponse(response, data: data)
    }

    private func patch<B: Encodable, T: Decodable>(_ path: String, body: B) async throws -> T {
        var request = try buildRequest(path: path, method: "PATCH")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        do {
            request.httpBody = try encoder.encode(body)
        } catch {
            throw APIError.encodingFailed(error.localizedDescription)
        }
        return try await execute(request)
    }

    private func delete(_ path: String) async throws {
        let request = try buildRequest(path: path, method: "DELETE")
        let (data, response) = try await performRequest(request)
        try validateResponse(response, data: data)
    }

    // MARK: - Raw data methods

    private func getRaw(_ path: String) async throws -> Data {
        let request = try buildRequest(path: path, method: "GET")
        let (data, response) = try await performRequest(request)
        try validateResponse(response, data: data)
        return data
    }

    private func putRaw(_ path: String, data: Data, contentType: String) async throws {
        var request = try buildRequest(path: path, method: "PUT")
        request.setValue(contentType, forHTTPHeaderField: "Content-Type")
        request.httpBody = data
        let (responseData, response) = try await performRequest(request)
        try validateResponse(response, data: responseData)
    }

    // MARK: - Execution

    private func execute<T: Decodable>(_ request: URLRequest) async throws -> T {
        let (data, response) = try await performRequest(request)
        try validateResponse(response, data: data)

        do {
            return try decoder.decode(T.self, from: data)
        } catch {
            Log.api.error("Decoding failed for \(request.url?.path ?? "?"): \(error)")
            throw APIError.decodingFailed(error.localizedDescription)
        }
    }

    private func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        Log.api.debug("\(request.httpMethod ?? "?") \(request.url?.absoluteString ?? "?")")
        do {
            return try await session.data(for: request)
        } catch {
            Log.api.error("Network error: \(error)")
            throw APIError.from(error)
        }
    }

    private func validateResponse(_ response: URLResponse, data: Data) throws {
        guard let http = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }

        switch http.statusCode {
        case 200...299:
            return
        case 401:
            throw APIError.unauthorized
        case 404:
            let message = extractErrorMessage(from: data) ?? http.url?.path ?? "resource"
            throw APIError.notFound(message)
        default:
            let message = extractErrorMessage(from: data)
            throw APIError.serverError(statusCode: http.statusCode, message: message)
        }
    }

    /// ETAPI returns error details as JSON: {"status": 400, "code": "...", "message": "..."}
    private func extractErrorMessage(from data: Data) -> String? {
        struct ErrorBody: Decodable {
            let message: String?
            let code: String?
        }
        guard let body = try? decoder.decode(ErrorBody.self, from: data) else { return nil }
        if let message = body.message { return message }
        return body.code
    }

    private nonisolated static func deviceName() -> String {
        #if targetEnvironment(simulator)
        return "iOS-Simulator"
        #else
        return "iOS-Device"
        #endif
    }
}
