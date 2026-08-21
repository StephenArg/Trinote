import Highlightr
import UIKit

/// Read-only code highlighting via Highlightr (highlight.js). Unsupported MIMEs stay plain monospaced.
@MainActor
enum CodeSyntaxHighlighter {
    private static let fontSize: CGFloat = 17
    private static let highlightr: Highlightr? = Highlightr()
    private static var cachedSupportedLanguages: Set<String>?
    private static var lastThemeName: String?

    private static var supportedLanguages: Set<String> {
        if let cachedSupportedLanguages { return cachedSupportedLanguages }
        let set = Set((highlightr?.supportedLanguages() ?? []).map { $0.lowercased() })
        cachedSupportedLanguages = set
        return set
    }

    private static var codeFont: UIFont {
        UIFont.monospacedSystemFont(ofSize: fontSize, weight: .regular)
    }

    /// Attributed code for the given MIME. Uses the system monospaced body font.
    static func attributedString(code: String, mime: String, darkMode: Bool) -> NSAttributedString {
        let font = codeFont
        let plain = NSAttributedString(
            string: code,
            attributes: [
                .font: font,
                .foregroundColor: UIColor.label
            ]
        )
        guard let language = highlightJSLanguage(for: mime),
              let highlightr,
              supportedLanguages.contains(language) else {
            return plain
        }

        let themeName = darkMode ? "xcode-dark" : "xcode"
        if lastThemeName != themeName {
            guard highlightr.setTheme(to: themeName) else { return plain }
            lastThemeName = themeName
        }
        highlightr.theme.setCodeFont(font)

        guard let highlighted = highlightr.highlight(code, as: language) else {
            return plain
        }
        return highlighted
    }

    /// highlight.js language id for a Trilium code MIME, or `nil` for plain text / unknown.
    static func highlightJSLanguage(for mime: String) -> String? {
        let key = Self.normalizedMime(mime)
        if key.isEmpty || key == "text/plain" { return nil }

        if let mapped = mimeToLanguage[key] {
            return mapped
        }

        // Best-effort: strip vendor prefixes and try the last path segment.
        var token = key
        for prefix in ["text/x-", "text/", "application/x-", "application/", "message/"] {
            if token.hasPrefix(prefix) {
                token = String(token.dropFirst(prefix.count))
                break
            }
        }
        token = token
            .replacingOccurrences(of: "+", with: "")
            .replacingOccurrences(of: "_", with: "-")
        if token.isEmpty || token == "plain" { return nil }

        // Common aliases when the raw token isn’t an hljs id.
        switch token {
        case "csrc", "c": return "c"
        case "c++src", "cpp": return "cpp"
        case "csharp": return "csharp"
        case "objc", "objectivec": return "objectivec"
        case "python": return "python"
        case "sh", "shell", "bash", "zsh": return "bash"
        case "rsrc", "r": return "r"
        case "rustsrc", "rust": return "rust"
        case "stsrc", "smalltalk": return "smalltalk"
        case "pgsql", "mysql", "mariadb", "mssql", "plsql", "sqlite", "sql": return "sql"
        case "yml", "yaml": return "yaml"
        case "md", "markdown", "gfm": return "markdown"
        case "ts", "typescript": return "typescript"
        case "js", "javascript": return "javascript"
        case "htm", "html": return "xml"
        default:
            return token
        }
    }

    private static func normalizedMime(_ mime: String) -> String {
        var key = mime.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        if let semi = key.firstIndex(of: ";") {
            key = String(key[..<semi])
        }
        return key.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    /// Explicit Trilium MIME → highlight.js language (coverage is best-effort, not full catalog).
    private static let mimeToLanguage: [String: String] = [
        "text/x-abap": "abap",
        "text/x-brainfuck": "brainfuck",
        "text/x-csrc": "c",
        "text/x-csharp": "csharp",
        "text/x-c++src": "cpp",
        "text/x-clojure": "clojure",
        "text/x-clojurescript": "clojure",
        "text/x-cmake": "cmake",
        "text/x-cobol": "cobol",
        "text/coffeescript": "coffeescript",
        "text/x-common-lisp": "lisp",
        "text/x-crystal": "crystal",
        "text/css": "css",
        "text/x-cython": "python",
        "text/x-d": "d",
        "application/dart": "dart",
        "text/x-diff": "diff",
        "text/x-django": "django",
        "text/x-dockerfile": "dockerfile",
        "text/x-elixir": "elixir",
        "text/x-elm": "elm",
        "application/x-erb": "erb",
        "text/x-erlang": "erlang",
        "text/x-fsharp": "fsharp",
        "text/x-fortran": "fortran",
        "text/x-gdscript": "gdscript",
        "text/x-feature": "gherkin",
        "text/x-gfm": "markdown",
        "text/x-go": "go",
        "text/x-groovy": "groovy",
        "text/x-haskell": "haskell",
        "text/x-literate-haskell": "haskell",
        "text/html": "xml",
        "message/http": "http",
        "text/x-java": "java",
        "text/javascript": "javascript",
        "application/javascript": "javascript",
        "text/jinja2": "python",
        "application/ld+json": "json",
        "application/json": "json",
        "text/jsx": "javascript",
        "text/x-julia": "julia",
        "text/x-kotlin": "kotlin",
        "text/x-latex": "latex",
        "text/x-less": "less",
        "text/x-lua": "lua",
        "text/x-mariadb": "sql",
        "text/x-markdown": "markdown",
        "text/markdown": "markdown",
        "text/x-mathematica": "mathematica",
        "text/x-modelica": "modelica",
        "text/x-mssql": "sql",
        "text/x-mysql": "sql",
        "text/x-nginx-conf": "nginx",
        "text/x-nim": "nim",
        "text/x-nix": "nix",
        "text/x-nsis": "nsis",
        "text/x-objectivec": "objectivec",
        "text/x-ocaml": "ocaml",
        "text/x-pascal": "delphi",
        "text/x-perl": "perl",
        "text/x-php": "php",
        "text/x-plsql": "sql",
        "text/x-pgsql": "pgsql",
        "application/x-powershell": "powershell",
        "text/x-properties": "properties",
        "text/x-protobuf": "protobuf",
        "text/x-puppet": "puppet",
        "text/x-python": "python",
        "text/x-rsrc": "r",
        "text/x-ruby": "ruby",
        "text/x-rustsrc": "rust",
        "text/x-scala": "scala",
        "text/x-scheme": "scheme",
        "text/x-scss": "scss",
        "text/x-sass": "scss",
        "text/x-sh": "bash",
        "text/x-sql": "sql",
        "text/x-sqlite": "sql",
        "text/x-swift": "swift",
        "text/x-tcl": "tcl",
        "text/x-toml": "ini",
        "text/typescript-jsx": "typescript",
        "application/typescript": "typescript",
        "text/x-vb": "vbnet",
        "text/vbscript": "vbscript",
        "text/x-verilog": "verilog",
        "text/x-vhdl": "vhdl",
        "text/x-vue": "xml",
        "text/xml": "xml",
        "application/xml-dtd": "xml",
        "application/xquery": "xquery",
        "text/x-yaml": "yaml",
    ]
}
