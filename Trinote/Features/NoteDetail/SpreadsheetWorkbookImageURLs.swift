import Foundation

/// Rewrites Trilium `api/attachments` / `api/images` URLs inside Univer workbook JSON so the
/// spreadsheet WKWebView can load them via `TriliumImageSchemeHandler`, and reverses the rewrite on save.
enum SpreadsheetWorkbookImageURLs {
    static let drawingResourceName = "SHEET_DRAWING_PLUGIN"
    private static let originalSrcKey = "trinoteOriginalSrc"

    struct ImageReference: Hashable, Sendable {
        let routeType: String
        let entityId: String
    }

    struct FloatImagePreview: Identifiable, Sendable {
        let id: String
        let sheetId: String
        let reference: ImageReference
    }

    /// Unique Trilium image entities referenced anywhere in the workbook JSON.
    static func collectReferences(in json: String) -> Set<ImageReference> {
        var refs = Set<ImageReference>()
        if let root = parseJSONObject(json) {
            walkReadOnly(root) { node in
                if let ref = reference(fromImageNode: node) {
                    refs.insert(ref)
                }
            }
        }
        for preview in floatImagePreviews(in: json) {
            refs.insert(preview.reference)
        }
        return refs
    }

    /// Float-image metadata for the read-only preview (from `SHEET_DRAWING_PLUGIN` resource).
    static func floatImagePreviews(in json: String) -> [FloatImagePreview] {
        guard let root = parseJSONObject(json),
              let workbook = workbookObject(from: root),
              let resources = workbook["resources"] as? [[String: Any]] else { return [] }

        guard let resource = resources.first(where: { ($0["name"] as? String) == drawingResourceName }),
              let dataString = resource["data"] as? String,
              !dataString.isEmpty,
              dataString != "{}",
              let drawingData = try? JSONSerialization.jsonObject(with: Data(dataString.utf8)) else {
            return []
        }

        var previews: [FloatImagePreview] = []
        collectFloatPreviews(from: drawingData, sheetId: nil, into: &previews)
        return previews
    }

    /// Rewrites resolvable Trilium image URLs to `trinote-img://` for the embedded editor.
    static func decorateForEditor(_ json: String) -> String {
        mutateJSONObject(json) { root in
            walkMutatingTree(&root, mutateNode: decorateImageNode)
            mutateDrawingResource(in: &root, mutateNode: decorateImageNode)
        } ?? json
    }

    /// Restores canonical Trilium attachment URLs before persisting workbook JSON.
    static func undecorateFromEditor(_ json: String) -> String {
        mutateJSONObject(json) { root in
            walkMutatingTree(&root, mutateNode: undecorateImageNode)
            mutateDrawingResource(in: &root, mutateNode: undecorateImageNode)
        } ?? json
    }

    private static func decorateImageNode(_ node: inout [String: Any]) {
        guard var source = node["source"] as? String,
              node["imageSourceType"] as? String == "URL" else { return }
        guard let ref = entityReference(from: source) else { return }
        if node[originalSrcKey] == nil {
            node[originalSrcKey] = source
        }
        source = TriliumImageScheme.url(routeType: ref.routeType, entityId: ref.entityId)
        node["source"] = source
    }

    private static func undecorateImageNode(_ node: inout [String: Any]) {
        if let original = node[originalSrcKey] as? String, !original.isEmpty {
            node["source"] = original
            node["imageSourceType"] = "URL"
            node.removeValue(forKey: originalSrcKey)
            return
        }

        guard let source = node["source"] as? String else { return }
        if let ref = TriliumImageScheme.reference(fromURLString: source) {
            node["source"] = canonicalAttachmentURL(routeType: ref.routeType, entityId: ref.entityId)
            node["imageSourceType"] = "URL"
        }
    }

    private static func mutateDrawingResource(
        in root: inout [String: Any],
        mutateNode: (inout [String: Any]) -> Void
    ) {
        if var workbook = root["workbook"] as? [String: Any] {
            mutateDrawingResourceData(in: &workbook, mutateNode: mutateNode)
            root["workbook"] = workbook
        } else if root["sheets"] != nil {
            mutateDrawingResourceData(in: &root, mutateNode: mutateNode)
        }
    }

    private static func mutateDrawingResourceData(
        in workbook: inout [String: Any],
        mutateNode: (inout [String: Any]) -> Void
    ) {
        guard var resources = workbook["resources"] as? [[String: Any]] else { return }
        var changed = false
        for index in resources.indices {
            guard (resources[index]["name"] as? String) == drawingResourceName,
                  let dataString = resources[index]["data"] as? String,
                  !dataString.isEmpty,
                  dataString != "{}",
                  var drawingRoot = try? JSONSerialization.jsonObject(with: Data(dataString.utf8)) as? [String: Any] else { continue }

            walkMutatingTree(&drawingRoot, mutateNode: mutateNode)
            guard JSONSerialization.isValidJSONObject(drawingRoot),
                  let data = try? JSONSerialization.data(withJSONObject: drawingRoot, options: []),
                  let serialized = String(data: data, encoding: .utf8) else { continue }
            resources[index]["data"] = serialized
            changed = true
        }
        if changed {
            workbook["resources"] = resources
        }
    }

