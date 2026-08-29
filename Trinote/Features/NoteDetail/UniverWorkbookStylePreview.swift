import SwiftUI

/// Maps Univer `IStyleData` JSON (workbook `styles` + per-cell `s`) into SwiftUI appearance for the read-only grid.
enum UniverWorkbookStylePreview {
    /// Univer stores default borders as black (`#000000`) and inverts them in dark mode
    /// (`CanvasColorService` / `invertColorByMatrix`). `.automatic` follows that: black in
    /// light mode, white in dark mode.
    enum EdgePaint: Equatable {
        case none
        case automatic
        case hex(String)
    }

    struct CellAppearance: Equatable {
        struct EdgeColors: Equatable {
            var top: EdgePaint = .none
            var right: EdgePaint = .none
            var bottom: EdgePaint = .none
            var left: EdgePaint = .none
        }

        var backgroundHex: String?
        var foregroundHex: String?
        var isBold: Bool
        var borders: EdgeColors

        static let plain = CellAppearance(
            backgroundHex: nil,
            foregroundHex: nil,
            isBold: false,
            borders: EdgeColors()
        )

        var background: Color? { backgroundHex.flatMap { Color(univerRGB: $0) } }
        var foreground: Color? { foregroundHex.flatMap { Color(univerRGB: $0) } }
    }

    static func appearance(
        row: Int,
        col: Int,
        cell: [String: Any],
        sheet: [String: Any],
        styles: [String: [String: Any]]
    ) -> CellAppearance {
        var layers: [[String: Any]] = []
        if let defaultStyle = sheet["defaultStyle"] {
            if let resolved = resolveStyleReference(defaultStyle, styles: styles) {
                layers.append(resolved)
            }
        }
        if let rowStyle = styleFromRowData(row: row, sheet: sheet, styles: styles) {
            layers.append(rowStyle)
        }
        if let columnStyle = styleFromColumnData(col: col, sheet: sheet, styles: styles) {
            layers.append(columnStyle)
        }
        if let cellStyle = cell["s"], let resolved = resolveStyleReference(cellStyle, styles: styles) {
            layers.append(resolved)
        }
        guard !layers.isEmpty else { return .plain }
        return appearance(from: mergeStyleLayers(layers))
    }

    // MARK: - Private

    private static func styleFromRowData(row: Int, sheet: [String: Any], styles: [String: [String: Any]]) -> [String: Any]? {
        guard let rowData = sheet["rowData"] as? [String: Any],
              let entry = rowData[String(row)] as? [String: Any],
              let style = entry["s"] else { return nil }
        return resolveStyleReference(style, styles: styles)
    }

    private static func styleFromColumnData(col: Int, sheet: [String: Any], styles: [String: [String: Any]]) -> [String: Any]? {
        guard let columnData = sheet["columnData"] as? [String: Any],
              let entry = columnData[String(col)] as? [String: Any],
              let style = entry["s"] else { return nil }
        return resolveStyleReference(style, styles: styles)
    }

    private static func resolveStyleReference(_ value: Any, styles: [String: [String: Any]]) -> [String: Any]? {
        if let id = value as? String { return styles[id] }
        if let dict = value as? [String: Any] { return dict }
        return nil
    }

    private static func mergeStyleLayers(_ layers: [[String: Any]]) -> [String: Any] {
        var merged: [String: Any] = [:]
        for layer in layers {
            for (key, value) in layer {
                if key == "bd", let incoming = value as? [String: Any] {
                    var borders = merged["bd"] as? [String: Any] ?? [:]
                    for (side, sideValue) in incoming {
                        borders[side] = sideValue
                    }
                    merged["bd"] = borders
                } else {
                    merged[key] = value
                }
            }
        }
        return merged
    }

    private static func appearance(from style: [String: Any]) -> CellAppearance {
        var borders = CellAppearance.EdgeColors()
        if let bd = style["bd"] as? [String: Any] {
            borders.top = edgePaint(bd["t"])
            borders.right = edgePaint(bd["r"])
            borders.bottom = edgePaint(bd["b"])
            borders.left = edgePaint(bd["l"])
        }
        return CellAppearance(
            backgroundHex: colorHex(style["bg"]),
            foregroundHex: colorHex(style["cl"]),
            isBold: isTruthy(style["bl"]),
            borders: borders
        )
    }

    private static func edgePaint(_ value: Any?) -> EdgePaint {
        guard let side = value as? [String: Any] else { return .none }
        let styleType = numericValue(side["s"]) ?? 0
        guard styleType != 0 else { return .none }
        guard let hex = colorHex(side["cl"]) else { return .automatic }
        return isThemeAutomaticBorderColor(hex) ? .automatic : .hex(hex)
    }

