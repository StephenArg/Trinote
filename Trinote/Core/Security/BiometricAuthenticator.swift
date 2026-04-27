import Foundation
import LocalAuthentication

enum BiometricKind: Equatable {
    case none
    case faceID
    case touchID
    case opticID

    /// Short product name for labels (Face ID, Touch ID, …).
    var localizedShortName: String {
        switch self {
        case .none:
            String(localized: "Biometrics", comment: "Generic biometrics label when type unknown")
        case .faceID:
            String(localized: "Face ID", comment: "Apple Face ID product name")
        case .touchID:
            String(localized: "Touch ID", comment: "Apple Touch ID product name")
        case .opticID:
            String(localized: "Optic ID", comment: "Apple Optic ID product name")
        }
    }

    /// Settings row title, e.g. "Unlock with Face ID".
    var localizedUnlockToggleTitle: String {
        switch self {
        case .none:
            String(localized: "Unlock with Biometrics", comment: "Settings: biometric lock toggle")
        case .faceID:
            String(localized: "Unlock with Face ID", comment: "Settings: Face ID toggle")
        case .touchID:
            String(localized: "Unlock with Touch ID", comment: "Settings: Touch ID toggle")
        case .opticID:
            String(localized: "Unlock with Optic ID", comment: "Settings: Optic ID toggle")
        }
    }

    /// Lock screen retry button title.
    var localizedUseButtonTitle: String {
        switch self {
        case .none:
            String(localized: "Use Biometrics", comment: "Lock screen: retry biometric auth")
        case .faceID:
            String(localized: "Use Face ID", comment: "Lock screen: retry Face ID")
        case .touchID:
            String(localized: "Use Touch ID", comment: "Lock screen: retry Touch ID")
        case .opticID:
            String(localized: "Use Optic ID", comment: "Lock screen: retry Optic ID")
        }
    }
}

enum BiometricAuthenticator {
    /// Current device biometry type and whether `evaluatePolicy` can run.
    static func availability() -> (kind: BiometricKind, available: Bool, error: NSError?) {
        let context = LAContext()
        var nsError: NSError?
        let canEvaluate = context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &nsError)
        let kind: BiometricKind
        switch context.biometryType {
        case .none:
            kind = .none
        case .touchID:
            kind = .touchID
        case .faceID:
            kind = .faceID
        case .opticID:
            kind = .opticID
        @unknown default:
            kind = .none
        }
        return (kind, canEvaluate, nsError)
    }

    /// Presents the system biometric sheet. Call from the main actor so the system UI presents reliably.
    static func authenticate(localizedReason: String) async -> Result<Void, LAError> {
        await withCheckedContinuation { continuation in
            let context = LAContext()
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: localizedReason) { success, error in
                if success {
                    continuation.resume(returning: .success(()))
                } else {
                    let laError = (error as? LAError) ?? LAError(LAError.Code.authenticationFailed)
                    continuation.resume(returning: .failure(laError))
                }
            }
        }
    }
}
