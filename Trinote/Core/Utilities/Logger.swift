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
}
