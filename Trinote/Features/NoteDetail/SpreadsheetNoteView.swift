import SwiftUI

/// Read-only viewer for Trilium v0.103+ spreadsheet notes (Univer Sheets JSON).
///
/// Univer's full editor is too heavy to embed in WKWebView on iOS for now, so we render a
/// best-effort preview of the first sheet's cell grid and offer a raw-JSON fallback for
/// inspection / copy-paste. A "Open in Web Browser" deep link sends the user to the desktop
/// Trilium UI when full editing is needed.
struct SpreadsheetNoteView: View {
    let json: String?
    let noteId: String
    let serverURL: String?

    @State private var showRawJSON = false

    private var parsed: UniverWorkbookPreview? {
        guard let json, let data = json.data(using: .utf8) else { return nil }
        return UniverWorkbookPreview.parse(data: data)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            if let workbook = parsed {
                SpreadsheetGridPreview(workbook: workbook)
            } else if let json, !json.isEmpty {
                missingPreviewCallout
                rawJSONBlock(json: json)
            } else {
                emptyState
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    @ViewBuilder
    private var header: some View {
        HStack(alignment: .center, spacing: 10) {
            Image(systemName: "tablecells")
                .font(.title3)
                .foregroundStyle(.secondary)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 2) {
                Text(String(localized: "Spreadsheet (read-only)", comment: "Spreadsheet note header"))
                    .font(.subheadline.weight(.semibold))
                Text(String(
                    localized: "Editing spreadsheets is not yet supported in Trinote. Open in the Trilium desktop or web app to make changes.",
                    comment: "Spreadsheet note read-only explanation"
                ))
                .font(.caption)
                .foregroundStyle(.secondary)
                .fixedSize(horizontal: false, vertical: true)
            }

            Spacer(minLength: 0)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)

        HStack(spacing: 12) {
            if let serverURL, let url = URL(string: "\(serverURL)/#/\(noteId)") {
                Link(destination: url) {
                    Label(String(localized: "Open in Web Browser", comment: "Spreadsheet note action"), systemImage: "safari")
                }
                .font(.caption.weight(.medium))
            }
            Button {
                showRawJSON.toggle()
            } label: {
                Label(
                    showRawJSON
                        ? String(localized: "Hide Raw JSON", comment: "Spreadsheet note action")
                        : String(localized: "View Raw JSON", comment: "Spreadsheet note action"),
                    systemImage: "curlybraces"
                )
            }
            .font(.caption.weight(.medium))
            Spacer(minLength: 0)
        }
        .padding(.horizontal, 12)
        .padding(.bottom, 10)

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
        if showRawJSON || parsed == nil {
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
}

// MARK: - Preview when JSON parses

private struct SpreadsheetGridPreview: View {
    let workbook: UniverWorkbookPreview

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

    @ViewBuilder
    private func sheetGrid(_ sheet: UniverWorkbookPreview.Sheet) -> some View {
        if sheet.rows.isEmpty {
            Text(String(localized: "This sheet has no data.", comment: "Spreadsheet sheet empty state"))
                .font(.caption)
                .foregroundStyle(.secondary)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 30)
        } else {
            ScrollView([.horizontal, .vertical]) {
                VStack(alignment: .leading, spacing: 0) {
                    headerRow(columns: sheet.columnCount)
                    ForEach(sheet.rows) { row in
                        gridRow(row, columns: sheet.columnCount)
                    }
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
            }
        }
    }

    private func headerRow(columns: Int) -> some View {
        HStack(spacing: 0) {
            cell(text: "", isHeader: true, width: SpreadsheetGridPreview.gutterWidth)
            ForEach(0..<columns, id: \.self) { c in
                cell(text: Self.columnLabel(for: c), isHeader: true, width: SpreadsheetGridPreview.cellWidth)
            }
        }
    }

    private func gridRow(_ row: UniverWorkbookPreview.Row, columns: Int) -> some View {
        HStack(spacing: 0) {
            cell(text: "\(row.index + 1)", isHeader: true, width: SpreadsheetGridPreview.gutterWidth)
            ForEach(0..<columns, id: \.self) { c in
                cell(text: row.values[c] ?? "", isHeader: false, width: SpreadsheetGridPreview.cellWidth)
            }
        }
    }

    private func cell(text: String, isHeader: Bool, width: CGFloat) -> some View {
        Text(text)
            .font(isHeader ? .caption2.weight(.semibold) : .caption2)
            .foregroundStyle(isHeader ? AnyShapeStyle(.secondary) : AnyShapeStyle(.primary))
            .lineLimit(1)
            .truncationMode(.tail)
            .frame(width: width, alignment: .leading)
            .padding(.horizontal, 6)
            .padding(.vertical, 4)
            .background(isHeader ? Color(.secondarySystemGroupedBackground) : Color.clear)
            .overlay(
                Rectangle()
                    .stroke(Color(.separator), lineWidth: 0.5)
            )
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

// MARK: - Parser (Univer workbook → preview rows)

/// Minimal Univer workbook representation just for preview. The official Univer schema is
/// large and evolving; we deliberately parse only the cell text we can display, gracefully
/// returning `nil` when shape diverges so the raw-JSON fallback kicks in.
struct UniverWorkbookPreview {
    struct Row: Identifiable {
        let index: Int
        var values: [Int: String]
        var id: Int { index }
    }

    struct Sheet {
        let id: String
        let name: String
        let columnCount: Int
        let rows: [Row]
    }

    let sheets: [Sheet]

    /// Trilium v0.103 wraps the Univer `IWorkbookData` in `{ version: 1, workbook: {...} }`
    /// (see `apps/client/src/widgets/type_widgets/spreadsheet/persistence.tsx`). Sheets live under
    /// `workbook.sheets[sheetId].cellData[rowIndex][colIndex]`, each cell shaped like
    /// `{ v?: string|number|bool, p?: { body: { dataStream }}, f?: formula, … }`.
    ///
    /// For forward compatibility we also accept a bare `IWorkbookData` (no envelope) so that
    /// future Trilium versions or third-party tooling don't blank the preview.
    static func parse(data: Data) -> UniverWorkbookPreview? {
        guard let any = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return nil }

        // Trilium envelope: { "version": N, "workbook": { ...IWorkbookData } }
        let workbook: [String: Any]
        if let wrapped = any["workbook"] as? [String: Any] {
            workbook = wrapped
        } else if any["sheets"] is [String: Any] {
            workbook = any
        } else {
            return nil
        }

        guard let sheetsDict = workbook["sheets"] as? [String: Any] else { return nil }
        let order = (workbook["sheetOrder"] as? [String]) ?? Array(sheetsDict.keys)
        var parsedSheets: [Sheet] = []
        for sheetId in order {
            guard let sheetDict = sheetsDict[sheetId] as? [String: Any] else { continue }
            let name = (sheetDict["name"] as? String) ?? sheetId
            let declaredColumnCount = (sheetDict["columnCount"] as? Int) ?? 0

            var rowMap: [Int: [Int: String]] = [:]
            var maxCol = -1
            if let cellData = sheetDict["cellData"] as? [String: Any] {
                for (rowKey, rowVal) in cellData {
                    guard let rowIdx = Int(rowKey), let rowCells = rowVal as? [String: Any] else { continue }
                    var thisRow: [Int: String] = [:]
                    for (colKey, cellVal) in rowCells {
                        guard let colIdx = Int(colKey) else { continue }
                        if let text = cellText(cellVal) {
                            thisRow[colIdx] = text
                            maxCol = max(maxCol, colIdx)
                        }
                    }
                    if !thisRow.isEmpty { rowMap[rowIdx] = thisRow }
                }
            }

            let columnCount = max(declaredColumnCount, maxCol + 1, 1)
            let rows = rowMap.keys.sorted().map { Row(index: $0, values: rowMap[$0] ?? [:]) }
            parsedSheets.append(Sheet(id: sheetId, name: name, columnCount: min(columnCount, 64), rows: rows))
        }
        if parsedSheets.isEmpty { return nil }
        return UniverWorkbookPreview(sheets: parsedSheets)
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
            // dataStream typically ends with control chars (e.g. \r\n) which look bad in a row.
            return stream.trimmingCharacters(in: .whitespacesAndNewlines)
        }
        return nil
    }
}
