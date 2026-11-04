import Foundation

/// The styles and script a collection view's document needs, ported from Trilium's `ListOrGridView.css` and
/// `dashboard/index.css`. Injected by the page wrapper only when the body carries the collection marker class,
/// so ordinary notes stay as they are.
enum CollectionNoteWebStyles {
    static func css(forHTML html: String) -> String {
        guard html.contains(CollectionNoteHTMLBuilder.markerClass) else { return "" }
        // A list's rows and a table's tree toggles switch between the two chevrons in the page; the icon
        // stylesheet only knows the glyphs the body starts with, so both are added here.
        if html.contains("\(CollectionNoteHTMLBuilder.markerClass)--list") {
            return ([css] + listChevronGlyphRules).joined(separator: "\n")
        }
        if html.contains("\(CollectionNoteHTMLBuilder.markerClass)--table") {
            return ([css, tableCSS] + listChevronGlyphRules).joined(separator: "\n")
        }
        return css
    }

    private static let listChevronGlyphRules: [String] = TriliumInlineIconStyles.glyphRules(
        forHTML: "<span class=\"tn-icon bx bx-chevron-right\"></span><span class=\"tn-icon bx bx-chevron-down\"></span>"
    ) ?? []

    static func script(forHTML html: String) -> String {
        guard html.contains(CollectionNoteHTMLBuilder.markerClass) else { return "" }
        let scripts = html.contains("\(CollectionNoteHTMLBuilder.markerClass)--table") ? [script, tableScript] : [script]
        return "<script>\n\(scripts.joined(separator: "\n"))\n</script>"
    }

    /// Trilium's table view (`table/index.css`, `columns.css`) as one scrolling table: a bordered box the table
    /// scrolls sideways in, tabular numbers, chips for sets, and the tree indent and toggle of nested rows.
    static let tableCSS = """
    .trinote-collection--table .table-scroll {
      overflow-x: auto; -webkit-overflow-scrolling: touch; border: 1px solid var(--border); border-radius: 10px;
      background: rgba(128,128,128,0.04);
    }
    .trinote-collection--table table.collection-table {
      border-collapse: collapse; width: max-content; min-width: 100%; font-size: .9rem; line-height: 1.35;
    }
    .trinote-collection--table th, .trinote-collection--table td {
      padding: 6px 10px; border-bottom: 1px solid var(--border); border-inline-end: 1px solid var(--border);
      text-align: start; vertical-align: middle; white-space: nowrap;
    }
    .trinote-collection--table th:last-child, .trinote-collection--table td:last-child { border-inline-end: 0; }
    .trinote-collection--table tbody tr:last-child td { border-bottom: 0; }
    .trinote-collection--table th { font-weight: 600; background: rgba(128,128,128,0.10); }
    .trinote-collection--table td { max-width: 420px; overflow: hidden; text-overflow: ellipsis; }
    .trinote-collection--table td.col-type-textarea { white-space: pre-wrap; }
    .trinote-collection--table .col-rownum { text-align: center; opacity: .6; font-variant-numeric: tabular-nums; }
    .trinote-collection--table .col-number { text-align: end; font-variant-numeric: tabular-nums; }
    .trinote-collection--table .col-date, .trinote-collection--table .col-type-date,
    .trinote-collection--table .col-type-datetime, .trinote-collection--table .col-type-time { font-variant-numeric: tabular-nums; }
    .trinote-collection--table tr.archived td { opacity: .5; }
    .trinote-collection--table tr.tree-hidden { display: none; }
    .trinote-collection--table .table-title { display: inline-flex; align-items: center; min-width: 0; max-width: 100%; vertical-align: middle; }
    .trinote-collection--table .table-title .tn-icon { margin-inline-end: 6px; font-size: 1.15em; flex-shrink: 0; }
    .trinote-collection--table .table-title a {
      display: block; min-width: 0; color: inherit; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .trinote-collection--table tr.use-note-color .table-title .tn-icon,
    .trinote-collection--table tr.use-note-color .table-title a { color: var(--custom-color); }
    .trinote-collection--table .tree-indent { display: inline-block; height: 1px; vertical-align: middle; }
    .trinote-collection--table .tree-toggle {
      display: inline-flex; align-items: center; justify-content: center; width: 1.5em; height: 1.5em; margin-inline-end: 2px;
      border: 0; background: transparent; padding: 0; color: inherit; font: inherit; vertical-align: middle;
      -webkit-tap-highlight-color: transparent;
    }
    .trinote-collection--table .tree-toggle .tn-icon { font-size: 1.4em; }
    .trinote-collection--table .tree-toggle-spacer { display: inline-block; width: 1.5em; margin-inline-end: 2px; vertical-align: middle; }
    .trinote-collection--table code { font-size: .9em; padding: 1px 4px; border-radius: 4px; background: var(--code-bg); }
    .trinote-collection--table .tn-chip {
      display: inline-flex; align-items: center; gap: 4px; margin: 1px 4px 1px 0; padding: 1px 8px; border-radius: 999px;
      background: rgba(128,128,128,0.16); font-size: .92em; white-space: nowrap; vertical-align: middle;
    }
    .trinote-collection--table .tn-chip .tn-icon { font-size: 1.1em; }
    .trinote-collection--table .tn-swatch {
      display: inline-block; width: .9em; height: .9em; border-radius: 3px; border: 1px solid var(--border);
      vertical-align: -1px; margin-inline-end: 4px;
    }
    .trinote-collection--table .label-flag-set, .trinote-collection--table .label-flag-unset { font-size: 1.3em; vertical-align: middle; }
    .trinote-collection--table .label-flag-unset { opacity: .45; }
    .trinote-collection--table .reference-link .tn-icon { margin-inline-end: 4px; }
    .trinote-collection--table .reference-link { color: inherit; }
    @media (max-width: 480px) {
      .trinote-collection--table th.col-title { width: 220px !important; min-width: 220px !important; }
    }
    """

