import Foundation
import os

enum Log {
    private static let subsystem = "com.trinote"

    static let api = Logger(subsystem: subsystem, category: "API")
    static let auth = Logger(subsystem: subsystem, category: "Auth")
    static let cache = Logger(subsystem: subsystem, category: "Cache")
    static let ui = Logger(subsystem: subsystem, category: "UI")
    static let sync = Logger(subsystem: subsystem, category: "Sync")
    static let persistence = Logger(subsystem: subsystem, category: "Persistence")
    static let search = Logger(subsystem: subsystem, category: "Search")
    /// Geo map note detection, WKWebView, and pin loading (filter in Console by subsystem GeoMap).
    static let geoMap = Logger(subsystem: subsystem, category: "GeoMap")
    /// Verbose note read/create diagnostics (`getNote`, blob policy, offline queue, flush). Filter: category NoteDiag.
    static let noteDiag = Logger(subsystem: subsystem, category: "NoteDiag")
}

// MARK: - Note diagnostics (Log.noteDiag)

/// Human-readable snapshots for `Log.noteDiag` (filter Console by subsystem `com.trinote`, category `NoteDiag`).
enum NoteDiagnostics {
    private static let maxAttrValueRun = 220
    private static let maxAttrLines = 100
    private static let maxIdList = 24

    private static func escNewlines(_ s: String) -> String {
        s.replacingOccurrences(of: "\r", with: "\\r")
            .replacingOccurrences(of: "\n", with: "\\n")
    }

    private static func trunc(_ s: String, _ max: Int) -> String {
        if s.count <= max { return s }
        return String(s.prefix(max)) + "…(+\(s.count - max) chars)"
    }

    private static func sortedAttrs(_ attrs: [AttributeResponse]) -> [AttributeResponse] {
        attrs.sorted {
            if $0.position != $1.position { return $0.position < $1.position }
            return $0.name < $1.name
        }
    }

    private static func sortedAttrs(_ attrs: [AttributeItem]) -> [AttributeItem] {
        attrs.sorted {
            if $0.position != $1.position { return $0.position < $1.position }
            return $0.name < $1.name
        }
    }

    private static func formatAttrLine(type: String, name: String, value: String, inheritable: Bool) -> String {
        let inh = inheritable ? " inheritable" : ""
        return "  \(type)/\(name)=\(trunc(escNewlines(value), maxAttrValueRun))\(inh)"
    }

    static func formatAttributeBlock(from attributes: [AttributeResponse]) -> String {
        let sorted = sortedAttrs(attributes)
        let slice = sorted.prefix(maxAttrLines)
        var lines = slice.map { formatAttrLine(type: $0.type, name: $0.name, value: $0.value, inheritable: $0.isInheritable) }
        if sorted.count > maxAttrLines {
            lines.append("  … and \(sorted.count - maxAttrLines) more attributes")
        }
        return lines.joined(separator: "\n")
    }

    static func formatAttributeBlock(from attributes: [AttributeItem]) -> String {
        let sorted = sortedAttrs(attributes)
        let slice = sorted.prefix(maxAttrLines)
        var lines = slice.map {
            formatAttrLine(type: $0.type.rawValue, name: $0.name, value: $0.value, inheritable: $0.isInheritable)
        }
        if sorted.count > maxAttrLines {
            lines.append("  … and \(sorted.count - maxAttrLines) more attributes")
        }
        return lines.joined(separator: "\n")
    }

    private static func idListSummary(_ ids: [String]) -> String {
        let head = ids.prefix(maxIdList).joined(separator: ", ")
        if ids.count <= maxIdList { return "[\(head)] count=\(ids.count)" }
        return "[\(head), …] count=\(ids.count)"
    }

