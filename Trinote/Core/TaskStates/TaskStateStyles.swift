import Foundation
import UIKit

/// How to-do checkboxes are drawn in note web views (reading view and editor) and in the state menu, as Trilium's
/// default theme draws them: a filled 4 px rounded box with a white glyph at 0.8 size. A state's fill is its color's
/// hue at fixed saturation and lightness (`hsl(h, 50%, 50%)`, dark `hsl(h, 40%, 50%)`); a gray or missing color falls
/// back to gray. See `todo_lists.css` and `theme-next-light/dark.css` in Trilium.
///
/// WebKit draws no pseudo-elements on `<input>`, so the glyph is a small PNG rendered from the bundled Boxicons font
/// (`TaskStateGlyphImage`) rather than Trilium's `::after` text.
enum TaskStateStyles {
    struct Palette: Equatable {
        let none: String
        let done: String
        /// A state without a usable hue.
        let colorless: String
        let saturation: Int
        let lightness: Int

        static let light = Palette(none: "#00000029", done: "#339933", colorless: "gray", saturation: 50, lightness: 50)
        static let dark = Palette(none: "#ffffff26", done: "#408b40", colorless: "#ffffff3b", saturation: 40, lightness: 50)

        /// The fill for a state whose color is `color` (any CSS color; empty means none).
        func fill(forColor color: String) -> String {
            guard let hue = CSSColorHue.hue(of: color) else { return colorless }
            return "hsl(\(CSSColorHue.format(hue)), \(saturation)%, \(lightness)%)"
        }
    }

    /// Selector families: the reading view's stored CKEditor markup, the editor's TipTap markup, and the menu's boxes.
    private static let readingBox = #"ul.todo-list li%@ > .todo-list__label input[type="checkbox"]"#
    private static let editorBox = #"ul[data-type="taskList"] li%@ > label input[type="checkbox"]"#
    private static let miniBox = #".tn-task-checkbox%@"#

    private static func selectors(stateAttribute: String, checked: Bool = false) -> String {
        let suffix = checked ? ":checked" : ""
        return [readingBox, editorBox].map { String(format: $0, stateAttribute) + suffix }
            .joined(separator: ",\n")
    }

    private static func stateSelector(_ name: String) -> String {
        "[data-trilium-task-state=\"\(name)\"]"
    }

    /// The stylesheet for `states`: every box's shape, None and Done, then one rule per custom state. Unknown states
    /// draw as None or Done by their stored `checked`, which is what Trilium's docs promise once a state is deleted.
    static func css(states: [TaskStateDefinition]) -> String {
        var rules: [String] = []
        let allBoxes = [readingBox, editorBox].map { String(format: $0, "") } + [String(format: miniBox, "")]
        rules.append("""
        \(allBoxes.joined(separator: ",\n")) {
          -webkit-appearance: none; appearance: none; box-sizing: border-box; display: inline-block;
          width: 18px; height: 18px; margin: 0; padding: 0; flex-shrink: 0; border: none; border-radius: 4px;
          background-color: var(--tn-task-none); background-repeat: no-repeat; background-position: center;
          background-size: 80% 80%; opacity: 1; vertical-align: top; cursor: pointer;
        }
        """)

        let doneSelectors = [readingBox, editorBox].map { String(format: $0, "") + ":checked" }
            + [String(format: miniBox, stateSelector(TaskStateCatalog.doneName))]
        rules.append(declaration(doneSelectors, background: "var(--tn-task-done)", iconClass: TaskStateCatalog.done.iconClass))

        var lightFills: [String] = []
        var darkFills: [String] = []
        for state in states where !state.isAnchor {
            let attribute = stateSelector(state.name)
            let selectorList = [readingBox, editorBox].map { String(format: $0, attribute) } + [String(format: miniBox, attribute)]
            rules.append(declaration(selectorList, background: nil, iconClass: state.iconClass))
            lightFills.append("\(selectorList.joined(separator: ",\n")) { background-color: \(Palette.light.fill(forColor: state.color)); }")
            darkFills.append("\(selectorList.joined(separator: ",\n")) { background-color: \(Palette.dark.fill(forColor: state.color)); }")
        }

        return """
        :root { --tn-task-none: \(Palette.light.none); --tn-task-done: \(Palette.light.done); }
        @media (prefers-color-scheme: dark) {
          :root { --tn-task-none: \(Palette.dark.none); --tn-task-done: \(Palette.dark.done); }
        }
        \(rules.joined(separator: "\n"))
        \(lightFills.joined(separator: "\n"))
        @media (prefers-color-scheme: dark) {
        \(darkFills.joined(separator: "\n"))
        }
        ul.todo-list .todo-list__label:has(> input[type="checkbox"]:checked) > .todo-list__label__description,
        ul[data-type="taskList"] li[data-checked="true"] > div > p {
          text-decoration: line-through; opacity: 0.6;
        }
        """
    }