    /// Folds a nested row's children when its toggle is tapped: a row hides while any ancestor on its `data-path`
    /// is collapsed, then the page's height is reported again.
    static let tableScript = """
    (function () {
      var root = document.querySelector('.trinote-collection--table');
      if (!root) return;
      root.addEventListener('click', function (event) {
        var toggle = event.target.closest('.tree-toggle');
        if (!toggle || !root.contains(toggle)) return;
        event.preventDefault();
        event.stopPropagation();
        var row = toggle.closest('tr');
        if (!row) return;
        var collapsed = row.classList.toggle('collapsed');
        var icon = toggle.querySelector('.tn-icon');
        if (icon) {
          icon.classList.toggle('bx-chevron-right', collapsed);
          icon.classList.toggle('bx-chevron-down', !collapsed);
        }
        var rows = root.querySelectorAll('tr.table-row');
        var closed = [];
        rows.forEach(function (r) {
          if (r.classList.contains('collapsed')) closed.push((r.getAttribute('data-path') || '') + '/');
        });
        rows.forEach(function (r) {
          var path = r.getAttribute('data-path') || '';
          var hidden = closed.some(function (prefix) { return path.indexOf(prefix) === 0; });
          r.classList.toggle('tree-hidden', hidden);
        });
        if (typeof reportHeight === 'function') reportHeight();
      }, true);
    })();
    """

