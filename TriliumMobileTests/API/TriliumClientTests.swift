import XCTest
@testable import TriliumMobile

final class TriliumClientTests: XCTestCase {

    class MockURLProtocol: URLProtocol {
        nonisolated(unsafe) static var requestHandler: ((URLRequest) throws -> (HTTPURLResponse, Data))?

        override class func canInit(with request: URLRequest) -> Bool { true }
        override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

        override func startLoading() {
            guard let handler = Self.requestHandler else {
                client?.urlProtocolDidFinishLoading(self)
                return
            }
            do {
                let (response, data) = try handler(request)
                client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
                client?.urlProtocol(self, didLoad: data)
                client?.urlProtocolDidFinishLoading(self)
            } catch {
                client?.urlProtocol(self, didFailWithError: error)
            }
        }

        override func stopLoading() {}
    }

    private func makeClient(token: String? = "test-token") -> TriliumClient {
        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = [MockURLProtocol.self]
        let session = URLSession(configuration: config)
        return TriliumClient(baseURL: URL(string: "https://trilium.test")!, token: token, session: session)
    }

    private func respondJSON(_ json: String, statusCode: Int = 200) -> (URLRequest) throws -> (HTTPURLResponse, Data) {
        { request in
            (HTTPURLResponse(url: request.url!, statusCode: statusCode, httpVersion: nil, headerFields: nil)!, Data(json.utf8))
        }
    }

    // MARK: - Auth

    func testLoginSendsCorrectPayload() async throws {
        MockURLProtocol.requestHandler = { request in
            XCTAssertEqual(request.url?.path, "/etapi/auth/login")
            XCTAssertEqual(request.httpMethod, "POST")
            XCTAssertNil(request.value(forHTTPHeaderField: "Authorization"))

            return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!,
                    Data(#"{"authToken":"tok_abc123"}"#.utf8))
        }

        let client = makeClient(token: nil)
        let token = try await client.login(password: "secret", tokenName: "test")
        XCTAssertEqual(token, "tok_abc123")
    }

    func testBearerTokenSentOnAuthenticatedRequests() async throws {
        MockURLProtocol.requestHandler = { request in
            let auth = request.value(forHTTPHeaderField: "Authorization")
            XCTAssertEqual(auth, "Bearer test-token")
            return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!,
                    Data(#"{"appVersion":"0.63.7","dbVersion":227}"#.utf8))
        }

        let client = makeClient()
        _ = try await client.getAppInfo()
    }

    func testNoTokenThrowsNoTokenError() async {
        let client = makeClient(token: nil)
        do {
            _ = try await client.getAppInfo()
            XCTFail("Expected noToken error")
        } catch let error as APIError {
            XCTAssertTrue(error.isAuthError)
        } catch {
            XCTFail("Wrong error type: \(error)")
        }
    }

    // MARK: - Error Handling

    func testUnauthorizedThrowsAPIError() async {
        MockURLProtocol.requestHandler = respondJSON("", statusCode: 401)
        let client = makeClient()
        do {
            _ = try await client.getAppInfo()
            XCTFail("Expected unauthorized")
        } catch let error as APIError {
            XCTAssertTrue(error.isAuthError)
        } catch {
            XCTFail("Wrong error type")
        }
    }

    func testServerErrorParsesBody() async {
        let errorJSON = #"{"status":400,"code":"VALIDATION_ERROR","message":"Title cannot be empty"}"#
        MockURLProtocol.requestHandler = respondJSON(errorJSON, statusCode: 400)

        let client = makeClient()
        do {
            _ = try await client.getNote("test")
            XCTFail("Expected server error")
        } catch let error as APIError {
            if case .serverError(let code, let message) = error {
                XCTAssertEqual(code, 400)
                XCTAssertEqual(message, "Title cannot be empty")
            } else {
                XCTFail("Expected serverError, got \(error)")
            }
        } catch {
            XCTFail("Wrong error type")
        }
    }

    func testNotFoundContainsMessage() async {
        let errorJSON = #"{"status":404,"code":"NOT_FOUND","message":"Note 'xyz' not found"}"#
        MockURLProtocol.requestHandler = respondJSON(errorJSON, statusCode: 404)

        let client = makeClient()
        do {
            _ = try await client.getNote("xyz")
            XCTFail("Expected not found")
        } catch let error as APIError {
            if case .notFound(let msg) = error {
                XCTAssertTrue(msg.contains("not found"))
            } else {
                XCTFail("Expected notFound, got \(error)")
            }
        } catch {
            XCTFail("Wrong error type")
        }
    }

    // MARK: - Note CRUD

    func testGetNoteDecodesCorrectly() async throws {
        let json = """
        {"noteId":"abc","isProtected":false,"title":"My Note","type":"text","mime":"text/html","blobId":"b1","dateCreated":"2024-01-15 12:00:00","dateModified":"2024-01-15 13:00:00","utcDateCreated":"2024-01-15T12:00:00.000Z","utcDateModified":"2024-01-15T13:00:00.000Z","parentNoteIds":["root"],"childNoteIds":["c1","c2"],"parentBranchIds":["b_root_abc"],"childBranchIds":["b1","b2"],"attributes":[{"attributeId":"a1","noteId":"abc","type":"label","name":"icon","value":"bx-home","position":0,"isInheritable":false,"utcDateModified":"2024-01-15T12:00:00.000Z"}]}
        """
        MockURLProtocol.requestHandler = respondJSON(json)

        let client = makeClient()
        let note = try await client.getNote("abc")
        XCTAssertEqual(note.noteId, "abc")
        XCTAssertEqual(note.title, "My Note")
        XCTAssertEqual(note.childNoteIds.count, 2)
        XCTAssertEqual(note.attributes.count, 1)
        XCTAssertEqual(note.attributes[0].name, "icon")
    }

    // MARK: - Search

    func testSearchSendsQueryParam() async throws {
        MockURLProtocol.requestHandler = { request in
            XCTAssertTrue(request.url?.absoluteString.contains("search=hello") ?? false)
            return (HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!,
                    Data(#"{"results":[],"debugInfo":null}"#.utf8))
        }

        let client = makeClient()
        let response = try await client.searchNotes(query: "hello", limit: 10)
        XCTAssertEqual(response.results.count, 0)
    }

    // MARK: - APIError Classification

    func testAPIErrorIsRetryable() {
        XCTAssertTrue(APIError.timeout.isRetryable)
        XCTAssertTrue(APIError.networkUnavailable.isRetryable)
        XCTAssertTrue(APIError.serverError(statusCode: 503, message: nil).isRetryable)
        XCTAssertFalse(APIError.unauthorized.isRetryable)
        XCTAssertFalse(APIError.serverError(statusCode: 400, message: nil).isRetryable)
    }

    func testAPIErrorFromCancellation() {
        let error = CancellationError()
        let apiError = APIError.from(error)
        if case .cancelled = apiError {} else {
            XCTFail("Expected cancelled, got \(apiError)")
        }
    }

    func testAPIErrorSendable() {
        let error: APIError = .serverError(statusCode: 500, message: "test")
        let sendable: any Sendable = error
        XCTAssertNotNil(sendable)
    }
}
