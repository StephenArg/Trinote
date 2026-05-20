import CoreGraphics
import Foundation
import SwiftUI

/// Text/image anchor for aligning read-only HTML and the rich-text editor by the topmost visible line.
struct NoteDetailScrollAnchor: Equatable, Codable {
    enum Kind: String, Codable {
        case text
        case image
    }

    var kind: Kind
    /// Normalized snippet used to find the same place in the other surface (`text` or image `alt` / label).
    var snippet: String
    /// 0–1 scroll position on the source surface; used when snippet lookup fails.
    var fallbackScrollFraction: CGFloat

    init(kind: Kind = .text, snippet: String, fallbackScrollFraction: CGFloat) {
        self.kind = kind
        self.snippet = snippet
        self.fallbackScrollFraction = min(max(fallbackScrollFraction, 0), 1)
    }

    static func parse(_ result: Any?) -> NoteDetailScrollAnchor? {
        let obj: [String: Any]?
        if let d = result as? [String: Any] {
            obj = d
        } else if let s = result as? String, s.first == "{",
                  let data = s.data(using: .utf8),
                  let parsed = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
            obj = parsed
        } else {
            obj = nil
        }
        guard let obj else { return nil }
        let kindRaw = (obj["kind"] as? String) ?? "text"
        let kind = Kind(rawValue: kindRaw) ?? .text
        let snippet = (obj["snippet"] as? String) ?? ""
        let frac: CGFloat
        if let n = obj["fallbackScrollFraction"] as? NSNumber {
            frac = CGFloat(truncating: n)
        } else if let d = obj["fallbackScrollFraction"] as? Double {
            frac = CGFloat(d)
        } else if let n = obj["f"] as? NSNumber {
            frac = CGFloat(truncating: n)
        } else if let d = obj["f"] as? Double {
            frac = CGFloat(d)
        } else {
            frac = 0
        }
        guard !snippet.isEmpty || frac > 0.001 else { return nil }
        return NoteDetailScrollAnchor(kind: kind, snippet: snippet, fallbackScrollFraction: frac)
    }

    /// Result of scrolling read-only HTML so `snippet` is at the top; `documentTopY` is offset from `body` origin.
    static func parseReadOnlyScrollTarget(_ result: Any?) -> CGFloat? {
        let obj: [String: Any]?
        if let d = result as? [String: Any] {
            obj = d
        } else if let s = result as? String, s.first == "{",
                  let data = s.data(using: .utf8),
                  let parsed = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
            obj = parsed
        } else {
            obj = nil
        }
        guard let obj, (obj["found"] as? Bool) == true else { return nil }
        if let n = obj["documentTopY"] as? NSNumber { return CGFloat(truncating: n) }
        if let d = obj["documentTopY"] as? Double { return CGFloat(d) }
        return nil
    }
}

// MARK: - JavaScript bridges

/// Frame of `noteBody` in the read-only scroll content coordinate space.
struct NoteDetailNoteBodyFramePreferenceKey: PreferenceKey {
    static let defaultValue: CGRect = .zero
    static func reduce(value: inout CGRect, nextValue: () -> CGRect) {
        value = nextValue()
    }
}

enum NoteDetailScrollAnchorScript {
    /// Offset below the viewport top when capturing the top-visible block (~one body line).
    static let visibleTopCaptureBias: CGFloat = 32