    static let css = """
    .trinote-collection { font-size: 16px; line-height: 1.45; }
    .trinote-collection a { text-decoration: none; }
    .trinote-collection .note-book-header,
    .trinote-collection .nested-note-list-item > h5,
    .trinote-collection .dashboard-widget-header {
      display: flex; align-items: center; min-width: 0; margin: 0; font-size: 1em; font-weight: normal; line-height: 1.3;
    }
    .trinote-collection .note-book-header .tn-icon,
    .trinote-collection .nested-note-list-item > h5 > .tn-icon:not(.note-expander),
    .trinote-collection .dashboard-widget-header .tn-icon { font-size: 1.2em; margin-inline-end: 8px; flex-shrink: 0; }
    .trinote-collection .note-book-title {
      flex: 1 1 auto; min-width: 0; color: inherit; font-weight: 500;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .trinote-collection .use-note-color .note-book-header .tn-icon,
    .trinote-collection .use-note-color .note-book-header .note-book-title,
    .trinote-collection .nested-note-list-item.use-note-color > h5 > .tn-icon:not(.note-expander),
    .trinote-collection .nested-note-list-item.use-note-color > h5 > .note-book-title,
    .trinote-collection .dashboard-widget.use-note-color .dashboard-widget-header .tn-icon,
    .trinote-collection .dashboard-widget.use-note-color .dashboard-widget-header .note-book-title { color: var(--custom-color); }

    /* Content previews */
    .trinote-collection .note-book-content { font-size: .8rem; line-height: 1.4; overflow: hidden; }
    .trinote-collection .note-book-content .rendered-content { padding: .5rem 1rem 1rem 1rem; }
    .trinote-collection .note-book-content .rendered-content > :first-child { margin-top: 0; }
    .trinote-collection .note-book-content .rendered-content > :last-child { margin-bottom: 0; }
    .trinote-collection .note-book-content p { margin: 0 0 .5em; line-height: 1.3; }
    .trinote-collection .note-book-content h1, .trinote-collection .note-book-content h2, .trinote-collection .note-book-content h3,
    .trinote-collection .note-book-content h4, .trinote-collection .note-book-content h5, .trinote-collection .note-book-content h6 {
      font-size: 1rem; margin: .4em 0;
    }
    .trinote-collection .note-book-content img { max-width: 100%; max-height: 220px; object-fit: contain; }
    .trinote-collection .note-book-content.type-image .rendered-content,
    .trinote-collection .note-book-content.type-canvas .rendered-content,
    .trinote-collection .note-book-content.type-mermaid .rendered-content,
    .trinote-collection .note-book-content.type-mindMap .rendered-content,
    .trinote-collection .note-book-content.type-code .rendered-content { padding: 0; }
    .trinote-collection .note-book-content.type-image .rendered-content {
      display: flex; align-items: center; justify-content: center; text-align: center; padding: 10px;
    }
    .trinote-collection .note-book-content.type-image img { display: block; margin: 0 auto; }
    .trinote-collection .note-book-content.type-code pre {
      margin: 0; padding: 8px 12px; font-size: .95em; overflow-x: auto; white-space: pre; background: transparent;
    }
    .trinote-collection .note-book-content .trinote-include__inner { font-size: inherit; }
    .trinote-collection .note-book-content .mermaid { padding: 8px; }
    .trinote-collection .no-preview {
      display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
      padding: 18px 10px; opacity: .7;
    }
    .trinote-collection .no-preview .tn-icon { font-size: 2.4em; margin-bottom: 6px; }
    .trinote-collection .no-preview-caption { font-size: .85em; }
    .trinote-collection .text-with-ellipsis a {
      display: inline-block; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; vertical-align: bottom;
    }
    .trinote-collection .text-with-ellipsis .tn-icon { margin-inline-end: 4px; }

    /* Grid */
    .trinote-collection--grid .note-list-container { display: flex; flex-wrap: wrap; gap: 10px; }
    .trinote-collection .note-book-card {
      position: relative; display: flex; flex-direction: column; flex: 1 0 300px; max-height: 300px; overflow: hidden;
      border: 1px solid var(--border); border-radius: 10px; background: rgba(128,128,128,0.08);
      user-select: none; -webkit-user-select: none; -webkit-touch-callout: none;
      -webkit-tap-highlight-color: rgba(0, 122, 255, 0.12); transition: transform 120ms ease-out;
    }
    @media (max-width: 480px) { .trinote-collection .note-book-card { flex-basis: 150px; } }
    .trinote-collection .note-book-card:active { transform: scale(.98); }
    .trinote-collection .note-book-card.archived { opacity: .5; }
    .trinote-collection .note-book-card .note-book-header { padding: .5rem 1rem; border-bottom: 1px solid var(--border); flex-shrink: 0; }
    .trinote-collection .note-book-card .note-book-content { flex: 1; min-height: 0; }
    .trinote-collection .note-book-card .note-book-content.note-book-content-overflowing {
      -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 75px), transparent 100%);
      mask-image: linear-gradient(to bottom, black calc(100% - 75px), transparent 100%);
    }
    .trinote-collection .note-book-card-link { position: absolute; inset: 0; z-index: 2; }
    .trinote-collection .note-book-card img, .trinote-collection .note-book-card svg { pointer-events: none; }

    /* List */
    .trinote-collection--list > .nested-note-list {
      border: 1px solid var(--border); border-radius: 10px; background: rgba(128,128,128,0.08); overflow: hidden;
    }
    .trinote-collection .nested-note-list-item { padding: 6px 10px; }
    .trinote-collection .nested-note-list-item + .nested-note-list-item { border-top: 1px solid var(--border); }
    .trinote-collection .nested-note-list-item > h5 { padding: 4px 0; }
    .trinote-collection .note-expander {
      font-size: 1.5em; flex-shrink: 0; cursor: pointer; padding: 6px; margin: -6px 0 -6px -6px;
      -webkit-tap-highlight-color: rgba(0, 122, 255, 0.12);
    }
    .trinote-collection .note-expander-empty { visibility: hidden; }
    .trinote-collection .nested-note-list-item.loading > h5 > .note-expander { opacity: .35; }
    .trinote-collection .nested-note-list-item:not(.expanded) > .note-row-sub { display: none; }
    .trinote-collection .note-row-sub { padding-inline-start: 25px; }
    .trinote-collection .note-content-preview { margin: 6px 0 8px; }
    .trinote-collection .note-content-preview .note-book-content {
      outline: 1px solid var(--border); border-radius: 8px; background: var(--code-bg); font-size: .85rem;
      user-select: text; -webkit-user-select: text;
    }
    .trinote-collection .note-content-preview .note-book-content.type-text .rendered-content { padding: 8px 24px; }
    .trinote-collection .note-content-preview:has(.rendered-content:empty) { display: none; }
    .trinote-collection .nested-note-list-item.archived > h5 { opacity: .6; }
    .trinote-collection .note-row-sub > .nested-note-list { border: 0; border-radius: 0; background: transparent; }
    .trinote-collection .note-row-sub > .nested-note-list > .nested-note-list-item { padding-inline: 0; }

    /* Dashboard */
    .trinote-collection--dashboard .dashboard-grid {
      display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); grid-auto-rows: 80px; grid-auto-flow: row dense; gap: 8px;
    }
    .trinote-collection .dashboard-widget {
      display: flex; flex-direction: column; min-width: 0; min-height: 0; overflow: hidden;
      border: 1px solid var(--border); border-radius: 8px; background: rgba(128,128,128,0.08);
    }
    .trinote-collection .dashboard-widget.archived { opacity: .6; }
    .trinote-collection .dashboard-widget-header {
      padding: .45rem .5rem .45rem .85rem; border-bottom: 1px solid var(--border); flex-shrink: 0;
    }
    .trinote-collection .dashboard-widget-content {
      flex: 1; min-height: 0; overflow: auto; -webkit-overflow-scrolling: touch; font-size: .8rem;
    }
    .trinote-collection .dashboard-widget-content .note-book-content { overflow: visible; font-size: inherit; }
    .trinote-collection .dashboard-widget-content .rendered-content { padding: 8px 16px; }
    @media (max-width: 767px) {
      .trinote-collection--dashboard .dashboard-grid { display: flex; flex-direction: column; }
      .trinote-collection .dashboard-widget { height: calc(var(--h, 3) * 80px + (var(--h, 3) - 1) * 8px); }
    }
    """

