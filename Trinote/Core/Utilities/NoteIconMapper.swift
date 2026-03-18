import Foundation

/// Maps Trilium's Boxicons `iconClass` values (e.g. "bx bx-calendar") to SF Symbols names.
/// Falls back to the note-type default when no mapping exists.
enum NoteIconMapper {

    /// Extract the SF Symbol name from a Trilium `iconClass` string.
    /// Returns `nil` if no mapping is found (caller should fall back to note type icon).
    static func sfSymbol(for iconClass: String?) -> String? {
        guard let iconClass, !iconClass.isEmpty else { return nil }

        // iconClass is typically "bx bx-name" or "bx bxs-name" or "bxl-name"
        let classes = iconClass
            .split(separator: " ")
            .map(String.init)

        let iconKey = classes.first { $0.hasPrefix("bx-") || $0.hasPrefix("bxs-") || $0.hasPrefix("bxl-") }
            ?? classes.last

        guard let key = iconKey else {
            return nil
        }

        // 1. Exact match
        if let symbol = boxiconsToSFSymbols[key] {
            return symbol
        }

        // 2. Try stripping prefix and matching the other variant (bx- ↔ bxs-)
        let stripped: String
        if key.hasPrefix("bxs-") {
            stripped = String(key.dropFirst(4))
            if let symbol = boxiconsToSFSymbols["bx-\(stripped)"] {
                return symbol
            }
        } else if key.hasPrefix("bx-") {
            stripped = String(key.dropFirst(3))
            if let symbol = boxiconsToSFSymbols["bxs-\(stripped)"] {
                return symbol
            }
        } else if key.hasPrefix("bxl-") {
            stripped = String(key.dropFirst(4))
        } else {
            stripped = key
        }

        // 3. Keyword-based fuzzy match on the icon name
        if let symbol = keywordMatch(stripped) {
            return symbol
        }

        return nil
    }

    /// Best-effort mapping from keywords in the icon name to an SF Symbol.
    private static func keywordMatch(_ name: String) -> String? {
        let parts = Set(name.split(separator: "-").map { String($0).lowercased() })

        for (keywords, symbol) in keywordTable {
            if !keywords.isDisjoint(with: parts) { return symbol }
        }
        return nil
    }

