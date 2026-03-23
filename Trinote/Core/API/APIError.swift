import Foundation

enum APIError: LocalizedError, Sendable {
    case invalidURL
    case invalidResponse
    case unauthorized
    case notFound(String)
    case serverError(statusCode: Int, message: String?)
    case networkUnavailable
    case timeout
    case certificateError
    case decodingFailed(String)
    case encodingFailed(String)
    /// No valid Trilium session (replaces legacy ETAPI “no token”).
    case noToken
    case connectionRefused
    case cancelled
    case unknown(String)

    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "Invalid server URL. Check the address and try again."
        case .invalidResponse:
            return "Received an invalid response from the server."
        case .unauthorized:
            return "Authentication failed. Check your password or sign in again in the browser if you use SSO/TOTP."
        case .notFound(let resource):
            return "Not found: \(resource)"
        case .serverError(let code, let message):
            let base = "Server error (\(code))"
            return message.map { "\(base): \($0)" } ?? base
        case .networkUnavailable:
            return "Network is unavailable. Check your connection."
        case .timeout:
            return "Request timed out. The server may be unreachable."
        case .certificateError:
            return "SSL certificate error. If using a self-signed certificate, check your server configuration."
        case .decodingFailed(let detail):
            return "Failed to parse server response: \(detail)"
        case .encodingFailed(let detail):
            return "Failed to encode request: \(detail)"
        case .noToken:
            return "Not signed in. Please log in with your Trilium password."
        case .connectionRefused:
            return "Connection refused. Check the server address and ensure Trilium is running."
        case .cancelled:
            return "Request was cancelled."
        case .unknown(let detail):
            return "Unexpected error: \(detail)"
        }
    }

    var isAuthError: Bool {
        switch self {
        case .unauthorized, .noToken: return true
        default: return false
        }
    }

    var isNetworkError: Bool {
        switch self {
        case .networkUnavailable, .timeout, .connectionRefused, .certificateError:
            return true
        default:
            return false
        }
    }

    var isRetryable: Bool {
        switch self {
        case .timeout, .networkUnavailable, .connectionRefused:
            return true
        case .serverError(let code, _) where code >= 500:
            return true
        default:
            return false
        }
    }

    static func from(_ error: Error) -> APIError {
        if let apiError = error as? APIError {
            return apiError
        }
        if (error as? CancellationError) != nil {
            return .cancelled
        }
        let nsError = error as NSError
        if nsError.domain == NSURLErrorDomain {
            switch nsError.code {
            case NSURLErrorCancelled:
                return .cancelled
            case NSURLErrorNotConnectedToInternet, NSURLErrorDataNotAllowed:
                return .networkUnavailable
            case NSURLErrorTimedOut:
                return .timeout
            case NSURLErrorServerCertificateUntrusted,
                 NSURLErrorServerCertificateHasBadDate,
                 NSURLErrorServerCertificateNotYetValid,
                 NSURLErrorServerCertificateHasUnknownRoot:
                return .certificateError
            case NSURLErrorCannotConnectToHost, NSURLErrorCannotFindHost:
                return .connectionRefused
            default:
                break
            }
        }
        return .unknown(error.localizedDescription)
    }
}