    /// Fades overflowing grid cards like Trilium's `onContentResized`, expands and collapses list rows in place and
    /// asks the app for a row's content the first time it is opened (`collectionRow` message; the app answers
    /// through `window.trinoteCollection.hydrate`).
    static let script = #"""
    (function() {
      var root = document.querySelector('.trinote-collection');
      if (!root) return;
      var overflowObserver = new ResizeObserver(function(entries) {
        entries.forEach(function(entry) {
          var el = entry.target;
          el.classList.toggle('note-book-content-overflowing', el.scrollHeight > el.clientHeight + 1);
        });
      });
      function observeContents(scope) {
        (scope || root).querySelectorAll('.note-book-card > .note-book-content').forEach(function(el) {
          overflowObserver.observe(el);
        });
      }
      observeContents(root);
      function post(payload) {
        try { window.webkit.messageHandlers.collectionRow.postMessage(payload); } catch (e) {}
      }
      function reportSize() {
        if (typeof reportHeight === 'function') reportHeight();
      }
      function setExpanded(row, expanded) {
        row.classList.toggle('expanded', expanded);
        var expander = row.querySelector(':scope > h5 > .note-expander');
        if (expander) {
          expander.classList.toggle('bx-chevron-down', expanded);
          expander.classList.toggle('bx-chevron-right', !expanded);
        }
      }
      function findRow(noteId) {
        var rows = root.querySelectorAll('.nested-note-list-item');
        for (var i = 0; i < rows.length; i++) {
          if (rows[i].getAttribute('data-note-id') === noteId) return rows[i];
        }
        return null;
      }
      root.addEventListener('click', function(e) {
        var expander = e.target.closest('.note-expander');
        if (!expander || !root.contains(expander) || expander.classList.contains('note-expander-empty')) return;
        e.preventDefault();
        e.stopPropagation();
        var row = expander.closest('.nested-note-list-item');
        if (!row) return;
        var noteId = row.getAttribute('data-note-id') || '';
        if (row.classList.contains('hydrated')) {
          var expanded = !row.classList.contains('expanded');
          setExpanded(row, expanded);
          reportSize();
          post({ noteId: noteId, action: 'toggle', expanded: expanded });
        } else if (!row.classList.contains('loading')) {
          row.classList.add('loading');
          post({ noteId: noteId, action: 'expand' });
        }
      }, true);
      window.trinoteCollection = {
        hydrate: function(noteId, html) {
          var row = findRow(noteId);
          if (!row) return;
          var previous = row.querySelector(':scope > .note-row-sub');
          if (previous) previous.remove();
          var sub = document.createElement('div');
          sub.className = 'note-row-sub';
          sub.innerHTML = html;
          row.appendChild(sub);
          row.classList.remove('loading');
          row.classList.add('hydrated');
          setExpanded(row, true);
          observeContents(sub);
          reportSize();
        },
        hydrateFailed: function(noteId) {
          var row = findRow(noteId);
          if (row) row.classList.remove('loading');
        }
      };
    })();
    """#
}