    // MARK: - Native drawing (menu, Settings)

    /// The fill a box in `state` gets, for native views.
    static func fillColor(for state: TaskStateDefinition, dark: Bool) -> UIColor {
        let palette = dark ? Palette.dark : Palette.light
        switch state.name {
        case TaskStateCatalog.noneName:
            return dark ? UIColor(white: 1, alpha: 0x26 / 255) : UIColor(white: 0, alpha: 0x29 / 255)
        case TaskStateCatalog.doneName:
            return dark ? UIColor(red: 0x40 / 255, green: 0x8b / 255, blue: 0x40 / 255, alpha: 1)
                : UIColor(red: 0x33 / 255, green: 0x99 / 255, blue: 0x33 / 255, alpha: 1)
        default:
            guard let hue = CSSColorHue.hue(of: state.color) else {
                return dark ? UIColor(white: 1, alpha: 0x3b / 255) : UIColor(white: 0x80 / 255, alpha: 1)
            }
            let (r, g, b) = CSSColorHue.hslToRGB(
                h: hue, s: Double(palette.saturation) / 100, l: Double(palette.lightness) / 100
            )
            return UIColor(red: r, green: g, blue: b, alpha: 1)
        }
    }

    private static func declaration(_ selectors: [String], background: String?, iconClass: String) -> String {
        var body: [String] = []
        if let background { body.append("background-color: \(background);") }
        if let url = TaskStateGlyphImage.dataURL(forIconClass: iconClass) {
            body.append("background-image: url(\"\(url)\");")
        } else {
            body.append("background-image: none;")
        }
        return "\(selectors.joined(separator: ",\n")) { \(body.joined(separator: " ")) }"
    }
}

/// The hue of a CSS color, as Trilium works it out (the `color` library's HSL hue): nil for a gray (zero saturation),
/// an empty value or one it can't read.
enum CSSColorHue {
    static func hue(of color: String) -> Double? {
        guard let (r, g, b) = rgb(of: color) else { return nil }
        let maxC = max(r, g, b), minC = min(r, g, b)
        let delta = maxC - minC
        guard delta > 0.0001 else { return nil }
        var hue: Double
        if maxC == r {
            hue = (g - b) / delta
        } else if maxC == g {
            hue = (b - r) / delta + 2
        } else {
            hue = (r - g) / delta + 4
        }
        hue *= 60
        if hue < 0 { hue += 360 }
        return hue
    }

    static func format(_ hue: Double) -> String {
        let rounded = (hue * 100).rounded() / 100
        return rounded == rounded.rounded() ? String(Int(rounded)) : String(rounded)
    }

    /// Red, green and blue from 0 to 1 for a hex, `rgb()`/`rgba()`, `hsl()`/`hsla()` or common named color.
    static func rgb(of color: String) -> (Double, Double, Double)? {
        let value = color.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard !value.isEmpty else { return nil }
        if value.hasPrefix("#") { return hex(String(value.dropFirst())) }
        if value.hasPrefix("rgb") {
            let parts = arguments(value)
            guard parts.count >= 3 else { return nil }
            let channels = parts.prefix(3).compactMap { part -> Double? in
                if part.hasSuffix("%") { return Double(part.dropLast()).map { $0 / 100 } }
                return Double(part).map { $0 / 255 }
            }
            guard channels.count == 3 else { return nil }
            return (channels[0], channels[1], channels[2])
        }
        if value.hasPrefix("hsl") {
            let parts = arguments(value)
            guard parts.count >= 3,
                  let h = Double(parts[0].replacingOccurrences(of: "deg", with: "")),
                  let s = Double(parts[1].replacingOccurrences(of: "%", with: "")),
                  let l = Double(parts[2].replacingOccurrences(of: "%", with: ""))
            else { return nil }
            return hslToRGB(h: h, s: s / 100, l: l / 100)
        }
        return named[value].flatMap { hex($0) }
    }

    private static func arguments(_ value: String) -> [String] {
        guard let open = value.firstIndex(of: "("), let close = value.lastIndex(of: ")"), open < close else { return [] }
        return value[value.index(after: open)..<close]
            .split(whereSeparator: { $0 == "," || $0 == " " || $0 == "/" })
            .map(String.init)
    }