    /// Keywords → SF Symbol fallback table. Checked when no exact match is found.
    private static let keywordTable: [(Set<String>, String)] = [
        // Files & documents
        (["file", "document", "doc"], "doc"),
        (["folder", "directory"], "folder"),
        (["dots", "ellipsis", "more", "options", "kebab", "meatball"], "ellipsis"),
        (["archive", "zip", "compress"], "archivebox"),
        (["book", "library", "journal"], "book"),
        (["bookmark", "bookmarks"], "bookmark"),
        (["note", "notepad", "notebook", "sticky"], "note.text"),
        (["clipboard", "paste"], "clipboard"),
        (["news", "newspaper", "article", "blog"], "newspaper"),
        (["copy", "duplicate"], "doc.on.doc"),

        // Communication
        (["envelope", "mail", "email"], "envelope"),
        (["chat", "message", "sms", "bubble", "conversation"], "bubble.left"),
        (["comment", "comments", "discussion"], "text.bubble"),
        (["phone", "call", "dial", "telephone"], "phone"),
        (["send", "paper plane"], "paperplane"),
        (["inbox"], "tray"),
        (["notification", "bell", "alarm"], "bell"),

        // Media
        (["camera", "snapshot", "photo"], "camera"),
        (["image", "picture", "gallery", "photo album"], "photo"),
        (["video", "movie", "film", "cinema"], "video"),
        (["music", "audio", "sound", "song"], "music.note"),
        (["microphone", "mic", "voice", "record"], "mic"),
        (["headphone", "headset", "earphone"], "headphones"),
        (["speaker", "volume"], "speaker.wave.2"),
        (["play"], "play.fill"),
        (["pause"], "pause.fill"),
        (["stop"], "stop.fill"),

        // Navigation & location
        (["map", "atlas"], "map"),
        (["pin", "location", "place", "marker"], "mappin"),
        (["compass", "direction"], "location.north"),
        (["globe", "world", "earth", "planet", "international"], "globe"),
        (["home", "house", "residence"], "house"),
        (["building", "office", "company", "enterprise"], "building.2"),
        (["store", "shop", "market"], "storefront"),
        (["navigation", "navigate"], "location"),

        // Time & calendar
        (["calendar", "date", "schedule", "event"], "calendar"),
        (["time", "clock", "watch", "hour", "minute", "second", "oclock", "five", "schedule", "when", "duration", "period"], "clock"),
        (["timer", "countdown", "interval", "pomodoro"], "timer"),
        (["hourglass", "wait", "loading", "pending", "delay"], "hourglass"),
        (["history", "recent", "rewind", "past", "ago", "log", "timeline", "journal"], "clock.arrow.circlepath"),
        (["stopwatch", "chrono", "lap", "race", "speed"], "stopwatch"),
        (["alarm", "wake", "morning", "reminder"], "alarm"),

        // People
        (["user", "person", "profile", "account", "member", "avatar"], "person"),
        (["group", "team", "people", "users", "community"], "person.2"),
        (["face", "happy", "sad", "emotion", "emoji", "smiley"], "face.smiling"),
        (["body", "human", "figure"], "figure.stand"),

        // Business & finance
        (["wallet", "purse"], "wallet.pass"),
        (["credit", "card", "payment"], "creditcard"),
        (["money", "cash", "dollar", "euro", "currency", "coin"], "banknote"),
        (["bank", "finance", "financial"], "building.columns"),
        (["chart", "graph", "analytics", "stats", "statistics"], "chart.bar"),
        (["trending"], "arrow.up.right"),
        (["briefcase", "portfolio", "work", "job"], "briefcase"),
        (["receipt", "invoice", "bill"], "receipt"),
        (["cart", "basket", "shopping"], "cart"),
        (["bag"], "bag"),
        (["gift", "present", "reward"], "gift"),
        (["tag", "label", "price"], "tag"),
        (["trophy", "award", "achievement", "cup"], "trophy"),
        (["medal", "badge", "ribbon"], "medal"),
        (["crown", "king", "queen", "royal"], "crown"),
        (["diamond", "gem", "jewel"], "diamond"),

        // Dev & code
        (["code", "programming", "develop", "html", "css"], "chevron.left.forwardslash.chevron.right"),
        (["terminal", "console", "command", "shell", "cli"], "terminal"),
        (["bug", "debug", "issue"], "ladybug"),
        (["git", "branch", "merge", "commit", "repo"], "arrow.triangle.branch"),
        (["data", "database", "storage", "sql"], "cylinder"),
        (["server", "hosting", "rack"], "server.rack"),
        (["cloud"], "cloud"),
        (["chip", "cpu", "processor", "hardware"], "cpu"),
        (["hdd", "disk", "drive", "hard"], "internaldrive"),
        (["api", "plugin", "extension", "addon", "module"], "puzzlepiece.extension"),

        // Interface
        (["search", "find", "lookup", "magnify"], "magnifyingglass"),
        (["filter", "funnel"], "line.3.horizontal.decrease"),
        (["sort", "order"], "arrow.up.arrow.down"),
        (["menu", "hamburger"], "line.3.horizontal"),
        (["grid", "layout", "dashboard", "widget"], "square.grid.2x2"),
        (["list", "bullet"], "list.bullet"),
        (["check", "done", "complete", "task", "todo"], "checkmark"),
        (["cog", "gear", "settings", "config", "preference"], "gearshape"),
        (["wrench", "tool", "repair", "fix", "maintenance"], "wrench"),
        (["slider", "adjust"], "slider.horizontal.3"),
        (["toggle", "switch"], "switch.2"),
        (["refresh", "reload"], "arrow.clockwise"),
        (["sync", "synchronize"], "arrow.triangle.2.circlepath"),
        (["expand", "fullscreen", "maximize"], "arrow.up.left.and.arrow.down.right"),

        // Arrows & links
        (["link", "url", "chain", "connect"], "link"),
        (["share"], "square.and.arrow.up"),
        (["upload"], "arrow.up.circle"),
        (["download"], "arrow.down.circle"),
        (["export"], "square.and.arrow.up"),
        (["import"], "square.and.arrow.down"),
        (["chevrons", "chevrons-left", "fast", "skip", "rewind"], "chevron.left.2"),
        (["undo"], "arrow.uturn.backward"),
        (["redo"], "arrow.uturn.forward"),

        // Objects & security
        (["key", "password", "secret", "token"], "key"),
        (["lock", "secure", "private", "encrypt"], "lock"),
        (["shield", "protect", "defense", "security", "guard"], "shield"),
        (["trash", "delete", "remove", "bin", "garbage"], "trash"),
        (["pencil", "edit", "write", "pen", "compose"], "pencil"),
        (["eraser", "clear"], "eraser"),
        (["paint", "brush", "palette", "art", "color", "colour", "draw"], "paintpalette"),
        (["cut", "scissors"], "scissors"),
        (["flag", "report"], "flag"),
        (["bulb", "light", "idea", "lamp", "tip"], "lightbulb"),
        (["rocket", "launch", "startup"], "paperplane"),
        (["target", "aim", "goal", "scope", "crosshair"], "scope"),
        (["save", "floppy"], "square.and.arrow.down"),
        (["print", "printer"], "printer"),

        // Weather & nature
        (["sun", "sunny", "bright", "day"], "sun.max"),
        (["moon", "night", "dark"], "moon"),
        (["rain", "rainy", "shower"], "cloud.rain"),
        (["snow", "winter", "cold", "ice"], "cloud.snow"),
        (["bolt", "lightning", "thunder", "flash", "electric", "power"], "bolt"),
        (["drop", "water", "droplet", "liquid"], "drop"),
        (["leaf", "nature", "eco", "green", "organic", "plant"], "leaf"),
        (["tree", "forest"], "tree"),
        (["fire", "flame", "hot", "burn"], "flame"),
        (["wind", "breeze", "air"], "wind"),

        // Health & science
        (["heart", "love", "like", "favorite", "favourite"], "heart"),
        (["health", "medical", "hospital", "aid", "first"], "cross.case"),
        (["pulse", "heartbeat", "vital", "ecg"], "waveform.path.ecg"),
        (["pill", "medicine", "drug", "capsule", "pharmacy"], "pills"),
        (["test", "tube", "lab", "experiment", "flask", "beaker", "science"], "flask"),
        (["atom", "molecule", "physics", "nuclear"], "atom"),
        (["dna", "gene", "genetic", "biology"], "staroflife"),
        (["brain", "mind", "think", "cognitive", "neural"], "brain"),
        (["band", "bandage", "injury"], "bandage"),

        // Shapes & symbols
        (["star"], "star"),
        (["circle"], "circle"),
        (["square", "rectangle"], "square"),
        (["triangle"], "triangle"),
        (["hash", "hashtag", "number", "pound"], "number"),
        (["at", "email"], "at"),
        (["info", "information", "about"], "info.circle"),
        (["question", "help", "faq", "support"], "questionmark.circle"),
        (["error", "warning", "danger", "alert", "exclamation", "caution"], "exclamationmark.triangle"),
        (["math", "calculate", "formula", "function"], "function"),
        (["infinity", "infinite", "unlimited"], "infinity"),

        // Education
        (["graduation", "school", "education", "university", "college", "academic", "student"], "graduationcap"),
        (["teach", "class", "lesson", "course", "lecture", "training"], "book"),

        // Transport
        (["car", "vehicle", "automobile", "drive", "driving"], "car"),
        (["bus", "transit", "transport"], "bus"),
        (["train", "rail", "railway", "subway", "metro"], "tram"),
        (["plane", "airplane", "flight", "travel", "trip"], "airplane"),
        (["bike", "bicycle", "cycling", "cycle"], "figure.outdoor.cycle"),
        (["boat", "ship", "ferry", "sail"], "ferry"),

        // Devices
        (["desktop", "computer", "pc", "monitor", "screen", "display"], "desktopcomputer"),
        (["laptop", "notebook"], "laptopcomputer"),
        (["mobile", "smartphone", "cell"], "iphone"),
        (["tablet", "ipad"], "ipad"),
        (["tv", "television"], "tv"),
        (["wifi", "wireless", "signal"], "wifi"),
        (["bluetooth"], "wave.3.right"),
        (["battery", "energy", "charge"], "battery.100"),
        (["game", "joystick", "controller", "gaming", "console", "arcade"], "gamecontroller"),
        (["keyboard", "type", "typing"], "keyboard"),
        (["mouse", "cursor", "pointer"], "computermouse"),

        // Food & drink
        (["coffee", "cafe", "espresso", "latte"], "cup.and.saucer"),
        (["wine", "drink", "cocktail", "alcohol", "bar", "glass", "beer"], "wineglass"),
        (["pizza", "food", "restaurant", "meal", "eat", "dining", "dinner", "lunch", "breakfast"], "fork.knife"),
        (["cake", "birthday", "party", "celebration", "celebrate"], "birthday.cake"),
        (["bowl", "soup", "noodle", "ramen"], "cup.and.heat.waves"),

        // Misc
        (["table", "spreadsheet", "excel", "csv"], "tablecells"),
        (["window", "browser", "tab", "webpage", "website"], "macwindow"),
        (["qr", "barcode", "scan"], "qrcode"),
        (["fingerprint", "biometric", "touch"], "touchid"),
        (["id", "identity", "passport", "license"], "person.text.rectangle"),
        (["ghost", "halloween", "spooky"], "theatermasks"),
        (["dice", "random", "chance", "luck", "casino", "gamble"], "dice"),
        (["spa", "relax", "wellness", "yoga", "meditation", "zen"], "leaf"),
        (["run", "jog", "running", "sprint", "exercise", "fitness", "workout", "gym"], "figure.run"),
        (["swim", "swimming", "pool"], "figure.pool.swim"),
        (["walk", "walking", "hike", "hiking", "step"], "figure.walk"),

        // Brands (bxl- prefix) — best-effort
        (["apple"], "apple.logo"),
        (["github"], "arrow.triangle.branch"),
        (["python"], "chevron.left.forwardslash.chevron.right"),
        (["javascript", "js"], "chevron.left.forwardslash.chevron.right"),
        (["react"], "atom"),
        (["docker", "kubernetes"], "shippingbox"),
        (["slack", "discord", "telegram", "whatsapp", "messenger", "skype", "viber", "wechat", "line"], "bubble.left"),
        (["twitter", "x"], "bubble.left"),
        (["facebook", "instagram", "tiktok", "snapchat", "pinterest", "linkedin", "reddit", "tumblr"], "person.2"),
        (["youtube", "vimeo", "twitch"], "play.rectangle"),
        (["spotify", "soundcloud", "deezer"], "music.note"),
        (["amazon", "ebay", "shopify", "etsy"], "cart"),
        (["google", "chrome", "firefox", "safari", "edge", "opera"], "globe"),
        (["windows", "microsoft"], "desktopcomputer"),
        (["android"], "iphone"),
        (["wordpress", "medium", "blogger", "ghost"], "doc.text"),
        (["dropbox", "drive"], "icloud"),
        (["aws", "azure", "digitalocean", "heroku", "netlify", "vercel"], "cloud"),
        (["figma", "sketch", "adobe", "photoshop", "illustrator"], "paintpalette"),
        (["trello", "jira", "asana", "notion"], "checklist"),
        (["zoom", "teams"], "video"),
        (["paypal", "stripe", "visa", "mastercard"], "creditcard"),
        (["bitcoin", "ethereum", "crypto"], "bitcoinsign.circle"),
    ]