    /// Injected into read-only `HTMLNoteView` wrapped HTML.
    static let readOnlyInjection: String = """
    <script>
    (function() {
      function norm(s) {
        return String(s || '').replace(/\\s+/g, ' ').trim();
      }
      function bodyOffsetTop(el) {
        var y = 0, n = el;
        while (n && n !== document.body) {
          y += n.offsetTop || 0;
          n = n.offsetParent;
        }
        return y;
      }
      function blockInfo(el) {
        if (!el) return null;
        if (el.tagName === 'IMG') {
          var alt = norm(el.getAttribute('alt') || el.getAttribute('title') || '');
          var src = el.getAttribute('src') || '';
          var tail = src.split('/').pop() || src;
          return { kind: 'image', snippet: alt || tail || 'image' };
        }
        if (el.tagName === 'FIGURE' && el.querySelector('img')) {
          var img = el.querySelector('img');
          return blockInfo(img);
        }
        var t = norm(el.innerText || el.textContent || '');
        if (t.length < 2) return null;
        return { kind: 'text', snippet: t.slice(0, 120) };
      }
      var blockSelector = 'p,h1,h2,h3,h4,h5,h6,li,blockquote,pre,figcaption,aside,figure,img,table';
      function blocksInDoc() {
        var list = Array.prototype.slice.call(document.body.querySelectorAll(blockSelector));
        list.sort(function(a, b) { return bodyOffsetTop(a) - bodyOffsetTop(b); });
        return list;
      }
      window.trinoteScrollAnchor = {
        getTopVisibleAtY: function(clipTopY) {
          var y = Math.max(0, Number(clipTopY) || 0);
          var blocks = blocksInDoc();
          for (var i = 0; i < blocks.length; i++) {
            var el = blocks[i];
            var top = bodyOffsetTop(el);
            if (top < y) continue;
            var info = blockInfo(el);
            if (!info) continue;
            return {
              kind: info.kind,
              snippet: info.snippet,
              documentTopY: top,
              fallbackScrollFraction: 0
            };
          }
          return { kind: 'text', snippet: '', documentTopY: y, fallbackScrollFraction: 0 };
        },
        scrollSnippetToTop: function(snippet, kind) {
          var want = norm(snippet);
          if (!want) return JSON.stringify({ found: false });
          var blocks = blocksInDoc();
          for (var i = 0; i < blocks.length; i++) {
            var el = blocks[i];
            var info = blockInfo(el);
            if (!info) continue;
            if (kind && info.kind !== kind) continue;
            var hay = norm(info.snippet);
            if (hay.indexOf(want) >= 0 || want.indexOf(hay.slice(0, Math.min(hay.length, want.length + 20))) >= 0) {
              return JSON.stringify({ found: true, documentTopY: bodyOffsetTop(el) });
            }
          }
          var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          var node;
          while ((node = walker.nextNode())) {
            var t = norm(node.textContent || '');
            if (t.length < 2) continue;
            if (t.indexOf(want) < 0 && want.indexOf(t.slice(0, 80)) < 0) continue;
            var p = node.parentElement;
            while (p && p !== document.body) {
              if (p.matches && p.matches(blockSelector)) {
                return JSON.stringify({ found: true, documentTopY: bodyOffsetTop(p) });
              }
              p = p.parentElement;
            }
          }
          return JSON.stringify({ found: false });
        }
      };
    })();
    </script>
    """

    static func readOnlyCaptureScript(clipTopY: CGFloat, fallbackFraction: CGFloat) -> String {
        let y = Double(clipTopY)
        let f = Double(min(max(fallbackFraction, 0), 1))
        return """
        (function(){
          try {
            var a = window.trinoteScrollAnchor.getTopVisibleAtY(\(y));
            a.fallbackScrollFraction = \(f);
            return JSON.stringify(a);
          } catch (e) { return null; }
        })();
        """
    }

    static func readOnlyScrollToScript(anchor: NoteDetailScrollAnchor) -> String {
        let snippet = javaScriptStringLiteral(anchor.snippet)
        let kind = anchor.kind.rawValue
        return "window.trinoteScrollAnchor.scrollSnippetToTop(\(snippet), '\(kind)');"
    }

    static let editorCaptureScript = """
    (function(){
      try {
        var a = window.editorBridge.getTopVisibleAnchor();
        var f = window.editorBridge.getScrollFraction();
        if (a) { a.fallbackScrollFraction = f; return JSON.stringify(a); }
        return JSON.stringify({ kind: 'text', snippet: '', fallbackScrollFraction: f });
      } catch (e) { return null; }
    })();
    """

    static func editorScrollToScript(anchor: NoteDetailScrollAnchor) -> String {
        guard let data = try? JSONEncoder().encode(anchor),
              let json = String(data: data, encoding: .utf8) else {
            return "window.editorBridge.scrollToFraction(\(anchor.fallbackScrollFraction));"
        }
        let escaped = javaScriptStringLiteral(json)
        return "window.editorBridge.scrollToAnchorJSON(\(escaped));"
    }

    private static func javaScriptStringLiteral(_ string: String) -> String {
        let escaped = string
            .replacingOccurrences(of: "\\", with: "\\\\")
            .replacingOccurrences(of: "'", with: "\\'")
            .replacingOccurrences(of: "\n", with: "\\n")
            .replacingOccurrences(of: "\r", with: "")
        return "'\(escaped)'"
    }
}