    /// Univer's default border picker writes black; those invert to white in dark mode.
    static func isThemeAutomaticBorderColor(_ hex: String) -> Bool {
        guard let rgb = RGBColor(univerRGB: hex) else { return false }
        return rgb.r < 8 && rgb.g < 8 && rgb.b < 8
    }

    private static func colorHex(_ value: Any?) -> String? {
        guard let dict = value as? [String: Any],
              let rgb = dict["rgb"] as? String else { return nil }
        return rgb
    }

    private static func isTruthy(_ value: Any?) -> Bool {
        if let flag = value as? Bool { return flag }
        if let number = value as? NSNumber { return number.intValue != 0 }
        return false
    }

    private static func numericValue(_ value: Any?) -> Int? {
        if let number = value as? NSNumber { return number.intValue }
        if let int = value as? Int { return int }
        return nil
    }
}

private struct RGBColor {
    let r: Int
    let g: Int
    let b: Int
    let a: Double

    init?(univerRGB: String) {
        let trimmed = univerRGB.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.hasPrefix("#") {
            var hex = String(trimmed.dropFirst())
            if hex.count == 3 {
                hex = hex.map { String(repeating: $0, count: 2) }.joined()
            }
            guard hex.count == 6 || hex.count == 8, let value = UInt64(hex, radix: 16) else { return nil }
            if hex.count == 8 {
                r = Int((value & 0xFF00_0000) >> 24)
                g = Int((value & 0x00FF_0000) >> 16)
                b = Int((value & 0x0000_FF00) >> 8)
                a = Double(value & 0x0000_00FF) / 255
            } else {
                r = Int((value & 0xFF0000) >> 16)
                g = Int((value & 0x00FF00) >> 8)
                b = Int(value & 0x0000FF)
                a = 1
            }
            return
        }
        if trimmed.lowercased().hasPrefix("rgb") {
            let digits = trimmed
                .replacingOccurrences(of: "rgba(", with: "", options: .caseInsensitive)
                .replacingOccurrences(of: "rgb(", with: "", options: .caseInsensitive)
                .replacingOccurrences(of: ")", with: "")
                .split(separator: ",")
                .compactMap { Double($0.trimmingCharacters(in: .whitespaces)) }
            guard digits.count >= 3 else { return nil }
            r = Int(digits[0])
            g = Int(digits[1])
            b = Int(digits[2])
            a = digits.count >= 4 ? digits[3] : 1
            return
        }
        return nil
    }
}

private extension Color {
    init?(univerRGB: String) {
        guard let rgb = RGBColor(univerRGB: univerRGB) else { return nil }
        self = Color(
            red: Double(rgb.r) / 255,
            green: Double(rgb.g) / 255,
            blue: Double(rgb.b) / 255,
            opacity: rgb.a
        )
    }
}

struct SpreadsheetPreviewCellBorderOverlay: View {
    let borders: UniverWorkbookStylePreview.CellAppearance.EdgeColors
    private let lineWidth: CGFloat = 1

    var body: some View {
        ZStack {
            edge(alignment: .top, paint: borders.top)
            edge(alignment: .bottom, paint: borders.bottom)
            edge(alignment: .leading, paint: borders.left)
            edge(alignment: .trailing, paint: borders.right)
        }
        .allowsHitTesting(false)
    }

    @ViewBuilder
    private func edge(alignment: Alignment, paint: UniverWorkbookStylePreview.EdgePaint) -> some View {
        Rectangle()
            .fill(color(for: paint))
            .frame(
                width: isVerticalEdge(alignment) ? lineWidth : nil,
                height: isHorizontalEdge(alignment) ? lineWidth : nil
            )
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: alignment)
    }

    private func color(for paint: UniverWorkbookStylePreview.EdgePaint) -> Color {
        switch paint {
        case .none:
            return Color(.separator)
        case .automatic:
            return Color.primary
        case .hex(let hex):
            if UniverWorkbookStylePreview.isThemeAutomaticBorderColor(hex) {
                return Color.primary
            }
            return Color(univerRGB: hex) ?? Color.primary
        }
    }

    private func isVerticalEdge(_ alignment: Alignment) -> Bool {
        alignment == .leading || alignment == .trailing
    }

    private func isHorizontalEdge(_ alignment: Alignment) -> Bool {
        alignment == .top || alignment == .bottom
    }
}
