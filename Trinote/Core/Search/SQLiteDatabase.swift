import Foundation
import SQLite3

/// A small wrapper over the system SQLite, for the offline search index (SwiftData has no full-text search). Not
/// thread-safe: `OfflineSearchIndex` uses it only on its own serial queue.
final class SQLiteDatabase {
    struct Failure: Error, CustomStringConvertible {
        let code: Int32
        let message: String
        var description: String { "SQLite error \(code): \(message)" }
    }

    private var handle: OpaquePointer?

    init(path: String) throws {
        let flags = SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE | SQLITE_OPEN_NOMUTEX
        let code = sqlite3_open_v2(path, &handle, flags, nil)
        guard code == SQLITE_OK else {
            let message = handle.map { String(cString: sqlite3_errmsg($0)) } ?? "open failed"
            sqlite3_close(handle)
            handle = nil
            throw Failure(code: code, message: message)
        }
    }

    deinit {
        sqlite3_close_v2(handle)
    }

    func execute(_ sql: String) throws {
        let code = sqlite3_exec(handle, sql, nil, nil, nil)
        guard code == SQLITE_OK else { throw failure(code) }
    }

    func prepare(_ sql: String) throws -> Statement {
        var statement: OpaquePointer?
        let code = sqlite3_prepare_v2(handle, sql, -1, &statement, nil)
        guard code == SQLITE_OK, let statement else { throw failure(code) }
        return Statement(statement, database: self)
    }

    /// Runs `body` in one transaction, rolled back if it throws.
    func transaction<T>(_ body: () throws -> T) throws -> T {
        try execute("BEGIN IMMEDIATE")
        do {
            let result = try body()
            try execute("COMMIT")
            return result
        } catch {
            try? execute("ROLLBACK")
            throw error
        }
    }

    var userVersion: Int {
        guard let statement = try? prepare("PRAGMA user_version"), (try? statement.step()) == true else { return 0 }
        return statement.int(at: 0)
    }

    func setUserVersion(_ version: Int) throws {
        try execute("PRAGMA user_version = \(version)")
    }

    var lastInsertRowId: Int64 {
        sqlite3_last_insert_rowid(handle)
    }

    fileprivate func failure(_ code: Int32) -> Failure {
        Failure(code: code, message: handle.map { String(cString: sqlite3_errmsg($0)) } ?? "no database")
    }

    final class Statement {
        private let statement: OpaquePointer
        private let database: SQLiteDatabase

        /// SQLite copies bound text before `bind` returns.
        private static let transient = unsafeBitCast(-1, to: sqlite3_destructor_type.self)

        fileprivate init(_ statement: OpaquePointer, database: SQLiteDatabase) {
            self.statement = statement
            self.database = database
        }

        deinit {
            sqlite3_finalize(statement)
        }

        /// Binds values to `?` parameters in order, after clearing earlier bindings.
        @discardableResult
        func bind(_ values: Any?...) throws -> Statement {
            sqlite3_reset(statement)
            sqlite3_clear_bindings(statement)
            for (offset, value) in values.enumerated() {
                let index = Int32(offset + 1)
                let code: Int32
                switch value {
                case nil:
                    code = sqlite3_bind_null(statement, index)
                case let text as String:
                    code = sqlite3_bind_text(statement, index, text, -1, Self.transient)
                case let number as Int:
                    code = sqlite3_bind_int64(statement, index, Int64(number))
                case let number as Int64:
                    code = sqlite3_bind_int64(statement, index, number)
                case let number as Double:
                    code = sqlite3_bind_double(statement, index, number)
                default:
                    preconditionFailure("SQLiteDatabase: unsupported bind type \(type(of: value))")
                }
                guard code == SQLITE_OK else { throw database.failure(code) }
            }
            return self
        }

        /// Advances to the next row: true while there is one.
        func step() throws -> Bool {
            let code = sqlite3_step(statement)
            switch code {
            case SQLITE_ROW: return true
            case SQLITE_DONE: return false
            default: throw database.failure(code)
            }
        }

        /// Runs a statement that returns no rows.
        func run() throws {
            while try step() {}
            sqlite3_reset(statement)
        }

        func text(at column: Int32) -> String {
            guard let pointer = sqlite3_column_text(statement, column) else { return "" }
            return String(cString: pointer)
        }

        func int(at column: Int32) -> Int {
            Int(sqlite3_column_int64(statement, column))
        }

        func int64(at column: Int32) -> Int64 {
            sqlite3_column_int64(statement, column)
        }

        func double(at column: Int32) -> Double {
            sqlite3_column_double(statement, column)
        }
    }
}
