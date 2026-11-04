import Foundation

/// Builds the document a collection's Grid, List or Dashboard view shows in the read-only web view, with the
/// classes Trilium's own views use (`legacy/ListOrGridView.tsx`, `dashboard/index.tsx`) so the ported styles apply.
///
/// Links are `#/<noteId>`: the page's click router only takes hashes that start with `#/` or `#root`.
enum CollectionNoteHTMLBuilder {
    typealias Child = CollectionNoteModels.Child
    typealias PageItem = CollectionNoteModels.PageItem
    typealias ListRow = CollectionNoteModels.ListRow
    typealias PreviewBody = CollectionNoteModels.PreviewBody

    /// On the root element; the page wrapper injects the collection styles and script when the body has it.
    static let markerClass = "trinote-collection"

    // MARK: Grid

    static func grid(items: [PageItem]) -> String {
        var html = "<div class=\"\(markerClass) \(markerClass)--grid\"><div class=\"note-list-container\">"
        for item in items {
            html += gridCard(item)
        }
        html += "</div></div>"
        return html
    }

    private static func gridCard(_ item: PageItem) -> String {
        let child = item.child
        let kind = previewKind(item.body)
        var classes = ["note-book-card", "type-\(kind)"]
        if child.isArchived { classes.append("archived") }
        let style = colorStyle(child)
        if style != nil { classes.append("use-note-color") }
        let title = escape(child.title)
        return """
        <div class="\(classes.joined(separator: " "))" data-note-id="\(escape(child.noteId))"\(styleAttribute(style))>\
        <h5 class="note-book-header">\(icon(child.iconClass))<span class="note-book-title">\(title)</span></h5>\
        \(content(item.body, child: child))\
        <a class="note-book-card-link" href="#/\(escape(child.noteId))" aria-label="\(title)"></a>\
        </div>
        """
    }

    // MARK: List

    static func list(rows: [ListRow]) -> String {
        var html = "<div class=\"\(markerClass) \(markerClass)--list\"><div class=\"nested-note-list\">"
        for row in rows {
            html += listRow(row)
        }
        html += "</div></div>"
        return html
    }

    private static func listRow(_ row: ListRow) -> String {
        let child = row.child
        let showsSub = row.isHydrated && row.isExpanded
        var classes = ["nested-note-list-item"]
        if showsSub { classes.append("expanded") }
        if row.isHydrated { classes.append("hydrated") }
        if child.isArchived { classes.append("archived") }
        let style = colorStyle(child)
        if style != nil { classes.append("use-note-color") }
        let chevron = showsSub ? "bx-chevron-down" : "bx-chevron-right"
        var html = """
        <div class="\(classes.joined(separator: " "))" data-note-id="\(escape(child.noteId))" data-level="\(row.level)"\(styleAttribute(style))>\
        <h5><span class="note-expander tn-icon bx \(chevron)"></span>\(icon(child.iconClass))\
        <a class="note-book-title" href="#/\(escape(child.noteId))">\(escape(child.title))</a></h5>
        """
        if row.isHydrated {
            html += "<div class=\"note-row-sub\">\(listRowInner(row))</div>"
        }
        html += "</div>"
        return html
    }

    /// A row's content preview and nested rows: what hydrating a row inserts under its title.
    static func listRowInner(_ row: ListRow) -> String {
        var html = ""
        if let body = row.body {
            html += "<div class=\"note-content-preview\">\(content(body, child: row.child))</div>"
        }
        if !row.children.isEmpty {
            html += "<div class=\"nested-note-list\">"
            for nested in row.children {
                html += listRow(nested)
            }
            html += "</div>"
        }
        return html
    }

    // MARK: Dashboard

    static func dashboard(items: [PageItem], layout: CollectionNoteModels.DashboardLayout?) -> String {
        var html = "<div class=\"\(markerClass) \(markerClass)--dashboard\"><div class=\"dashboard-grid\">"
        for item in CollectionNoteModels.stackedOrder(items, layout: layout) {
            html += dashboardWidget(item, geometry: layout?.widgets[item.child.noteId])
        }
        html += "</div></div>"
        return html
    }