    /// Snapshot from a live API `getNote` response.
    static func describeNoteResponse(_ r: NoteResponse, phase: String) -> String {
        let item = NoteItem(from: r)
        var parts: [String] = []
        parts.append("NoteDiag READ phase=\(phase)")
        parts.append("  noteId=\(r.noteId)")
        parts.append("  title=\(trunc(escNewlines(r.title), 120))")
        parts.append("  api.type=\(r.type) api.mime=\(r.mime) blobId=\(r.blobId ?? "nil") isDeleted=\(r.isDeleted) protected=\(r.isProtected)")
        parts.append("  utcDateModified=\(r.utcDateModified)")
        parts.append("  childNoteIds=\(idListSummary(r.childNoteIds))")
        parts.append("  parentNoteIds=\(idListSummary(r.parentNoteIds))")
        parts.append("  semantic: isSemanticGeoMap=\(item.isSemanticGeoMap) viewType=\(item.viewTypeLabelValue ?? "nil") template=\(item.templateRelationValue ?? "nil") calendarRoot=\(item.isCalendarRoot) uiDisplayType=\(item.uiNoteTypeDisplayName)")
        parts.append("  attributes.count=\(r.attributes.count)")
        if !r.attributes.isEmpty {
            parts.append(formatAttributeBlock(from: r.attributes))
        }
        return parts.joined(separator: "\n")
    }

    /// Snapshot from SwiftData-hydrated `NoteItem` (cache path).
    static func describeNoteItem(_ n: NoteItem, phase: String) -> String {
        var parts: [String] = []
        parts.append("NoteDiag READ phase=\(phase)")
        parts.append("  noteId=\(n.noteId)")
        parts.append("  title=\(trunc(escNewlines(n.title), 120))")
        parts.append("  type=\(n.type.rawValue) mime=\(n.mime) protected=\(n.isProtected)")
        parts.append("  childNoteIds=\(idListSummary(n.childNoteIds))")
        parts.append("  parentNoteIds=\(idListSummary(n.parentNoteIds))")
        parts.append("  semantic: isSemanticGeoMap=\(n.isSemanticGeoMap) viewType=\(n.viewTypeLabelValue ?? "nil") template=\(n.templateRelationValue ?? "nil") calendarRoot=\(n.isCalendarRoot) uiDisplayType=\(n.uiNoteTypeDisplayName)")
        parts.append("  attributes.count=\(n.attributes.count)")
        if !n.attributes.isEmpty {
            parts.append(formatAttributeBlock(from: n.attributes))
        }
        return parts.joined(separator: "\n")
    }

    static func describeOfflineCreateQueued(
        parentNoteId: String,
        localNoteId: String,
        localBranchId: String,
        title: String,
        noteType: String,
        mime: String,
        contentByteCount: Int,
        initialAttributesCount: Int,
        attrsJSON: String
    ) -> String {
        let json = trunc(escNewlines(attrsJSON), 2500)
        let isGeoish = noteType == NoteType.geoMap.rawValue
            || noteType == NoteType.book.rawValue
            || mime.contains("json")
        let tag = isGeoish ? " (geo-related type/mime)" : ""
        return """
        NoteDiag CREATE offline_queued\(tag)
          parentNoteId=\(parentNoteId) localNoteId=\(localNoteId) localBranchId=\(localBranchId)
          title=\(trunc(escNewlines(title), 120)) noteType=\(noteType) mime=\(mime)
          initialContent.bytes=\(contentByteCount) initialAttributes.count=\(initialAttributesCount)
          initialAttributesJSON=\(json)
        """
    }

    static func describeFlushPendingCreate(
        localNoteId: String,
        resolvedParent: String,
        title: String,
        noteType: String,
        mime: String,
        initialContentLen: Int,
        contentToSendLen: Int,
        templateTitleFromAttrs: String?,
        resolvedTemplateNoteId: String?,
        attrsJSONTruncated: String,
        willPostCreateAttributes: Bool
    ) -> String {
        """
        NoteDiag CREATE flush_request
          localNoteId=\(localNoteId) parent=\(resolvedParent)
          title=\(trunc(escNewlines(title), 120)) type=\(noteType) mime=\(mime)
          row.initialContent.len=\(initialContentLen) contentToSend.len=\(contentToSendLen)
          templateTitleFromAttrs=\(templateTitleFromAttrs ?? "nil") resolvedTemplateNoteId=\(resolvedTemplateNoteId ?? "nil")
          willPostCreateAttributes=\(willPostCreateAttributes)
          initialAttributesJSON=\(attrsJSONTruncated)
        """
    }
}
