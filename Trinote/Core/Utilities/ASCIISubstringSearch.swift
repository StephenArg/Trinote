import Foundation

// MARK: - Byte-level substring probes for note bodies

/// `String.contains` is grapheme-aware and `localizedCaseInsensitiveContains` is locale-aware; both walk a
/// multi-megabyte note body at roughly 15–100 MB/s. Note bodies with inlined image data URIs reach several
/// megabytes, and the load/render paths probe them for ASCII markers (`api/attachments/`, `math-tex`,
/// `include-note`, …) on the main actor, so a single probe cost tens of milliseconds. These variants scan the
/// UTF-8 bytes with `memmem` / `memchr` instead, which is roughly 30× faster on the same body.
///
/// Both compare bytes, so they only match the stdlib versions for ASCII needles; case folding is ASCII-only.
/// That covers HTML markers, which is all these are used for.
extension String {
    /// `contains(needle)` for an ASCII needle.
    func containsASCII(_ needle: String) -> Bool {
        var haystack = self
        var pattern = needle
        return haystack.withUTF8 { hay in
            pattern.withUTF8 { pat in
                // `contains("")` is false, and these stand in for it.
                guard !pat.isEmpty else { return false }
                guard hay.count >= pat.count,
                      let hayBase = hay.baseAddress,
                      let patBase = pat.baseAddress
                else { return false }
                return memmem(hayBase, hay.count, patBase, pat.count) != nil
            }
        }
    }

    /// `localizedCaseInsensitiveContains(needle)` for an ASCII needle.
    func containsASCIICaseInsensitive(_ needle: String) -> Bool {
        let lowercased = needle.lowercased()
        guard !lowercased.isEmpty else { return false }
        // An exact hit settles it, and `memmem` beats folding byte by byte.
        if containsASCII(lowercased) { return true }
        let folded = Array(lowercased.utf8)
        var haystack = self
        return haystack.withUTF8 { Self.containsFoldedASCII($0, needle: folded) }
    }

    private static func asciiLowercased(_ byte: UInt8) -> UInt8 {
        (byte >= UInt8(ascii: "A") && byte <= UInt8(ascii: "Z")) ? byte + 32 : byte
    }

    /// Scans for `needle` (already ASCII-lowercased) folding the haystack as it goes, using `memchr` to skip to
    /// candidate start bytes instead of testing every offset.
    private static func containsFoldedASCII(_ haystack: UnsafeBufferPointer<UInt8>, needle: [UInt8]) -> Bool {
        guard let base = haystack.baseAddress, !needle.isEmpty, haystack.count >= needle.count else {
            return false
        }
        let lowerFirst = needle[0]
        let upperFirst: UInt8? = (lowerFirst >= UInt8(ascii: "a") && lowerFirst <= UInt8(ascii: "z"))
            ? lowerFirst - 32
            : nil
        let lastStart = haystack.count - needle.count
        var offset = 0
        while offset <= lastStart {
            let searchable = lastStart - offset + 1
            var candidate = Int.max
            if let hit = memchr(base + offset, Int32(lowerFirst), searchable) {
                candidate = UnsafeRawPointer(hit) - UnsafeRawPointer(base)
            }
            if let upperFirst, let hit = memchr(base + offset, Int32(upperFirst), searchable) {
                candidate = Swift.min(candidate, UnsafeRawPointer(hit) - UnsafeRawPointer(base))
            }
            guard candidate != Int.max else { return false }
            var matched = 1
            while matched < needle.count, asciiLowercased(base[candidate + matched]) == needle[matched] {
                matched += 1
            }
            if matched == needle.count { return true }
            offset = candidate + 1
        }
        return false
    }
}