    // MARK: - Boxicons → SF Symbols

    private static let boxiconsToSFSymbols: [String: String] = [
        // Files & Documents
        "bx-file": "doc",
        "bx-file-blank": "doc",
        "bx-file-find": "doc.text.magnifyingglass",
        "bxs-file": "doc.fill",
        "bxs-file-doc": "doc.text.fill",
        "bx-folder": "folder",
        "bx-folder-open": "folder",
        "bxs-folder": "folder.fill",
        "bxs-folder-open": "folder.fill",
        "bx-folder-plus": "folder.badge.plus",
        "bx-folder-minus": "folder.badge.minus",
        "bx-dots-horizontal": "ellipsis",
        "bx-dots-horizontal-rounded": "ellipsis.circle",
        "bx-dots-vertical": "ellipsis",
        "bx-dots-vertical-rounded": "ellipsis.circle",
        "bxs-dots-horizontal-rounded": "ellipsis.circle.fill",
        "bxs-dots-vertical-rounded": "ellipsis.circle.fill",
        "bx-more-horizontal": "ellipsis",
        "bx-more-vertical": "ellipsis",
        "bx-archive": "archivebox",
        "bxs-archive": "archivebox.fill",
        "bx-book": "book",
        "bx-book-open": "book",
        "bxs-book": "book.fill",
        "bx-bookmarks": "bookmark",
        "bxs-bookmarks": "bookmark.fill",
        "bx-bookmark": "bookmark",
        "bxs-bookmark": "bookmark.fill",
        "bx-note": "note.text",
        "bxs-note": "note.text",
        "bx-notepad": "note.text",
        "bx-clipboard": "clipboard",
        "bxs-clipboard": "clipboard.fill",
        "bx-copy": "doc.on.doc",
        "bxs-copy": "doc.on.doc.fill",
        "bx-paste": "doc.on.clipboard",
        "bx-news": "newspaper",
        "bxs-news": "newspaper.fill",

        // Communication
        "bx-envelope": "envelope",
        "bxs-envelope": "envelope.fill",
        "bx-chat": "bubble.left",
        "bx-message": "bubble.left",
        "bxs-chat": "bubble.left.fill",
        "bxs-message": "bubble.left.fill",
        "bx-message-dots": "bubble.left.and.bubble.right",
        "bx-message-rounded": "bubble.left",
        "bx-comment": "text.bubble",
        "bxs-comment": "text.bubble.fill",
        "bx-phone": "phone",
        "bxs-phone": "phone.fill",
        "bx-phone-call": "phone.arrow.up.right",
        "bxs-phone-call": "phone.arrow.up.right.fill",
        "bx-conversation": "bubble.left.and.bubble.right",
        "bx-send": "paperplane",
        "bxs-send": "paperplane.fill",

        // Media
        "bx-camera": "camera",
        "bxs-camera": "camera.fill",
        "bx-image": "photo",
        "bxs-image": "photo.fill",
        "bx-images": "photo.on.rectangle",
        "bx-photo-album": "photo.stack",
        "bx-video": "video",
        "bxs-video": "video.fill",
        "bx-music": "music.note",
        "bx-movie": "film",
        "bx-microphone": "mic",
        "bxs-microphone": "mic.fill",
        "bx-headphone": "headphones",
        "bx-volume-full": "speaker.wave.3",
        "bx-volume-mute": "speaker.slash",
        "bx-play": "play",
        "bxs-play": "play.fill",
        "bx-pause": "pause",
        "bx-stop": "stop",

        // Navigation & Location
        "bx-map": "map",
        "bxs-map": "map.fill",
        "bx-map-pin": "mappin",
        "bxs-map-pin": "mappin",
        "bx-location-plus": "mappin.and.ellipse",
        "bx-compass": "location.north",
        "bxs-compass": "location.north.fill",
        "bx-navigation": "location",
        "bxs-navigation": "location.fill",
        "bx-globe": "globe",
        "bx-world": "globe",
        "bx-home": "house",
        "bxs-home": "house.fill",
        "bx-building": "building.2",
        "bxs-building": "building.2.fill",
        "bx-buildings": "building.2",
        "bxs-buildings": "building.2.fill",
        "bx-store": "storefront",
        "bxs-store": "storefront.fill",

        // Time & Calendar
        "bx-calendar": "calendar",
        "bxs-calendar": "calendar",
        "bx-calendar-event": "calendar.badge.clock",
        "bxs-calendar-event": "calendar.badge.clock",
        "bx-calendar-check": "calendar.badge.checkmark",
        "bxs-calendar-check": "calendar.badge.checkmark",
        "bx-calendar-plus": "calendar.badge.plus",
        "bxs-calendar-plus": "calendar.badge.plus",
        "bx-time": "clock",
        "bx-time-five": "clock",
        "bxs-time": "clock.fill",
        "bxs-time-five": "clock.fill",
        "bx-timer": "timer",
        "bx-alarm": "alarm",
        "bxs-alarm": "alarm.fill",
        "bx-hourglass": "hourglass",
        "bxs-hourglass": "hourglass",
        "bx-stopwatch": "stopwatch",
        "bxs-stopwatch": "stopwatch.fill",
        "bx-history": "clock.arrow.circlepath",

        // People & Users
        "bx-user": "person",
        "bxs-user": "person.fill",
        "bx-user-circle": "person.circle",
        "bxs-user-circle": "person.circle.fill",
        "bx-user-plus": "person.badge.plus",
        "bx-user-check": "person.badge.checkmark",
        "bx-group": "person.2",
        "bxs-group": "person.2.fill",
        "bx-face": "face.smiling",
        "bxs-face": "face.smiling.fill",
        "bx-body": "figure.stand",
        "bx-accessibility": "figure.roll",
        "bx-happy": "face.smiling",
        "bxs-happy": "face.smiling.fill",

        // Business & Finance
        "bx-wallet": "wallet.pass",
        "bxs-wallet": "wallet.pass.fill",
        "bx-credit-card": "creditcard",
        "bxs-credit-card": "creditcard.fill",
        "bx-money": "banknote",
        "bxs-bank": "building.columns",
        "bx-dollar": "dollarsign.circle",
        "bx-euro": "eurosign.circle",
        "bx-bitcoin": "bitcoinsign.circle",
        "bx-bar-chart": "chart.bar",
        "bxs-bar-chart": "chart.bar.fill",
        "bx-line-chart": "chart.xyaxis.line",
        "bx-pie-chart": "chart.pie",
        "bxs-pie-chart": "chart.pie.fill",
        "bx-trending-up": "arrow.up.right",
        "bx-trending-down": "arrow.down.right",
        "bx-briefcase": "briefcase",
        "bxs-briefcase": "briefcase.fill",
        "bx-receipt": "receipt",
        "bx-cart": "cart",
        "bxs-cart": "cart.fill",
        "bx-store-alt": "bag",
        "bxs-store-alt": "bag.fill",
        "bx-shopping-bag": "bag",
        "bxs-shopping-bag": "bag.fill",
        "bx-gift": "gift",
        "bxs-gift": "gift.fill",
        "bx-purchase-tag": "tag",
        "bxs-purchase-tag": "tag.fill",

        // Development & Code
        "bx-code": "chevron.left.forwardslash.chevron.right",
        "bx-code-alt": "chevron.left.forwardslash.chevron.right",
        "bx-code-block": "curlybraces",
        "bx-code-curly": "curlybraces",
        "bx-terminal": "terminal",
        "bx-bug": "ladybug",
        "bxs-bug": "ladybug.fill",
        "bx-git-branch": "arrow.triangle.branch",
        "bx-git-merge": "arrow.triangle.merge",
        "bx-git-commit": "circle.inset.filled",
        "bx-git-pull-request": "arrow.triangle.pull",
        "bx-data": "cylinder",
        "bxs-data": "cylinder.fill",
        "bx-server": "server.rack",
        "bxs-server": "server.rack",
        "bx-cloud": "cloud",
        "bxs-cloud": "cloud.fill",
        "bx-cloud-upload": "icloud.and.arrow.up",
        "bx-cloud-download": "icloud.and.arrow.down",
        "bx-chip": "cpu",
        "bxs-chip": "cpu.fill",
        "bx-hdd": "internaldrive",
        "bxs-hdd": "internaldrive.fill",

        // Interface & UI
        "bx-search": "magnifyingglass",
        "bx-filter": "line.3.horizontal.decrease",
        "bx-sort": "arrow.up.arrow.down",
        "bx-menu": "line.3.horizontal",
        "bx-grid": "square.grid.2x2",
        "bx-grid-alt": "square.grid.3x3",
        "bxs-grid": "square.grid.2x2.fill",
        "bxs-grid-alt": "square.grid.3x3.fill",
        "bx-list-ul": "list.bullet",
        "bx-list-ol": "list.number",
        "bx-list-check": "checklist",
        "bx-check": "checkmark",
        "bx-check-circle": "checkmark.circle",
        "bxs-check-circle": "checkmark.circle.fill",
        "bx-x": "xmark",
        "bx-x-circle": "xmark.circle",
        "bxs-x-circle": "xmark.circle.fill",
        "bx-plus": "plus",
        "bx-plus-circle": "plus.circle",
        "bxs-plus-circle": "plus.circle.fill",
        "bx-minus": "minus",
        "bx-minus-circle": "minus.circle",
        "bxs-minus-circle": "minus.circle.fill",
        "bx-cog": "gearshape",
        "bxs-cog": "gearshape.fill",
        "bx-wrench": "wrench",
        "bxs-wrench": "wrench.fill",
        "bx-slider": "slider.horizontal.3",
        "bx-toggle-left": "switch.2",
        "bx-toggle-right": "switch.2",
        "bx-expand": "arrow.up.left.and.arrow.down.right",
        "bx-collapse": "arrow.down.right.and.arrow.up.left",
        "bx-fullscreen": "arrow.up.left.and.arrow.down.right",
        "bx-exit-fullscreen": "arrow.down.right.and.arrow.up.left",
        "bx-refresh": "arrow.clockwise",
        "bx-sync": "arrow.triangle.2.circlepath",

        // Arrows & Directions
        "bx-up-arrow": "arrow.up",
        "bx-down-arrow": "arrow.down",
        "bx-left-arrow": "arrow.left",
        "bx-right-arrow": "arrow.right",
        "bx-arrow-back": "arrow.left",
        "bx-chevron-up": "chevron.up",
        "bx-chevron-down": "chevron.down",
        "bx-chevron-left": "chevron.left",
        "bx-chevron-right": "chevron.right",
        "bx-chevrons-up": "chevron.up.2",
        "bx-chevrons-down": "chevron.down.2",
        "bx-chevrons-left": "chevron.left.2",
        "bx-chevrons-right": "chevron.right.2",
        "bx-link": "link",
        "bx-link-external": "arrow.up.right.square",
        "bx-link-alt": "link",
        "bx-unlink": "link.badge.plus",
        "bx-share": "square.and.arrow.up",
        "bx-share-alt": "arrowshape.turn.up.right",
        "bx-upload": "arrow.up.circle",
        "bx-download": "arrow.down.circle",
        "bx-export": "square.and.arrow.up",
        "bx-import": "square.and.arrow.down",
        "bx-undo": "arrow.uturn.backward",
        "bx-redo": "arrow.uturn.forward",

        // Objects
        "bx-key": "key",
        "bxs-key": "key.fill",
        "bx-lock": "lock",
        "bx-lock-open": "lock.open",
        "bxs-lock": "lock.fill",
        "bxs-lock-open": "lock.open.fill",
        "bx-shield": "shield",
        "bxs-shield": "shield.fill",
        "bx-trash": "trash",
        "bxs-trash": "trash.fill",
        "bx-pencil": "pencil",
        "bx-edit": "square.and.pencil",
        "bxs-edit": "square.and.pencil",
        "bx-eraser": "eraser",
        "bx-highlight": "highlighter",
        "bx-paint-roll": "paintbrush",
        "bx-palette": "paintpalette",
        "bxs-palette": "paintpalette.fill",
        "bx-brush": "paintbrush.pointed",
        "bx-cut": "scissors",
        "bx-magnet": "pin",
        "bx-pin": "pin",
        "bxs-pin": "pin.fill",
        "bx-printer": "printer",
        "bxs-printer": "printer.fill",
        "bx-save": "square.and.arrow.down",
        "bx-flag": "flag",
        "bxs-flag": "flag.fill",
        "bx-bell": "bell",
        "bxs-bell": "bell.fill",
        "bx-bell-off": "bell.slash",
        "bxs-bell-off": "bell.slash.fill",
        "bx-bulb": "lightbulb",
        "bxs-bulb": "lightbulb.fill",
        "bx-rocket": "paperplane",
        "bxs-rocket": "paperplane.fill",
        "bx-target-lock": "scope",
        "bx-trophy": "trophy",
        "bxs-trophy": "trophy.fill",
        "bx-medal": "medal",
        "bxs-medal": "medal.fill",

        // Weather & Nature
        "bx-sun": "sun.max",
        "bxs-sun": "sun.max.fill",
        "bx-moon": "moon",
        "bxs-moon": "moon.fill",
        "bx-cloud-rain": "cloud.rain",
        "bx-cloud-snow": "cloud.snow",
        "bx-bolt": "bolt",
        "bxs-bolt": "bolt.fill",
        "bx-droplet": "drop",
        "bxs-droplet": "drop.fill",
        "bx-leaf": "leaf",
        "bxs-leaf": "leaf.fill",
        "bx-tree": "tree",
        "bxs-tree": "tree.fill",

        // Health & Science
        "bx-heart": "heart",
        "bxs-heart": "heart.fill",
        "bx-first-aid": "cross.case",
        "bxs-first-aid": "cross.case.fill",
        "bx-pulse": "waveform.path.ecg",
        "bx-band-aid": "bandage",
        "bx-test-tube": "flask",
        "bx-atom": "atom",
        "bx-dna": "staroflife",
        "bx-brain": "brain",

        // Shapes & Symbols
        "bx-star": "star",
        "bxs-star": "star.fill",
        "bx-star-half": "star.leadinghalf.filled",
        "bx-circle": "circle",
        "bxs-circle": "circle.fill",
        "bx-square": "square",
        "bxs-square": "square.fill",
        "bx-diamond": "diamond",
        "bxs-diamond": "diamond.fill",
        "bx-shape-triangle": "triangle",
        "bx-hash": "number",
        "bx-at": "at",
        "bx-info-circle": "info.circle",
        "bxs-info-circle": "info.circle.fill",
        "bx-question-mark": "questionmark.circle",
        "bx-help-circle": "questionmark.circle",
        "bxs-help-circle": "questionmark.circle.fill",
        "bx-error": "exclamationmark.triangle",
        "bxs-error": "exclamationmark.triangle.fill",
        "bx-error-circle": "exclamationmark.circle",
        "bxs-error-circle": "exclamationmark.circle.fill",

        // Education
        "bx-math": "function",
        "bx-task": "checklist",
        "bxs-graduation": "graduationcap.fill",
        "bx-food-menu": "menucard",

        // Transport
        "bx-car": "car",
        "bxs-car": "car.fill",
        "bx-bus": "bus",
        "bxs-bus": "bus.fill",
        "bx-train": "tram",
        "bxs-train": "tram.fill",
        "bx-plane": "airplane",
        "bxs-plane": "airplane",
        "bx-cycling": "figure.outdoor.cycle",

        // Devices
        "bx-desktop": "desktopcomputer",
        "bx-laptop": "laptopcomputer",
        "bx-mobile": "iphone",
        "bx-tablet": "ipad",
        "bxs-mobile": "iphone",
        "bxs-tablet": "ipad",
        "bx-tv": "tv",
        "bxs-tv": "tv.fill",
        "bx-wifi": "wifi",
        "bx-bluetooth": "wave.3.right",
        "bx-usb": "cable.connector",
        "bx-battery": "battery.100",
        "bxs-battery": "battery.100",
        "bx-battery-charging": "battery.100.bolt",
        "bx-joystick": "gamecontroller",
        "bxs-joystick": "gamecontroller.fill",

        // Social (common brand-adjacent)
        "bx-log-in": "arrow.right.to.line",
        "bx-log-out": "arrow.left.to.line",
        "bx-power-off": "power",
        "bx-qr": "qrcode",
        "bx-qr-scan": "qrcode.viewfinder",
        "bx-scan": "barcode.viewfinder",
        "bx-fingerprint": "touchid",
        "bx-id-card": "person.text.rectangle",
        "bxs-id-card": "person.text.rectangle.fill",

        // Misc
        "bx-window-open": "macwindow",
        "bx-window-close": "xmark.rectangle",
        "bx-tab": "rectangle.stack",
        "bx-spreadsheet": "tablecells",
        "bx-table": "tablecells",
        "bx-task-x": "xmark.rectangle",
        "bx-infinite": "infinity",
        "bx-spa": "leaf",
        "bx-coffee": "cup.and.saucer",
        "bxs-coffee": "cup.and.saucer.fill",
        "bx-wine": "wineglass",
        "bxs-wine": "wineglass.fill",
        "bx-pizza": "fork.knife",
        "bx-bowl-hot": "cup.and.heat.waves",
        "bx-cake": "birthday.cake",
        "bxs-cake": "birthday.cake.fill",
        "bx-game": "gamecontroller",
        "bxs-game": "gamecontroller.fill",
        "bx-dice-5": "dice",
        "bxs-dice-5": "dice.fill",
        "bx-ghost": "theatermasks",
        "bxs-ghost": "theatermasks.fill",
        "bx-party": "party.popper",
        "bx-crown": "crown",
        "bxs-crown": "crown.fill",
        "bx-extension": "puzzlepiece.extension",
        "bxs-extension": "puzzlepiece.extension.fill",
    ]
}
