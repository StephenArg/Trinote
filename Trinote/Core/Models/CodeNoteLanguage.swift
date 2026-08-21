import Foundation

/// Code-note MIME options aligned with Trilium’s full catalog
/// (`packages/commons/src/lib/mime_type.ts` `MIME_TYPES_DICT`).
struct CodeNoteLanguage: Identifiable, Hashable, Sendable {
    let title: String
    let mime: String

    var id: String { mime }

    /// Full Trilium code-note / code-block language dropdown (Plain text first, then A–Z).
    static let defaults: [CodeNoteLanguage] = [
        .init(title: "Plain text", mime: "text/plain"),
        .init(title: "ABAP (SAP)", mime: "text/x-abap"),
        .init(title: "APL", mime: "text/apl"),
        .init(title: "ASN.1", mime: "text/x-ttcn-asn"),
        .init(title: "ASP.NET", mime: "application/x-aspx"),
        .init(title: "Asterisk", mime: "text/x-asterisk"),
        .init(title: "Batch file (DOS)", mime: "application/x-bat"),
        .init(title: "Brainfuck", mime: "text/x-brainfuck"),
        .init(title: "C", mime: "text/x-csrc"),
        .init(title: "C#", mime: "text/x-csharp"),
        .init(title: "C++", mime: "text/x-c++src"),
        .init(title: "Clojure", mime: "text/x-clojure"),
        .init(title: "ClojureScript", mime: "text/x-clojurescript"),
        .init(title: "Closure Stylesheets (GSS)", mime: "text/x-gss"),
        .init(title: "CMake", mime: "text/x-cmake"),
        .init(title: "Cobol", mime: "text/x-cobol"),
        .init(title: "CoffeeScript", mime: "text/coffeescript"),
        .init(title: "Common Lisp", mime: "text/x-common-lisp"),
        .init(title: "CQL", mime: "text/x-cassandra"),
        .init(title: "Crystal", mime: "text/x-crystal"),
        .init(title: "CSS", mime: "text/css"),
        .init(title: "Cypher", mime: "application/x-cypher-query"),
        .init(title: "Cython", mime: "text/x-cython"),
        .init(title: "D", mime: "text/x-d"),
        .init(title: "Dart", mime: "application/dart"),
        .init(title: "diff", mime: "text/x-diff"),
        .init(title: "Django", mime: "text/x-django"),
        .init(title: "Dockerfile", mime: "text/x-dockerfile"),
        .init(title: "DTD", mime: "application/xml-dtd"),
        .init(title: "Dylan", mime: "text/x-dylan"),
        .init(title: "EBNF", mime: "text/x-ebnf"),
        .init(title: "ECL", mime: "text/x-ecl"),
        .init(title: "edn", mime: "application/edn"),
        .init(title: "Eiffel", mime: "text/x-eiffel"),
        .init(title: "Elixir", mime: "text/x-elixir"),
        .init(title: "Elm", mime: "text/x-elm"),
        .init(title: "Embedded Javascript", mime: "application/x-ejs"),
        .init(title: "Embedded Ruby", mime: "application/x-erb"),
        .init(title: "Erlang", mime: "text/x-erlang"),
        .init(title: "Esper", mime: "text/x-esper"),
        .init(title: "F#", mime: "text/x-fsharp"),
        .init(title: "Factor", mime: "text/x-factor"),
        .init(title: "FCL", mime: "text/x-fcl"),
        .init(title: "Forth", mime: "text/x-forth"),
        .init(title: "Fortran", mime: "text/x-fortran"),
        .init(title: "Gas", mime: "text/x-gas"),
        .init(title: "GDScript (Godot)", mime: "text/x-gdscript"),
        .init(title: "Gherkin", mime: "text/x-feature"),
        .init(title: "GitHub Flavored Markdown", mime: "text/x-gfm"),
        .init(title: "Go", mime: "text/x-go"),
        .init(title: "Groovy", mime: "text/x-groovy"),
        .init(title: "HAML", mime: "text/x-haml"),
        .init(title: "Haskell (Literate)", mime: "text/x-literate-haskell"),
        .init(title: "Haskell", mime: "text/x-haskell"),
        .init(title: "Haxe", mime: "text/x-haxe"),
        .init(title: "HTML", mime: "text/html"),
        .init(title: "HTTP", mime: "message/http"),
        .init(title: "HXML", mime: "text/x-hxml"),
        .init(title: "IDL", mime: "text/x-idl"),
        .init(title: "Java Server Pages", mime: "application/x-jsp"),
        .init(title: "Java", mime: "text/x-java"),
        .init(title: "JavaScript", mime: "text/javascript"),
        .init(title: "JavaScript (Trilium backend)", mime: "application/javascript;env=backend"),
        .init(title: "JavaScript (Trilium frontend)", mime: "application/javascript;env=frontend"),
        .init(title: "Jinja2", mime: "text/jinja2"),
        .init(title: "JSON-LD", mime: "application/ld+json"),
        .init(title: "JSON", mime: "application/json"),
        .init(title: "JSX", mime: "text/jsx"),
        .init(title: "Julia", mime: "text/x-julia"),
        .init(title: "Kotlin", mime: "text/x-kotlin"),
        .init(title: "KDL", mime: "application/vnd.kdl"),
        .init(title: "LaTeX", mime: "text/x-latex"),
        .init(title: "LESS", mime: "text/x-less"),
        .init(title: "LiveScript", mime: "text/x-livescript"),
        .init(title: "Lua", mime: "text/x-lua"),
        .init(title: "MariaDB SQL", mime: "text/x-mariadb"),
        .init(title: "Markdown", mime: "text/x-markdown"),
        .init(title: "Mathematica", mime: "text/x-mathematica"),
        .init(title: "mbox", mime: "application/mbox"),
        .init(title: "MIPS Assembler", mime: "text/x-asm-mips"),
        .init(title: "mIRC", mime: "text/mirc"),
        .init(title: "Modelica", mime: "text/x-modelica"),
        .init(title: "MS SQL", mime: "text/x-mssql"),
        .init(title: "mscgen", mime: "text/x-mscgen"),
        .init(title: "msgenny", mime: "text/x-msgenny"),
        .init(title: "MUMPS", mime: "text/x-mumps"),
        .init(title: "MySQL", mime: "text/x-mysql"),
        .init(title: "Nginx", mime: "text/x-nginx-conf"),
        .init(title: "Nim", mime: "text/x-nim"),
        .init(title: "Nix", mime: "text/x-nix"),
        .init(title: "NSIS", mime: "text/x-nsis"),
        .init(title: "NTriples", mime: "application/n-triples"),
        .init(title: "Objective-C", mime: "text/x-objectivec"),
        .init(title: "OCaml", mime: "text/x-ocaml"),
        .init(title: "Octave", mime: "text/x-octave"),
        .init(title: "Oz", mime: "text/x-oz"),
        .init(title: "Pascal", mime: "text/x-pascal"),
        .init(title: "PEG.js", mime: "text/x-pegjs"),
        .init(title: "Perl", mime: "text/x-perl"),
        .init(title: "PGP", mime: "application/pgp"),
        .init(title: "PHP", mime: "text/x-php"),
        .init(title: "Pig", mime: "text/x-pig"),
        .init(title: "PLSQL", mime: "text/x-plsql"),
        .init(title: "PostgreSQL", mime: "text/x-pgsql"),
        .init(title: "PowerShell", mime: "application/x-powershell"),
        .init(title: "Properties files", mime: "text/x-properties"),
        .init(title: "ProtoBuf", mime: "text/x-protobuf"),
        .init(title: "Pug", mime: "text/x-pug"),
        .init(title: "Puppet", mime: "text/x-puppet"),
        .init(title: "Python", mime: "text/x-python"),
        .init(title: "Q", mime: "text/x-q"),
        .init(title: "R", mime: "text/x-rsrc"),
        .init(title: "reStructuredText", mime: "text/x-rst"),
        .init(title: "RPM Changes", mime: "text/x-rpm-changes"),
        .init(title: "RPM Spec", mime: "text/x-rpm-spec"),
        .init(title: "Ruby", mime: "text/x-ruby"),
        .init(title: "Rust", mime: "text/x-rustsrc"),
        .init(title: "SAS", mime: "text/x-sas"),
        .init(title: "Sass", mime: "text/x-sass"),
        .init(title: "Scala", mime: "text/x-scala"),
        .init(title: "Scheme", mime: "text/x-scheme"),
        .init(title: "SCSS", mime: "text/x-scss"),
        .init(title: "Shell (bash)", mime: "text/x-sh"),
        .init(title: "Sieve", mime: "application/sieve"),
        .init(title: "Slim", mime: "text/x-slim"),
        .init(title: "Smalltalk", mime: "text/x-stsrc"),
        .init(title: "Smarty", mime: "text/x-smarty"),
        .init(title: "SML", mime: "text/x-sml"),
        .init(title: "Solr", mime: "text/x-solr"),
        .init(title: "Soy", mime: "text/x-soy"),
        .init(title: "SPARQL", mime: "application/sparql-query"),
        .init(title: "Spreadsheet", mime: "text/x-spreadsheet"),
        .init(title: "SQL", mime: "text/x-sql"),
        .init(title: "SQLite (Trilium)", mime: "text/x-sqlite;schema=trilium"),
        .init(title: "SQLite", mime: "text/x-sqlite"),
        .init(title: "Squirrel", mime: "text/x-squirrel"),
        .init(title: "sTeX", mime: "text/x-stex"),
        .init(title: "Stylus", mime: "text/x-styl"),
        .init(title: "Swift", mime: "text/x-swift"),
        .init(title: "SystemVerilog", mime: "text/x-systemverilog"),
        .init(title: "Tcl", mime: "text/x-tcl"),
        .init(title: "Terraform (HCL)", mime: "text/x-hcl"),
        .init(title: "Textile", mime: "text/x-textile"),
        .init(title: "TiddlyWiki", mime: "text/x-tiddlywiki"),
        .init(title: "Tiki wiki", mime: "text/tiki"),
        .init(title: "TOML", mime: "text/x-toml"),
        .init(title: "Tornado", mime: "text/x-tornado"),
        .init(title: "Trilium Log", mime: "text/x-trilium-log"),
        .init(title: "troff", mime: "text/troff"),
        .init(title: "TTCN_CFG", mime: "text/x-ttcn-cfg"),
        .init(title: "TTCN", mime: "text/x-ttcn"),
        .init(title: "Turtle", mime: "text/turtle"),
        .init(title: "Twig", mime: "text/x-twig"),
        .init(title: "TypeScript-JSX", mime: "text/typescript-jsx"),
        .init(title: "TypeScript", mime: "application/typescript"),
        .init(title: "VB.NET", mime: "text/x-vb"),
        .init(title: "VBScript", mime: "text/vbscript"),
        .init(title: "Velocity", mime: "text/velocity"),
        .init(title: "Verilog", mime: "text/x-verilog"),
        .init(title: "VHDL", mime: "text/x-vhdl"),
        .init(title: "Vue.js Component", mime: "text/x-vue"),
        .init(title: "Web IDL", mime: "text/x-webidl"),
        .init(title: "XML", mime: "text/xml"),
        .init(title: "XQuery", mime: "application/xquery"),
        .init(title: "xu", mime: "text/x-xu"),
        .init(title: "Yacas", mime: "text/x-yacas"),
        .init(title: "YAML", mime: "text/x-yaml"),
        .init(title: "Z80", mime: "text/x-z80"),
    ]

    /// Friendly title for a note’s MIME, falling back to a cleaned mime token.
    static func displayTitle(for mime: String) -> String {
        let key = mime.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        if let match = defaults.first(where: { $0.mime.lowercased() == key }) {
            return match.title
        }
        if key == "text/markdown" {
            return "Markdown"
        }
        var lang = mime
            .replacingOccurrences(of: "text/x-", with: "")
            .replacingOccurrences(of: "text/", with: "")
            .replacingOccurrences(of: "application/", with: "")
            .replacingOccurrences(of: "x-", with: "")
        if let semi = lang.firstIndex(of: ";") {
            lang = String(lang[..<semi])
        }
        if lang.isEmpty || lang == "plain" {
            return "Plain text"
        }
        return lang.capitalized
    }

    static func isMarkdownMime(_ mime: String) -> Bool {
        mime.lowercased().contains("markdown") || mime.lowercased() == "text/x-gfm"
    }
}
