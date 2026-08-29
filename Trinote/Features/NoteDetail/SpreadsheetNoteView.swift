import SwiftUI

/// Read-only viewer for Trilium v0.103+ spreadsheet notes (Univer Sheets JSON).
///
/// Renders a fast native grid preview of the first sheet so just viewing a spreadsheet doesn't
/// pay the cost of booting the embedded Univer WKWebView. Tapping Edit hands off to
/// `SpreadsheetEditorView`, which loads the bundled Univer Sheets mobile build.
struct SpreadsheetNoteView: View {
    let json: String?
    var imageBytes: TriliumImageSchemeHandler.ByteProvider?

    @State private var fullScreenImage: FullScreenImagePayload?

    private var parsed: UniverWorkbookPreview? {
        guard let json, let data = json.data(using: .utf8) else { return nil }
        return UniverWorkbookPreview.parse(data: data)
    }

    private var floatImages: [SpreadsheetWorkbookImageURLs.FloatImagePreview] {
        guard let json else { return [] }
        return SpreadsheetWorkbookImageURLs.floatImagePreviews(in: json)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            if let workbook = parsed {
                SpreadsheetGridPreview(workbook: workbook, imageBytes: imageBytes)
                if !floatImages.isEmpty {
                    floatImagesSection(floatImages)
                }
            } else if let json, !json.isEmpty {
                missingPreviewCallout
                rawJSONBlock(json: json)
            } else {
                emptyState
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .fullScreenCover(item: $fullScreenImage) { payload in
            FullScreenImageViewer(image: payload.image, title: payload.title) {
                fullScreenImage = nil
            }
        }
    }

    @ViewBuilder
    private func floatImagesSection(_ images: [SpreadsheetWorkbookImageURLs.FloatImagePreview]) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Divider()
            Text(String(localized: "Floating images", comment: "Spreadsheet preview float images header"))
                .font(.caption.weight(.semibold))
                .foregroundStyle(.secondary)
                .padding(.horizontal, 12)
                .padding(.top, 8)

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 10) {
                    ForEach(images) { image in
                        SpreadsheetPreviewImageTile(
                            reference: image.reference,
                            imageBytes: imageBytes,
                            onTap: { uiImage in
                                fullScreenImage = FullScreenImagePayload(
                                    image: uiImage,
                                    title: String(localized: "Floating image", comment: "Full-screen title for spreadsheet float image")
                                )
                            }
                        )
                        .frame(width: 88, height: 72)
                    }
                }
                .padding(.horizontal, 12)
                .padding(.bottom, 10)
            }
        }
    }

    @ViewBuilder
    private var header: some View {
        HStack(alignment: .center, spacing: 10) {
            Image(systemName: "tablecells")
                .font(.title3)
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 2) {
                Text(String(localized: "Spreadsheet preview", comment: "Spreadsheet note header"))
                    .font(.subheadline.weight(.semibold))
                Text(String(
                    localized: "Tap Edit to open the full Univer Sheets editor with formulas, formatting, and rich text.",
                    comment: "Spreadsheet note preview explanation"
                ))
                .font(.caption)
                .foregroundStyle(.secondary)
                .fixedSize(horizontal: false, vertical: true)
            }

            Spacer(minLength: 0)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)

        Divider()
    }

    @ViewBuilder
    private var missingPreviewCallout: some View {
        Text(String(
            localized: "Could not parse the Univer workbook for preview. Raw JSON shown below.",
            comment: "Spreadsheet note fallback when JSON shape is unexpected"
        ))
        .font(.caption)
        .foregroundStyle(.secondary)
        .padding(12)
    }

    @ViewBuilder
    private var emptyState: some View {
        Text(String(localized: "This spreadsheet is empty.", comment: "Spreadsheet note empty state"))
            .font(.subheadline)
            .foregroundStyle(.secondary)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 40)
    }

    @ViewBuilder
    private func rawJSONBlock(json: String) -> some View {
        ScrollView([.horizontal, .vertical]) {
            Text(json)
                .font(.system(.caption2, design: .monospaced))
                .textSelection(.enabled)
                .padding(12)
        }
        .frame(maxHeight: 320)
        .background(Color(.secondarySystemGroupedBackground))
    }
}