    private static func dashboardWidget(_ item: PageItem, geometry: CollectionNoteModels.DashboardGeometry?) -> String {
        let child = item.child
        var classes = ["dashboard-widget", "type-\(previewKind(item.body))"]
        if child.isArchived { classes.append("archived") }
        var style = CollectionNoteModels.dashboardPlacement(geometry)
        if let color = colorStyle(child) {
            classes.append("use-note-color")
            style += " \(color)"
        }
        return """
        <div class="\(classes.joined(separator: " "))" data-note-id="\(escape(child.noteId))" style="\(escape(style))">\
        <div class="dashboard-widget-header">\(icon(child.iconClass))\
        <a class="note-book-title" href="#/\(escape(child.noteId))">\(escape(child.title))</a></div>\
        <div class="dashboard-widget-content">\(content(item.body, child: child))</div>\
        </div>
        """
    }

    // MARK: Shared pieces

    static func previewKind(_ body: PreviewBody) -> String {
        switch body {
        case .html(let kind, _): return kind
        case .protected: return "protectedSession"
        case .notDownloaded, .tooLarge, .none: return "none"
        }
    }

    private static func content(_ body: PreviewBody, child: Child) -> String {
        let inner: String
        switch body {
        case .html(_, let html):
            inner = html
        case .protected:
            inner = noPreview(iconClass: "bx bx-lock-alt", caption: String(localized: "Protected — open to view.", comment: "Include note protected locked"))
        case .notDownloaded:
            inner = noPreview(iconClass: "bx bx-cloud-download", caption: String(localized: "Not downloaded", comment: "Collection card: the note's content is not in the offline cache"))
        case .tooLarge:
            inner = noPreview(iconClass: child.iconClass, caption: String(localized: "Too large to preview", comment: "Collection card: the note's content was not downloaded for a preview"))
        case .none:
            inner = noPreview(iconClass: child.iconClass, caption: nil)
        }
        return "<div class=\"note-book-content type-\(previewKind(body))\"><div class=\"rendered-content\">\(inner)</div></div>"
    }

    private static func noPreview(iconClass: String, caption: String?) -> String {
        var html = "<div class=\"no-preview\">\(icon(iconClass))"
        if let caption {
            html += "<div class=\"no-preview-caption\">\(escape(caption))</div>"
        }
        return html + "</div>"
    }

    private static func icon(_ iconClass: String) -> String {
        "<span class=\"tn-icon \(escape(iconClass))\"></span>"
    }

    private static func colorStyle(_ child: Child) -> String? {
        guard let color = child.colorLabel?.trimmingCharacters(in: .whitespacesAndNewlines), !color.isEmpty,
              color.unicodeScalars.allSatisfy({ CharacterSet.cssColorValue.contains($0) })
        else { return nil }
        return "--custom-color: \(color);"
    }

    private static func styleAttribute(_ style: String?) -> String {
        guard let style else { return "" }
        return " style=\"\(escape(style))\""
    }

    static func escape(_ text: String) -> String {
        text.replacingOccurrences(of: "&", with: "&amp;")
            .replacingOccurrences(of: "<", with: "&lt;")
            .replacingOccurrences(of: ">", with: "&gt;")
            .replacingOccurrences(of: "\"", with: "&quot;")
    }
}

private extension CharacterSet {
    /// What a `#color` value may hold to be used as a CSS color: names, hex, `rgb(…)` / `hsl(…)`.
    static let cssColorValue = CharacterSet.alphanumerics.union(CharacterSet(charactersIn: "#(),.% -"))
}

// MARK: - Table

extension CollectionNoteHTMLBuilder {
    typealias TableColumn = CollectionNoteModels.TableColumn
    typealias TableRow = CollectionNoteModels.TableRow

