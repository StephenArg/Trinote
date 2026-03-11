import Foundation
import SwiftUI

// MARK: - String

extension String {
    var nilIfEmpty: String? {
        isEmpty ? nil : self
    }

    func truncated(to length: Int, trailing: String = "…") -> String {
        if count <= length { return self }
        return String(prefix(length)) + trailing
    }
}

// MARK: - Date Formatting (cached formatters)

private let _isoFormatterWithFractional: ISO8601DateFormatter = {
    let f = ISO8601DateFormatter()
    f.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    return f
}()

private let _isoFormatterPlain: ISO8601DateFormatter = {
    let f = ISO8601DateFormatter()
    f.formatOptions = [.withInternetDateTime]
    return f
}()

private let _triliumLocalFormatter: DateFormatter = {
    let f = DateFormatter()
    f.dateFormat = "yyyy-MM-dd HH:mm:ss.SSSZ"
    f.locale = Locale(identifier: "en_US_POSIX")
    return f
}()

private let _triliumLocalFormatterShort: DateFormatter = {
    let f = DateFormatter()
    f.dateFormat = "yyyy-MM-dd HH:mm:ss"
    f.locale = Locale(identifier: "en_US_POSIX")
    f.timeZone = .current
    return f
}()

private let _relativeFormatter: RelativeDateTimeFormatter = {
    let f = RelativeDateTimeFormatter()
    f.unitsStyle = .abbreviated
    return f
}()

extension String {
    /// Parse Trilium's date format (UTC ISO-8601 or local "yyyy-MM-dd HH:mm:ss") to Date
    func triliumDate() -> Date? {
        if let d = _isoFormatterWithFractional.date(from: self) { return d }
        if let d = _isoFormatterPlain.date(from: self) { return d }
        if let d = _triliumLocalFormatter.date(from: self) { return d }
        if let d = _triliumLocalFormatterShort.date(from: self) { return d }
        return nil
    }
}

extension Date {
    var relativeDisplay: String {
        _relativeFormatter.localizedString(for: self, relativeTo: .now)
    }

    var shortDisplay: String {
        let f = DateFormatter()
        f.dateStyle = .short
        f.timeStyle = .short
        return f.string(from: self)
    }
}

// MARK: - View

extension View {
    @ViewBuilder
    func `if`<Content: View>(_ condition: Bool, transform: (Self) -> Content) -> some View {
        if condition {
            transform(self)
        } else {
            self
        }
    }
}

// MARK: - Task Debounce

extension Task where Success == Never, Failure == Never {
    static func sleep(milliseconds: Int) async throws {
        try await Task.sleep(nanoseconds: UInt64(milliseconds) * 1_000_000)
    }
}