// MARK: - Preview when JSON parses

private struct SpreadsheetGridPreview: View {
    let workbook: UniverWorkbookPreview
    var imageBytes: TriliumImageSchemeHandler.ByteProvider?

    @State private var selectedSheetIndex = 0

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            if workbook.sheets.count > 1 {
                Picker(String(localized: "Sheet", comment: "Spreadsheet sheet picker"), selection: $selectedSheetIndex) {
                    ForEach(Array(workbook.sheets.enumerated()), id: \.offset) { idx, sheet in
                        Text(sheet.name).tag(idx)
                    }
                }
                .pickerStyle(.segmented)
                .padding(.horizontal, 12)
                .padding(.top, 8)
            }

            let sheet = workbook.sheets[min(selectedSheetIndex, workbook.sheets.count - 1)]
            sheetGrid(sheet)
        }
    }

    private static let extraPreviewPadding = 3
    private static let minimumPreviewColumns = 3

    @ViewBuilder
    private func sheetGrid(_ sheet: UniverWorkbookPreview.Sheet) -> some View {
        let rows = previewRows(for: sheet)
        let columns = previewColumnCount(for: sheet)
        ScrollView([.horizontal, .vertical]) {
            VStack(alignment: .leading, spacing: 0) {
                headerRow(columns: columns)
                ForEach(rows) { row in
                    gridRow(row, sheet: sheet, columns: columns)
                }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
        }
    }

    /// Data rows plus three trailing blank rows for vertical breathing room in the preview.
    private func previewRows(for sheet: UniverWorkbookPreview.Sheet) -> [UniverWorkbookPreview.Row] {
        UniverWorkbookPreview.previewRows(for: sheet, extraPadding: Self.extraPreviewPadding)
    }

    /// Populated columns through the last used index, but never fewer than A–C.
    private func previewColumnCount(for sheet: UniverWorkbookPreview.Sheet) -> Int {
        let lastPopulatedColumn = max(
            sheet.rows.flatMap(\.values.keys).max() ?? -1,
            sheet.cellImageReferences.keys.compactMap { key -> Int? in
                let parts = key.split(separator: ":", maxSplits: 1)
                return parts.count == 2 ? Int(parts[1]) : nil
            }.max() ?? -1
        )
        return max(lastPopulatedColumn + 1, Self.minimumPreviewColumns)
    }

    private func headerRow(columns: Int) -> some View {
        HStack(spacing: 0) {
            cell(text: "", isHeader: true, width: SpreadsheetGridPreview.gutterWidth)
            ForEach(0..<columns, id: \.self) { c in
                cell(text: Self.columnLabel(for: c), isHeader: true, width: SpreadsheetGridPreview.cellWidth)
            }
        }
    }

    private func gridRow(_ row: UniverWorkbookPreview.Row, sheet: UniverWorkbookPreview.Sheet, columns: Int) -> some View {
        HStack(spacing: 0) {
            cell(text: "\(row.index + 1)", isHeader: true, width: SpreadsheetGridPreview.gutterWidth)
            ForEach(0..<columns, id: \.self) { c in
                if let reference = sheet.cellImageReferences["\(row.index):\(c)"] {
                    cellImage(reference)
                } else if let display = row.values[c] {
                    if display.text.isEmpty {
                        cell(text: "", isHeader: false, width: SpreadsheetGridPreview.cellWidth, appearance: display.appearance)
                    } else {
                        cell(display: display, isHeader: false, width: SpreadsheetGridPreview.cellWidth)
                    }
                } else {
                    cell(
                        text: "",
                        isHeader: false,
                        width: SpreadsheetGridPreview.cellWidth,
                        appearance: sheet.appearance(atRow: row.index, column: c)
                    )
                }
            }
        }
    }

    private func cellImage(_ reference: SpreadsheetWorkbookImageURLs.ImageReference) -> some View {
        SpreadsheetPreviewImageTile(reference: reference, imageBytes: imageBytes)
            .frame(width: SpreadsheetGridPreview.cellWidth, height: 28)
            .overlay(
                Rectangle()
                    .stroke(Color(.separator), lineWidth: 0.5)
            )
    }

    private func cell(text: String, isHeader: Bool, width: CGFloat, appearance: UniverWorkbookStylePreview.CellAppearance = .plain) -> some View {
        Text(text)
            .font(isHeader || appearance.isBold ? .caption2.weight(.semibold) : .caption2)
            .foregroundStyle(isHeader ? AnyShapeStyle(.secondary) : AnyShapeStyle(appearance.foreground ?? .primary))
            .lineLimit(1)
            .truncationMode(.tail)
            .frame(width: width, alignment: .leading)
            .padding(.horizontal, 6)
            .padding(.vertical, 4)
            .background(isHeader ? Color(.secondarySystemGroupedBackground) : (appearance.background ?? Color.clear))
            .overlay(SpreadsheetPreviewCellBorderOverlay(borders: appearance.borders))
    }

    private func cell(display: UniverWorkbookPreview.CellDisplay, isHeader: Bool, width: CGFloat) -> some View {
        Text(display.styledAttributedString)
            .font(isHeader || display.appearance.isBold ? .caption2.weight(.semibold) : .caption2)
            .lineLimit(1)
            .truncationMode(.tail)
            .frame(width: width, alignment: .leading)
            .padding(.horizontal, 6)
            .padding(.vertical, 4)
            .background(isHeader ? Color(.secondarySystemGroupedBackground) : (display.appearance.background ?? Color.clear))
            .overlay(SpreadsheetPreviewCellBorderOverlay(borders: display.appearance.borders))
    }

    private static let cellWidth: CGFloat = 96
    private static let gutterWidth: CGFloat = 40

    /// Excel-style A, B, …, Z, AA, AB column labels.
    static func columnLabel(for index: Int) -> String {
        var n = index
        var label = ""
        repeat {
            let r = n % 26
            label = String(UnicodeScalar(65 + r)!) + label
            n = n / 26 - 1
        } while n >= 0
        return label
    }
}

