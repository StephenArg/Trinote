import XCTest
@testable import Trinote

final class TriliumWebSocketProgressTests: XCTestCase {
    private func message(_ json: String) -> [String: Any] {
        (try? JSONSerialization.jsonObject(with: Data(json.utf8)) as? [String: Any]) ?? [:]
    }

    func testReadsTrilium0106PullProgress() {
        let progress = TriliumWebSocketConnection.pullProgress(
            from: message(#"{"type":"sync-pull-in-progress","lastSyncedPush":12,"progress":{"pulled":340,"total":1200}}"#)
        )
        XCTAssertEqual(progress?.pulled, 340)
        XCTAssertEqual(progress?.total, 1200)
    }

    func testOlderServersAndEmptyTotalsGiveNoProgress() {
        XCTAssertNil(TriliumWebSocketConnection.pullProgress(from: message(#"{"type":"sync-pull-in-progress","lastSyncedPush":12}"#)))
        XCTAssertNil(TriliumWebSocketConnection.pullProgress(from: message(#"{"type":"sync-pull-in-progress","progress":{"pulled":0,"total":0}}"#)))
    }

    func testServerPullFractionStaysWithinTheBar() {
        XCTAssertEqual(SyncManager.ServerPullProgress(pulled: 300, total: 1200).fraction, 0.25)
        XCTAssertEqual(SyncManager.ServerPullProgress(pulled: 1300, total: 1200).fraction, 1)
    }

    func testReadsTaskProgressCounts() {
        let withTotal = TriliumWebSocketConnection.taskProgress(
            from: message(#"{"type":"taskProgressCount","taskId":"abc123","taskType":"deleteNotes","data":null,"progressCount":42,"totalCount":120}"#)
        )
        XCTAssertEqual(withTotal, ServerTaskProgress(taskId: "abc123", progressCount: 42, totalCount: 120))

        let bare = TriliumWebSocketConnection.taskProgress(
            from: message(#"{"type":"taskProgressCount","taskId":"abc123","taskType":"deleteNotes","progressCount":0}"#)
        )
        XCTAssertEqual(bare, ServerTaskProgress(taskId: "abc123", progressCount: 0, totalCount: nil))

        XCTAssertNil(TriliumWebSocketConnection.taskProgress(from: message(#"{"type":"taskProgressCount","progressCount":3}"#)))
    }
}