    /// Trilium's table view as one `<table>`: a header row, then a row per note with nested rows under their
    /// parents (indented, with a toggle the page folds them by). Hidden columns are left out.
    static func table(columns: [TableColumn], rows: [TableRow], locale: Locale = .current, timeZone: TimeZone = .current) -> String {
        let visible = columns.filter(\.isVisible)
        let hasTree = rows.contains { !$0.children.isEmpty }
        var html = "<div class=\"\(markerClass) \(markerClass)--table\"><div class=\"table-scroll\"><table class=\"collection-table\"><thead><tr>"
        for column in visible {
            html += "<th class=\"\(columnClass(column))\"\(widthStyle(column))>\(escape(column.title))</th>"
        }
        html += "</tr></thead><tbody>"
        var number = 0
        func append(_ row: TableRow, path: String) {
            number += 1
            var classes = ["table-row"]
            if row.child.isArchived { classes.append("archived") }
            if !row.children.isEmpty { classes.append("has-children") }
            let color = colorStyle(row.child)
            if color != nil { classes.append("use-note-color") }
            html += "<tr class=\"\(classes.joined(separator: " "))\" data-note-id=\"\(escape(row.child.noteId))\""
                + " data-level=\"\(row.level)\" data-path=\"\(escape(path))\"\(styleAttribute(color))>"
            for column in visible {
                html += tableCell(column, row: row, number: number, hasTree: hasTree, locale: locale, timeZone: timeZone)
            }
            html += "</tr>"
            for child in row.children {
                append(child, path: path + "/" + child.child.noteId)
            }
        }
        for row in rows {
            append(row, path: row.child.noteId)
        }
        html += "</tbody></table></div></div>"
        return html
    }

    private static func columnClass(_ column: TableColumn) -> String {
        switch column.field {
        case .rowNumber: return "col-rownum"
        case .noteId: return "col-noteid"
        case .title: return "col-title"
        case .dateCreated, .dateModified: return "col-date"
        case .label:
            let type = column.labelType ?? .text
            return "col-label col-type-\(type.rawValue)\(type == .number && !column.isMulti ? " col-number" : "")"
        case .relation: return "col-relation"
        }
    }

    private static func widthStyle(_ column: TableColumn) -> String {
        guard let width = column.width, width > 0 else { return "" }
        return " style=\"width: \(width)px; min-width: \(width)px;\""
    }

    private static func tableCell(_ column: TableColumn, row: TableRow, number: Int, hasTree: Bool, locale: Locale, timeZone: TimeZone) -> String {
        let cls = columnClass(column)
        let inner: String
        switch column.field {
        case .rowNumber:
            inner = String(number)
        case .noteId:
            inner = "<code>\(escape(row.child.noteId))</code>"
        case .title:
            var parts = ""
            if row.level > 0 {
                parts += "<span class=\"tree-indent\" style=\"width: \(row.level * 20)px;\"></span>"
            }
            if !row.children.isEmpty {
                parts += "<button class=\"tree-toggle\" type=\"button\"><span class=\"tn-icon bx bx-chevron-down\"></span></button>"
            } else if hasTree {
                parts += "<span class=\"tree-toggle-spacer\"></span>"
            }
            parts += "<span class=\"table-title\">\(icon(row.child.iconClass))"
                + "<a class=\"reference-link\" href=\"#/\(escape(row.child.noteId))\">\(escape(row.child.title))</a></span>"
            inner = parts
        case .dateCreated:
            inner = escape(row.dateCreated.map { formattedLabelDate($0, withTime: true, locale: locale, timeZone: timeZone) } ?? "")
        case .dateModified:
            inner = escape(row.dateModified.map { formattedLabelDate($0, withTime: true, locale: locale, timeZone: timeZone) } ?? "")
        case .label(let name):
            let type = column.labelType ?? .text
            let values = row.labels[name] ?? []
            if column.isMulti {
                inner = values.map { "<span class=\"tn-chip\">\(labelValue($0, type: type, locale: locale, timeZone: timeZone))</span>" }.joined()
            } else {
                inner = values.first.map { labelValue($0, type: type, locale: locale, timeZone: timeZone) } ?? ""
            }
        case .relation(let name):
            let targets = row.relations[name] ?? []
            if column.isMulti {
                inner = targets.map { "<span class=\"tn-chip\">\(targetLink($0))</span>" }.joined()
            } else {
                inner = targets.first.map(targetLink) ?? ""
            }
        }
        return "<td class=\"\(cls)\">\(inner)</td>"
    }

    private static func targetLink(_ target: CollectionNoteModels.TableTarget) -> String {
        let style = target.colorLabel.flatMap(safeColor).map { " style=\"color: \($0);\"" } ?? ""
        return "<a class=\"reference-link\" href=\"#/\(escape(target.noteId))\"\(style)>\(icon(target.iconClass))\(escape(target.title))</a>"
    }