private struct SpreadsheetPreviewImageTile: View {
    let reference: SpreadsheetWorkbookImageURLs.ImageReference
    var imageBytes: TriliumImageSchemeHandler.ByteProvider?
    var onTap: ((UIImage) -> Void)?

    @State private var uiImage: UIImage?

    var body: some View {
        Group {
            if let onTap, let uiImage {
                Button {
                    onTap(uiImage)
                } label: {
                    tileContent
                }
                .buttonStyle(.plain)
                .accessibilityLabel(String(localized: "Floating image", comment: "Spreadsheet float image thumbnail"))
                .accessibilityHint(String(localized: "Opens full-screen image viewer", comment: "Spreadsheet float image tap hint"))
            } else {
                tileContent
            }
        }
        .task(id: reference) {
            guard uiImage == nil, let imageBytes else { return }
            guard let data = await imageBytes(reference.routeType, reference.entityId),
                  data.isPlausibleInlineImagePayload,
                  let image = UIImage(data: data) else { return }
            uiImage = image
        }
    }

    @ViewBuilder
    private var tileContent: some View {
        ZStack {
            if let uiImage {
                Image(uiImage: uiImage)
                    .resizable()
                    .scaledToFill()
                    .clipped()
            } else {
                Image(systemName: "photo")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .background(Color(.secondarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 4, style: .continuous))
    }
}

// MARK: - Parser (Univer workbook → preview rows)

/// Minimal Univer workbook representation just for preview. The official Univer schema is
/// large and evolving; we deliberately parse only the cell text we can display, gracefully
/// returning `nil` when shape diverges so the raw-JSON fallback kicks in.
struct UniverWorkbookPreview {
    /// One displayable cell: plain text plus optional hyperlink spans (Univer `customRanges`).
    struct CellDisplay: Equatable {
        struct LinkSpan: Equatable {
            let startUTF16: Int
            let endUTF16: Int
            let url: String
        }

        let text: String
        let links: [LinkSpan]
        var appearance: UniverWorkbookStylePreview.CellAppearance

        static func == (lhs: Self, rhs: Self) -> Bool {
            lhs.text == rhs.text && lhs.links == rhs.links
        }

        init(
            text: String,
            links: [LinkSpan] = [],
            appearance: UniverWorkbookStylePreview.CellAppearance = .plain
        ) {
            self.text = text
            self.links = links
            self.appearance = appearance
        }

        var styledAttributedString: AttributedString {
            var attributed = AttributedString(text)
            if let foreground = appearance.foreground {
                attributed.foregroundColor = foreground
            }
            let nsText = text as NSString
            for link in links {
                let length = max(0, link.endUTF16 - link.startUTF16)
                guard length > 0,
                      link.startUTF16 >= 0,
                      link.startUTF16 + length <= nsText.length else { continue }
                let range = NSRange(location: link.startUTF16, length: length)
                guard let stringRange = Range(range, in: text),
                      let attrStart = AttributedString.Index(stringRange.lowerBound, within: attributed),
                      let attrEnd = AttributedString.Index(stringRange.upperBound, within: attributed) else { continue }
                attributed[attrStart..<attrEnd].foregroundColor = .link
                attributed[attrStart..<attrEnd].underlineStyle = .single
                if let url = Self.openableURL(link.url) {
                    attributed[attrStart..<attrEnd].link = url
                }
            }
            return attributed
        }

        private static func openableURL(_ raw: String) -> URL? {
            if let url = URL(string: raw), url.scheme != nil { return url }
            if raw.hasPrefix("www.") { return URL(string: "https://\(raw)") }
            return nil
        }
    }

    struct Row: Identifiable {
        let index: Int
        var values: [Int: CellDisplay]
        var id: Int { index }
    }

    struct Sheet {
        let id: String
        let name: String
        let columnCount: Int
        let rows: [Row]
        let cellImageReferences: [String: SpreadsheetWorkbookImageURLs.ImageReference]
        let styleTable: [String: [String: Any]]
        let sheetStyleContext: [String: Any]

        func appearance(atRow row: Int, column col: Int, cell: [String: Any] = [:]) -> UniverWorkbookStylePreview.CellAppearance {
            UniverWorkbookStylePreview.appearance(
                row: row,
                col: col,
                cell: cell,
                sheet: sheetStyleContext,
                styles: styleTable
            )
        }
    }

    let sheets: [Sheet]

    /// Rows to render in the read-only grid: every index from the first populated row through
    /// the last (including blank rows in between), plus trailing padding.
    static func previewRows(for sheet: Sheet, extraPadding: Int) -> [Row] {
        var rowsByIndex = Dictionary(uniqueKeysWithValues: sheet.rows.map { ($0.index, $0) })
        var populatedIndices = Set(sheet.rows.map(\.index))
        for key in sheet.cellImageReferences.keys {
            let parts = key.split(separator: ":", maxSplits: 1)
            if parts.count == 2, let row = Int(parts[0]) {
                populatedIndices.insert(row)
            }
        }

        if let minIndex = populatedIndices.min(), let lastPopulated = populatedIndices.max() {
            for index in minIndex...lastPopulated where rowsByIndex[index] == nil {
                rowsByIndex[index] = Row(index: index, values: [:])
            }
            for offset in 0..<extraPadding {
                let index = lastPopulated + 1 + offset
                if rowsByIndex[index] == nil {
                    rowsByIndex[index] = Row(index: index, values: [:])
                }
            }
        } else {
            for index in 0..<extraPadding {
                rowsByIndex[index] = Row(index: index, values: [:])
            }
        }

        return rowsByIndex.values.sorted { $0.index < $1.index }
    }

    /// Trilium v0.103 wraps the Univer `IWorkbookData` in `{ version: 1, workbook: {...} }`
    /// (see `apps/client/src/widgets/type_widgets/spreadsheet/persistence.tsx`). Sheets live under
    /// `workbook.sheets[sheetId].cellData[rowIndex][colIndex]`, each cell shaped like
    /// `{ v?: string|number|bool, p?: { body: { dataStream }}, f?: formula, … }`.
    ///
    /// For forward compatibility we also accept a bare `IWorkbookData` (no envelope) so that
    /// future Trilium versions or third-party tooling don't blank the preview.
    static func parse(data: Data) -> UniverWorkbookPreview? {
        guard let any = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return nil }

        let workbook: [String: Any]
        if let wrapped = any["workbook"] as? [String: Any] {
            workbook = wrapped
        } else if any["sheets"] is [String: Any] {
            workbook = any
        } else {
            return nil
        }

        guard let sheetsDict = workbook["sheets"] as? [String: Any] else { return nil }
        let styleTable = parseStyleTable(workbook["styles"])
        let order = (workbook["sheetOrder"] as? [String]) ?? Array(sheetsDict.keys)
        var parsedSheets: [Sheet] = []
        for sheetId in order {
            guard let sheetDict = sheetsDict[sheetId] as? [String: Any] else { continue }
            let name = (sheetDict["name"] as? String) ?? sheetId
            let declaredColumnCount = (sheetDict["columnCount"] as? Int) ?? 0

            var rowMap: [Int: [Int: CellDisplay]] = [:]
            var imageRefs: [String: SpreadsheetWorkbookImageURLs.ImageReference] = [:]
            var maxCol = -1
            if let cellData = sheetDict["cellData"] as? [String: Any] {
                for (rowKey, rowVal) in cellData {
                    guard let rowIdx = Int(rowKey), let rowCells = rowVal as? [String: Any] else { continue }
                    var thisRow: [Int: CellDisplay] = [:]
                    for (colKey, cellVal) in rowCells {
                        guard let colIdx = Int(colKey) else { continue }
                        if let ref = SpreadsheetWorkbookImageURLs.imageReference(in: sheetDict, row: rowIdx, col: colIdx) {
                            imageRefs["\(rowIdx):\(colIdx)"] = ref
                            maxCol = max(maxCol, colIdx)
                        } else if let display = cellDisplay(
                            cellVal,
                            row: rowIdx,
                            col: colIdx,
                            sheet: sheetDict,
                            styles: styleTable
                        ) {
                            thisRow[colIdx] = display
                            maxCol = max(maxCol, colIdx)
                        }
                    }
                    if !thisRow.isEmpty { rowMap[rowIdx] = thisRow }
                }
            }

            let columnCount = max(declaredColumnCount, maxCol + 1, 1)
            var rowIndices = Set(rowMap.keys)
            rowIndices.formUnion(imageRefs.keys.compactMap { key in
                let parts = key.split(separator: ":", maxSplits: 1)
                return parts.count == 2 ? Int(parts[0]) : nil
            })
            let rows = rowIndices.sorted().map { Row(index: $0, values: rowMap[$0] ?? [:]) }
            parsedSheets.append(Sheet(
                id: sheetId,
                name: name,
                columnCount: min(columnCount, 64),
                rows: rows,
                cellImageReferences: imageRefs,
                styleTable: styleTable,
                sheetStyleContext: sheetStyleContext(from: sheetDict)
            ))
        }
        if parsedSheets.isEmpty { return nil }
        return UniverWorkbookPreview(sheets: parsedSheets)
    }

    private static func parseStyleTable(_ value: Any?) -> [String: [String: Any]] {
        guard let styles = value as? [String: Any] else { return [:] }
        var table: [String: [String: Any]] = [:]
        for (key, raw) in styles {
            if let dict = raw as? [String: Any] {
                table[key] = dict
            }
        }
        return table
    }

    private static func sheetStyleContext(from sheetDict: [String: Any]) -> [String: Any] {
        var context: [String: Any] = [:]
        for key in ["defaultStyle", "rowData", "columnData"] {
            if let value = sheetDict[key] {
                context[key] = value
            }
        }
        return context
    }

    /// Extracts preview text + hyperlink spans from one Univer cell payload.
    private static func cellDisplay(
        _ cell: Any,
        row: Int,
        col: Int,
        sheet: [String: Any],
        styles: [String: [String: Any]]
    ) -> CellDisplay? {
        guard let dict = cell as? [String: Any] else { return nil }

        var text = cellText(cell) ?? ""
        var links: [CellDisplay.LinkSpan] = []

        if let p = dict["p"] as? [String: Any],
           let body = p["body"] as? [String: Any],
           let dataStream = body["dataStream"] as? String,
           let customRanges = body["customRanges"] as? [[String: Any]] {
            for range in customRanges {
                guard isHyperlinkRange(range),
                      let url = (range["properties"] as? [String: Any])?["url"] as? String,
                      !url.isEmpty,
                      let start = range["startIndex"] as? Int,
                      let end = range["endIndex"] as? Int else { continue }

                let label = utf16Substring(of: dataStream, start: start, end: end)
                    .trimmingCharacters(in: .whitespacesAndNewlines)
                if text.isEmpty, !label.isEmpty { text = label }
                if let span = linkSpan(matching: label, in: text, url: url)
                    ?? linkSpan(matching: url, in: text, url: url) {
                    links.append(span)
                }
            }
        }

        if links.isEmpty, let auto = autoLinkSpan(in: text) {
            links = [auto]
        }

        let appearance = UniverWorkbookStylePreview.appearance(
            row: row,
            col: col,
            cell: dict,
            sheet: sheet,
            styles: styles
        )
        guard !text.isEmpty || appearance != .plain else { return nil }
        return CellDisplay(text: text, links: deduplicatedLinks(links), appearance: appearance)
    }

    private static func isHyperlinkRange(_ range: [String: Any]) -> Bool {
        if let value = range["rangeType"] as? Int { return value == 0 }
        if let value = range["rangeType"] as? NSNumber { return value.intValue == 0 }
        return false
    }

    /// Univer `customRanges` use an inclusive `endIndex` (see auto-link: `start + length - 1`).
    private static func utf16Substring(of string: String, start: Int, end: Int) -> String {
        let ns = string as NSString
        let length = end - start + 1
        guard start >= 0, end >= start, length > 0, start + length <= ns.length else { return "" }
        return ns.substring(with: NSRange(location: start, length: length))
    }

    private static func linkSpan(matching label: String, in text: String, url: String) -> CellDisplay.LinkSpan? {
        guard !label.isEmpty else { return nil }
        let nsText = text as NSString
        let range = nsText.range(of: label)
        guard range.location != NSNotFound else { return nil }
        return CellDisplay.LinkSpan(
            startUTF16: range.location,
            endUTF16: range.location + range.length,
            url: url
        )
    }

    private static func autoLinkSpan(in text: String) -> CellDisplay.LinkSpan? {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return nil }
        let candidate = trimmed.split(whereSeparator: \.isWhitespace).first.map(String.init) ?? trimmed
        guard let url = URL(string: candidate), let scheme = url.scheme?.lowercased() else { return nil }
        guard ["http", "https", "mailto"].contains(scheme) else { return nil }
        let nsText = text as NSString
        let range = nsText.range(of: candidate)
        guard range.location != NSNotFound else { return nil }
        return CellDisplay.LinkSpan(
            startUTF16: range.location,
            endUTF16: range.location + range.length,
            url: candidate
        )
    }

    private static func deduplicatedLinks(_ links: [CellDisplay.LinkSpan]) -> [CellDisplay.LinkSpan] {
        var seen = Set<String>()
        var unique: [CellDisplay.LinkSpan] = []
        for link in links {
            let key = "\(link.startUTF16)-\(link.endUTF16)-\(link.url)"
            guard seen.insert(key).inserted else { continue }
            unique.append(link)
        }
        return unique
    }

    /// Extracts a displayable string from one Univer cell payload.
    /// Handles primitive `v`, formula `f` fallback, and rich-text `p.body.dataStream`.
    private static func cellText(_ cell: Any) -> String? {
        guard let dict = cell as? [String: Any] else { return nil }
        if let s = dict["v"] as? String { return s }
        if let n = dict["v"] as? NSNumber { return n.stringValue }
        if let b = dict["v"] as? Bool { return b ? "TRUE" : "FALSE" }
        if let f = dict["f"] as? String { return f }
        if let p = dict["p"] as? [String: Any],
           let body = p["body"] as? [String: Any],
           let stream = body["dataStream"] as? String {
            return stream.trimmingCharacters(in: .whitespacesAndNewlines)
        }
        return nil
    }
}
