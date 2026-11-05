import XCTest
@testable import Trinote

final class MainTabPreferencesTests: XCTestCase {
    override func setUp() {
        super.setUp()
        UserDefaults.standard.removeObject(forKey: MainTabPreferences.shownTabsKey)
    }

    override func tearDown() {
        UserDefaults.standard.removeObject(forKey: MainTabPreferences.shownTabsKey)
        super.tearDown()
    }

    func testMissingValueGivesTheDefaults() {
        XCTAssertEqual(Array(MainTabPreferences.shownTabs.prefix(4)), [.notes, .recents, .search, .addNote])
        XCTAssertEqual(Set(MainTabPreferences.defaultTabs), Set(MainTab.allCases))
        XCTAssertEqual(MainTabPreferences.tabs(fromStored: nil), MainTabPreferences.defaultTabs)
    }

    func testMigrationReplacesTabsSavedByAnEarlierBuild() {
        let defaults = UserDefaults(suiteName: "MainTabMigration")!
        defaults.removePersistentDomain(forName: "MainTabMigration")
        defer { defaults.removePersistentDomain(forName: "MainTabMigration") }

        // An earlier build (no marker) left the old tabs behind.
        defaults.set("notes,favorites,search,recents,settings", forKey: MainTabPreferences.shownTabsKey)
        MainTabPreferences.migrateIfNeeded(currentBuild: 25, defaults: defaults)
        XCTAssertNil(defaults.string(forKey: MainTabPreferences.shownTabsKey))
        XCTAssertEqual(defaults.integer(forKey: MainTabPreferences.migratedBuildKey), 25)

        // From then on the user's choice stays, through later builds too.
        defaults.set("notes,search", forKey: MainTabPreferences.shownTabsKey)
        MainTabPreferences.migrateIfNeeded(currentBuild: 25, defaults: defaults)
        MainTabPreferences.migrateIfNeeded(currentBuild: 26, defaults: defaults)
        XCTAssertEqual(defaults.string(forKey: MainTabPreferences.shownTabsKey), "notes,search")
        XCTAssertEqual(defaults.integer(forKey: MainTabPreferences.migratedBuildKey), 26)
    }

    func testEmptyOrUnreadableValueGivesDefaults() {
        XCTAssertEqual(MainTabPreferences.tabs(fromStored: ""), MainTabPreferences.defaultTabs)
        XCTAssertEqual(MainTabPreferences.tabs(fromStored: "bogus,alsoBogus"), MainTabPreferences.defaultTabs)
    }

    func testOrderRoundTrips() {
        MainTabPreferences.shownTabs = [.settings, .notes, .search]
        XCTAssertEqual(UserDefaults.standard.string(forKey: MainTabPreferences.shownTabsKey), "settings,notes,search")
        XCTAssertEqual(MainTabPreferences.shownTabs, [.settings, .notes, .search])
    }

    func testUnknownNamesAreDroppedAndSpacesIgnored() {
        XCTAssertEqual(MainTabPreferences.tabs(fromStored: "notes, bogus ,search"), [.notes, .search])
    }

    func testDuplicatesKeepTheFirstOccurrence() {
        XCTAssertEqual(MainTabPreferences.normalized([.search, .notes, .search, .notes]), [.search, .notes])
    }

    func testNotesIsAddedAtTheFrontWhenMissing() {
        XCTAssertEqual(MainTabPreferences.tabs(fromStored: "favorites,search"), [.notes, .favorites, .search])
    }

    func testEveryTabCanBeShownAtOnce() {
        MainTabPreferences.shownTabs = MainTab.allCases
        XCTAssertEqual(MainTabPreferences.shownTabs, MainTab.allCases)
        XCTAssertEqual(MainTabPreferences.tabs(fromStored: "favorites,search,recents,settings,aiChat,notes").count, 6)
    }

    func testActionAndOptionalTabsSurviveStorage() {
        MainTabPreferences.shownTabs = [.notes, .addNote, .todaysJournal, .aiChat, .pinnedNote]
        XCTAssertEqual(MainTabPreferences.shownTabs, [.notes, .addNote, .todaysJournal, .aiChat, .pinnedNote])
    }

    func testCustomIconsRoundTripAndDropWhatIsUnknown() {
        let encoded = MainTabPreferences.encodeIcons([.notes: "tray.fill", .search: "star.fill"])
        XCTAssertEqual(MainTabPreferences.customIcons(fromStored: encoded), [.notes: "tray.fill", .search: "star.fill"])
        XCTAssertEqual(MainTabPreferences.customIcons(fromStored: nil), [:])
        XCTAssertEqual(MainTabPreferences.customIcons(fromStored: "not json"), [:])
        XCTAssertEqual(MainTabPreferences.customIcons(fromStored: #"{"bogusTab":"star.fill","notes":"no.such.symbol.xyz"}"#), [:])
    }

    func testIconFallsBackToTheTabsOwn() {
        XCTAssertEqual(MainTabPreferences.icon(for: .notes, customIcons: [:]), "folder.fill")
        XCTAssertEqual(MainTabPreferences.icon(for: .notes, customIcons: [.notes: "tray.fill"]), "tray.fill")
        XCTAssertEqual(MainTabPreferences.icon(for: .notes, customIcons: [.notes: "no.such.symbol.xyz"]), "folder.fill")
        XCTAssertEqual(MainTab.todaysJournal.icon, "book.fill")
    }

    func testOnlyNotesIsRequiredAndOnlyAddNoteActs() {
        XCTAssertEqual(MainTab.allCases.filter(\.isRequired), [.notes])
        XCTAssertEqual(MainTab.allCases.filter(\.isAction), [.addNote])
    }
}