    /// Cell `(row, col)` keys that embed an image in `p.drawings`.
    static func cellImageCoordinates(in sheet: [String: Any]) -> Set<String> {
        guard let cellData = sheet["cellData"] as? [String: Any] else { return [] }
        var keys = Set<String>()
        for (rowKey, rowVal) in cellData {
            guard let rowCells = rowVal as? [String: Any] else { continue }
            for (colKey, cellVal) in rowCells {
                guard let cell = cellVal as? [String: Any],
                      let p = cell["p"] as? [String: Any],
                      let drawingMap = p["drawings"] as? [String: Any],
                      drawingMap.values.contains(where: { hasImageSource($0) }) else { continue }
                keys.insert("\(rowKey):\(colKey)")
            }
        }
        return keys
    }

    static func imageReference(in sheet: [String: Any], row: Int, col: Int) -> ImageReference? {
        guard let cellData = sheet["cellData"] as? [String: Any],
              let rowCells = cellData[String(row)] as? [String: Any],
              let cell = rowCells[String(col)] as? [String: Any],
              let drawings = (cell["p"] as? [String: Any])?["drawings"] as? [String: Any] else { return nil }
        for value in drawings.values {
            if let node = value as? [String: Any], let ref = reference(fromImageNode: node) {
                return ref
            }
        }
        return nil
    }

    // MARK: - Private

    private static func parseJSONObject(_ json: String, mutable: Bool = false) -> Any? {
        guard let data = json.data(using: .utf8) else { return nil }
        let options: JSONSerialization.ReadingOptions = mutable
            ? [.mutableContainers, .mutableLeaves]
            : []
        return try? JSONSerialization.jsonObject(with: data, options: options)
    }

    private static func workbookObject(from root: Any) -> [String: Any]? {
        guard let dict = root as? [String: Any] else { return nil }
        if let wrapped = dict["workbook"] as? [String: Any] { return wrapped }
        if dict["sheets"] is [String: Any] { return dict }
        return nil
    }

    private static func mutateJSONObject(_ json: String, mutate: (inout [String: Any]) -> Void) -> String? {
        guard let data = json.data(using: .utf8),
              var root = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            return nil
        }
        mutate(&root)
        guard JSONSerialization.isValidJSONObject(root),
              let out = try? JSONSerialization.data(withJSONObject: root, options: []) else { return nil }
        return String(data: out, encoding: .utf8)
    }

    private static func walkReadOnly(_ value: Any, visit: ([String: Any]) -> Void) {
        if let array = value as? [Any] {
            array.forEach { walkReadOnly($0, visit: visit) }
            return
        }
        guard let dict = value as? [String: Any] else { return }
        visit(dict)
        for nested in dict.values {
            walkReadOnly(nested, visit: visit)
        }
    }

    private static func walkMutatingTree(_ dict: inout [String: Any], mutateNode: (inout [String: Any]) -> Void) {
        mutateNode(&dict)
        for key in dict.keys {
            if var nestedDict = dict[key] as? [String: Any] {
                walkMutatingTree(&nestedDict, mutateNode: mutateNode)
                dict[key] = nestedDict
            } else if var nestedArray = dict[key] as? [Any] {
                for index in nestedArray.indices {
                    if var item = nestedArray[index] as? [String: Any] {
                        walkMutatingTree(&item, mutateNode: mutateNode)
                        nestedArray[index] = item
                    }
                }
                dict[key] = nestedArray
            }
        }
    }

    private static func hasImageSource(_ value: Any) -> Bool {
        guard let node = value as? [String: Any] else { return false }
        return reference(fromImageNode: node) != nil
    }

    private static func reference(fromImageNode node: [String: Any]) -> ImageReference? {
        guard let source = node["source"] as? String else { return nil }
        let type = node["imageSourceType"] as? String
        switch type {
        case "URL":
            if let ref = entityReference(from: source) { return ref }
            if let schemeRef = TriliumImageScheme.reference(fromURLString: source) {
                return ImageReference(routeType: schemeRef.routeType, entityId: schemeRef.entityId)
            }
            return nil
        case "BASE64":
            return source.hasPrefix("data:") ? nil : nil
        default:
            return nil
        }
    }

    private static func entityReference(from source: String) -> ImageReference? {
        if let schemeRef = TriliumImageScheme.reference(fromURLString: source) {
            return ImageReference(routeType: schemeRef.routeType, entityId: schemeRef.entityId)
        }
        guard let parsed = TriliumAttachmentURLParser.entityReference(in: source) else { return nil }
        return ImageReference(routeType: parsed.routeType, entityId: parsed.entityId)
    }

    private static func canonicalAttachmentURL(routeType: String, entityId: String) -> String {
        switch routeType.lowercased() {
        case "images":
            return "api/images/\(entityId)/image/image.png"
        default:
            return "api/attachments/\(entityId)/image/image.png"
        }
    }

    private static func collectFloatPreviews(from value: Any, sheetId: String?, into previews: inout [FloatImagePreview]) {
        if let array = value as? [Any] {
            array.forEach { collectFloatPreviews(from: $0, sheetId: sheetId, into: &previews) }
            return
        }
        guard let dict = value as? [String: Any] else { return }

        var resolvedSheetId = sheetId
        if resolvedSheetId == nil, let subUnitId = dict["subUnitId"] as? String {
            resolvedSheetId = subUnitId
        }

        if let drawingId = dict["drawingId"] as? String,
           let sheet = resolvedSheetId,
           let ref = reference(fromImageNode: dict) {
            previews.append(FloatImagePreview(id: drawingId, sheetId: sheet, reference: ref))
            return
        }

        for nested in dict.values {
            collectFloatPreviews(from: nested, sheetId: resolvedSheetId, into: &previews)
        }
    }
}