    /// One label value as its type shows it: a flag as a check or cross, dates through the locale, links for
    /// addresses, a swatch for a colour, text otherwise (Trilium's `label_value_display`).
    static func labelValue(_ value: String, type: TriliumLabelType, locale: Locale = .current, timeZone: TimeZone = .current) -> String {
        switch type {
        case .boolean:
            return value == "true"
                ? "<span class=\"tn-icon bx bx-check label-flag-set\" title=\"true\"></span>"
                : "<span class=\"tn-icon bx bx-x label-flag-unset\" title=\"\(escape(value))\"></span>"
        case .date:
            return escape(formattedLabelDate(value, withTime: false, locale: locale, timeZone: timeZone))
        case .datetime:
            return escape(formattedLabelDate(value, withTime: true, locale: locale, timeZone: timeZone))
        case .url:
            guard let href = safeURLHref(value) else { return escape(value) }
            return "<a href=\"\(escape(href))\">\(escape(value))</a>"
        case .email:
            return "<a href=\"\(escape(applyingScheme("mailto:", to: value)))\">\(escape(value))</a>"
        case .phone:
            return "<a href=\"\(escape(applyingScheme("tel:", to: value)))\">\(escape(value))</a>"
        case .color:
            guard let color = safeColor(value) else { return escape(value) }
            // `background-color`, which takes nothing but a colour: a value shaped like `url(…)` must never fetch anything.
            return "<span class=\"tn-color-chip\"><span class=\"tn-swatch\" style=\"background-color: \(color);\"></span>\(escape(value))</span>"
        case .text, .textarea, .number, .select, .time:
            return escape(value)
        }
    }

    /// A stored date (`YYYY-MM-DD`), date-time (`YYYY-MM-DDTHH:mm`) or Trilium timestamp as the locale shows it,
    /// all-numeric; a value that isn't a date stays as it is (Trilium's `formatLabelDate`).
    static func formattedLabelDate(_ value: String, withTime: Bool, locale: Locale = .current, timeZone: TimeZone = .current) -> String {
        let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty, let date = parseLabelDate(trimmed, timeZone: timeZone) else { return trimmed }
        let formatter = DateFormatter()
        formatter.locale = locale
        formatter.timeZone = timeZone
        formatter.dateStyle = .short
        formatter.timeStyle = withTime ? .short : .none
        return formatter.string(from: date)
    }

    private static func parseLabelDate(_ value: String, timeZone: TimeZone) -> Date? {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = timeZone
        for format in [
            "yyyy-MM-dd", "yyyy-MM-dd'T'HH:mm", "yyyy-MM-dd'T'HH:mm:ss",
            "yyyy-MM-dd HH:mm:ss.SSSZZZZZ", "yyyy-MM-dd HH:mm:ss.SSSZ", "yyyy-MM-dd HH:mm:ssZZZZZ",
            "yyyy-MM-dd'T'HH:mm:ss.SSSZZZZZ", "yyyy-MM-dd'T'HH:mm:ss.SSSZ", "yyyy-MM-dd'T'HH:mm:ssZZZZZ",
        ] {
            formatter.dateFormat = format
            if let date = formatter.date(from: value) { return date }
        }
        return nil
    }

    private static func safeURLHref(_ value: String) -> String? {
        let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
        guard let url = URL(string: trimmed), let scheme = url.scheme?.lowercased(), scheme == "http" || scheme == "https" else { return nil }
        return trimmed
    }

    private static func applyingScheme(_ scheme: String, to value: String) -> String {
        let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.lowercased().hasPrefix(scheme) ? trimmed : scheme + trimmed
    }

    /// A value usable as a CSS colour: names, hex, `rgb(…)` / `hsl(…)`; never a function that could fetch (`url(`).
    private static func safeColor(_ value: String) -> String? {
        let color = value.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !color.isEmpty, color.unicodeScalars.allSatisfy({ CharacterSet.cssColorValue.contains($0) }),
              color.range(of: "url(", options: .caseInsensitive) == nil
        else { return nil }
        return color
    }
}