    private static func hex(_ digits: String) -> (Double, Double, Double)? {
        guard digits.unicodeScalars.allSatisfy({ CharacterSet(charactersIn: "0123456789abcdef").contains($0) }) else { return nil }
        let full: String
        switch digits.count {
        case 3, 4: full = digits.prefix(3).map { "\($0)\($0)" }.joined()
        case 6, 8: full = String(digits.prefix(6))
        default: return nil
        }
        guard let number = UInt32(full, radix: 16) else { return nil }
        return (Double((number >> 16) & 0xff) / 255, Double((number >> 8) & 0xff) / 255, Double(number & 0xff) / 255)
    }

    static func hslToRGB(h: Double, s: Double, l: Double) -> (Double, Double, Double) {
        let c = (1 - abs(2 * l - 1)) * s
        let hp = (h.truncatingRemainder(dividingBy: 360) + 360).truncatingRemainder(dividingBy: 360) / 60
        let x = c * (1 - abs(hp.truncatingRemainder(dividingBy: 2) - 1))
        let (r, g, b): (Double, Double, Double)
        switch hp {
        case 0..<1: (r, g, b) = (c, x, 0)
        case 1..<2: (r, g, b) = (x, c, 0)
        case 2..<3: (r, g, b) = (0, c, x)
        case 3..<4: (r, g, b) = (0, x, c)
        case 4..<5: (r, g, b) = (x, 0, c)
        default: (r, g, b) = (c, 0, x)
        }
        let m = l - c / 2
        return (r + m, g + m, b + m)
    }

    /// CSS named colors people are likely to type into a state's color.
    private static let named: [String: String] = [
        "black": "000000", "white": "ffffff", "gray": "808080", "grey": "808080", "silver": "c0c0c0",
        "red": "ff0000", "maroon": "800000", "orange": "ffa500", "gold": "ffd700", "yellow": "ffff00",
        "olive": "808000", "lime": "00ff00", "green": "008000", "teal": "008080", "aqua": "00ffff",
        "cyan": "00ffff", "blue": "0000ff", "navy": "000080", "purple": "800080", "fuchsia": "ff00ff",
        "magenta": "ff00ff", "pink": "ffc0cb", "brown": "a52a2a", "indigo": "4b0082", "violet": "ee82ee",
        "crimson": "dc143c", "coral": "ff7f50", "tomato": "ff6347", "salmon": "fa8072", "khaki": "f0e68c",
        "orchid": "da70d6", "plum": "dda0dd", "tan": "d2b48c", "turquoise": "40e0d0", "chocolate": "d2691e",
        "firebrick": "b22222", "darkred": "8b0000", "darkorange": "ff8c00", "darkgreen": "006400",
        "darkblue": "00008b", "lightgreen": "90ee90", "lightblue": "add8e6", "skyblue": "87ceeb",
        "steelblue": "4682b4", "royalblue": "4169e1", "forestgreen": "228b22", "seagreen": "2e8b57",
        "hotpink": "ff69b4", "deeppink": "ff1493", "goldenrod": "daa520", "sienna": "a0522d",
        "slategray": "708090", "lightgray": "d3d3d3", "darkgray": "a9a9a9", "rebeccapurple": "663399",
    ]
}

/// A Boxicons glyph drawn white into a small PNG `data:` URL, for a checkbox's `background-image`. Cached per icon.
enum TaskStateGlyphImage {
    private static let lock = NSLock()
    nonisolated(unsafe) private static var cache: [String: String?] = [:]

    /// Nil for an icon outside the bundled Boxicons set (a custom icon pack): the box keeps its color, without a glyph.
    static func dataURL(forIconClass iconClass: String) -> String? {
        lock.lock()
        if let cached = cache[iconClass] {
            lock.unlock()
            return cached
        }
        lock.unlock()
        let url = render(iconClass)
        lock.lock()
        cache[iconClass] = url
        lock.unlock()
        return url
    }

    private static func render(_ iconClass: String) -> String? {
        guard BoxiconsResolver.isCatalogIcon(iconClass),
              let glyph = BoxiconsResolver.glyphCharacter(from: iconClass),
              let font = UIFont(name: BoxiconsCatalog.fontPostScriptName, size: 40)
        else { return nil }
        let side: CGFloat = 40
        let format = UIGraphicsImageRendererFormat()
        format.scale = 2
        format.opaque = false
        let text = NSAttributedString(string: String(glyph), attributes: [.font: font, .foregroundColor: UIColor.white])
        let size = text.size()
        let image = UIGraphicsImageRenderer(size: CGSize(width: side, height: side), format: format).image { _ in
            text.draw(at: CGPoint(x: (side - size.width) / 2, y: (side - size.height) / 2))
        }
        guard let png = image.pngData() else { return nil }
        return "data:image/png;base64,\(png.base64EncodedString())"
    }
}
