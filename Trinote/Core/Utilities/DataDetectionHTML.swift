import Foundation
import WebKit

/// The reading view's half of detected details (see `DetectedDataScanner`).
///
/// The page gathers its visible text into segments, breaking at block elements and `<br>` with a newline so an
/// address written over several lines is still one address. It sends them to the `detectData` reply handler, which
/// returns `[segment, start, length, kind, href]` for each match. The page then wraps each match in
/// `<a class="trinote-detected" href=…>`. A tap on one goes through the usual link path and ends in
/// `UIApplication.open` (phone, Maps, the browser). Text added later is scanned when it arrives: included notes,
/// expanded collection rows, embeds.
enum DataDetectionHTML {
    static let messageHandlerName = "detectData"

    /// The `<style>` and `<script>` placed after the note body, or "" when detection is off.
    static func readingViewSnippet(_ config: DataDetectionConfig?) -> String {
        guard let config else { return "" }
        return """
        <style>
        a.trinote-detected {
            text-decoration-line: underline;
            text-decoration-style: dotted;
            text-decoration-thickness: 1.5px;
            text-underline-offset: 2px;
            -webkit-touch-callout: default;
        }
        </style>
        <script>
        (function() {
            var handlers = window.webkit && window.webkit.messageHandlers;
            if (!handlers || !handlers.\(messageHandlerName)) return;
            var MAPS = '\(config.mapsApp.rawValue)';
            var SKIP = 'a, code, pre, kbd, samp, script, style, noscript, template, svg, math, textarea, input, select, button, '
                + 'mark.trinote-find-hit, .katex, .math-tex, .mermaid, .link-mention, .link-embed, '
                + '[contenteditable]:not([contenteditable="false"])';
            var BLOCK = /^(P|DIV|LI|UL|OL|DL|DT|DD|TD|TH|TR|TBODY|THEAD|TFOOT|TABLE|CAPTION|H[1-6]|BLOCKQUOTE|SECTION|ARTICLE|ASIDE|HEADER|FOOTER|NAV|MAIN|FIGURE|FIGCAPTION|DETAILS|SUMMARY|HR|BODY)$/;
            // A segment closes at the next block boundary after this many characters, and one message carries about
            // this much, so a long note goes over in parts.
            var MAX = 50000;

            function blockOf(node) {
                var el = node.parentElement;
                while (el && !BLOCK.test(el.tagName)) el = el.parentElement;
                return el;
            }

            function collect(root, out) {
                var cur = { text: '', nodes: [] };
                var lastBlock = null;
                function lineBreak() {
                    if (cur.text.length && cur.text.charAt(cur.text.length - 1) !== '\\n') cur.text += '\\n';
                }
                function flush() {
                    if (cur.nodes.length) out.push(cur);
                    cur = { text: '', nodes: [] };
                }
                var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
                    acceptNode: function(n) {
                        if (n.nodeType === 1) {
                            if (n.matches(SKIP)) { lineBreak(); return NodeFilter.FILTER_REJECT; }
                            if (n.tagName === 'BR') lineBreak();
                            return NodeFilter.FILTER_SKIP;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                });
                var node;
                while ((node = walker.nextNode())) {
                    var value = node.nodeValue;
                    if (!value) continue;
                    var block = blockOf(node);
                    if (block !== lastBlock) {
                        if (cur.text.length > MAX) flush(); else lineBreak();
                        lastBlock = block;
                    }
                    cur.nodes.push({ node: node, start: cur.text.length, value: value });
                    cur.text += value;
                }
                flush();
            }

            function wrap(node, start, end, href, kind) {
                var text = node.nodeValue;
                if (!/\\S/.test(text.substring(start, end))) return;
                if (end < text.length) node.splitText(end);
                var middle = start > 0 ? node.splitText(start) : node;
                var a = document.createElement('a');
                a.className = 'trinote-detected';
                a.setAttribute('href', href);
                a.setAttribute('data-detected', kind);
                middle.parentNode.insertBefore(a, middle);
                a.appendChild(middle);
            }

            function apply(segments, matches) {
                if (!Array.isArray(matches)) return;
                // Pieces per text node, wrapped last first so earlier offsets in the node stay right.
                var pieces = [];
                matches.forEach(function(m) {
                    var seg = segments[m[0]];
                    if (!seg) return;
                    var start = m[1], end = m[1] + m[2];
                    seg.nodes.forEach(function(entry) {
                        var nodeEnd = entry.start + entry.value.length;
                        if (nodeEnd <= start || entry.start >= end) return;
                        pieces.push({
                            entry: entry,
                            start: Math.max(start, entry.start) - entry.start,
                            end: Math.min(end, nodeEnd) - entry.start,
                            href: m[4],
                            kind: m[3]
                        });
                    });
                });
                var byNode = new Map();
                pieces.forEach(function(p) {
                    var list = byNode.get(p.entry.node);
                    if (!list) { list = []; byNode.set(p.entry.node, list); }
                    list.push(p);
                });
                byNode.forEach(function(list, node) {
                    var entry = list[0].entry;
                    // The page changed since the text was read: leave this node alone.
                    if (!node.isConnected || node.nodeValue !== entry.value || !node.parentElement
                        || node.parentElement.closest(SKIP)) return;
                    list.sort(function(a, b) { return b.start - a.start; });
                    list.forEach(function(p) { wrap(node, p.start, p.end, p.href, p.kind); });
                });
                // Our own wrapping isn't new content.
                observer.takeRecords();
            }

            function scan(roots) {
                var segments = [];
                roots.forEach(function(root) {
                    if (!root || !root.isConnected) return;
                    if (root !== document.body && root.closest(SKIP)) return;
                    collect(root, segments);
                });
                var batch = [], size = 0;
                function send() {
                    if (!batch.length) return;
                    var segs = batch;
                    batch = []; size = 0;
                    handlers.\(messageHandlerName).postMessage({
                        segments: segs.map(function(s) { return s.text; }),
                        mapsApp: MAPS
                    }).then(function(matches) { apply(segs, matches); }, function() {});
                }
                segments.forEach(function(seg) {
                    if (size && size + seg.text.length > MAX) send();
                    batch.push(seg);
                    size += seg.text.length;
                });
                send();
            }

            var pending = [];
            var timer = null;
            var observer = new MutationObserver(function(records) {
                records.forEach(function(r) {
                    r.addedNodes.forEach(function(n) {
                        if (n.nodeType === 1) {
                            if (n.matches('a.trinote-detected, mark.trinote-find-hit')) return;
                            pending.push(n);
                        } else if (n.nodeType === 3 && n.parentElement) {
                            pending.push(n.parentElement);
                        }
                    });
                });
                if (pending.length && !timer) {
                    timer = setTimeout(function() {
                        timer = null;
                        var roots = pending.filter(function(n) { return n.isConnected; });
                        pending = [];
                        // Drop duplicates and roots inside another root.
                        roots = roots.filter(function(n, i) {
                            if (roots.indexOf(n) !== i) return false;
                            return !roots.some(function(o) { return o !== n && o.contains(n); });
                        });
                        scan(roots);
                    }, 300);
                }
            });

            function start() {
                observer.observe(document.body, { childList: true, subtree: true });
                scan([document.body]);
            }
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
            else start();
        })();
        </script>
        """
    }
}

/// Answers the page's `detectData` messages: `{segments: [String], mapsApp: String}` in, an array of
/// `[segment, start, length, kind, href]` out (UTF-16 offsets, like JavaScript's). Bad input gets an empty array.
final class DetectedDataMessageHandler: NSObject, WKScriptMessageHandlerWithReply {
    @MainActor
    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) async -> (Any?, String?) {
        guard let body = message.body as? [String: Any], let segments = body["segments"] as? [String] else {
            return ([Any](), nil)
        }
        let mapsApp = (body["mapsApp"] as? String).flatMap(DetectedDataSettings.MapsApp.init(rawValue:)) ?? .apple
        let matches = await Task.detached(priority: .userInitiated) {
            DetectedDataScanner.scan(segments, mapsApp: mapsApp)
        }.value
        let reply: [[Any]] = matches.map {
            [$0.segment, $0.start, $0.length, $0.kind.rawValue, $0.url.absoluteString]
        }
        return (reply, nil)
    }
}
