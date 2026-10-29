import Foundation

/// What a note web view needs to draw and change to-do task states: the states, what a tap sets, whether a hold
/// opens the state menu, and whether the note is Markdown (which stores symbols, so only states with one are offered).
/// Handed to `task-states.js` as JSON; the boxes are drawn by `TaskStateStyles.css(states:)`.
struct TaskStateWebConfig: Equatable {
    var states: [TaskStateDefinition]
    var tapState: String
    var menuEnabled: Bool
    var isMarkdown: Bool

    /// Trilium's defaults, a tap toggling Done, no menu: for previews and servers without task states.
    static let plain = TaskStateWebConfig(
        states: TaskStateCatalog.defaults, tapState: TaskStateCatalog.doneName, menuEnabled: false, isMarkdown: false
    )

    /// The configuration `store` gives a text note (`isMarkdown` false) or a Markdown note. Text notes only get the
    /// menu, and a tap state other than Done, when the server has task states: an older one's editor drops them.
    @MainActor
    static func forNote(store: TaskStateStore, isMarkdown: Bool) -> TaskStateWebConfig {
        let menu = isMarkdown || store.isServerBacked
        return TaskStateWebConfig(
            states: store.states,
            tapState: menu ? store.effectiveTapStateName : TaskStateCatalog.doneName,
            menuEnabled: menu,
            isMarkdown: isMarkdown
        )
    }

    /// The visible states a menu lists for this note.
    var menuStates: [TaskStateDefinition] {
        states.filter { state in
            !state.isHidden && (!isMarkdown || state.isAnchor || !state.markdownSymbol.isEmpty)
        }
    }

    var css: String { TaskStateStyles.css(states: states) }

    /// The `configure(…)` argument for `task-states.js`.
    var json: String {
        let payload: [String: Any] = [
            "states": states.map { state in
                [
                    "name": state.name,
                    "title": state.displayTitle,
                    "isCompleted": state.isCompleted,
                    "isHidden": state.isHidden,
                    "markdownSymbol": state.markdownSymbol,
                ] as [String: Any]
            },
            "tapState": tapState,
            "menu": menuEnabled,
            "markdown": isMarkdown,
            "labels": [
                "editStates": String(localized: "Edit States…", comment: "To-do state menu: open the task states settings"),
            ],
        ]
        guard let data = try? JSONSerialization.data(withJSONObject: payload, options: [.sortedKeys]),
              let text = String(data: data, encoding: .utf8)
        else { return "{}" }
        // Safe inside an inline <script>.
        return text.replacingOccurrences(of: "</", with: "<\\/")
    }

    // MARK: - Bundled files

    static let bundledScript: String? = bundleText(resource: "task-states", extension: "js")
    static let bundledStylesheet: String? = bundleText(resource: "task-states", extension: "css")

    private static func bundleText(resource: String, extension ext: String) -> String? {
        guard let url = Bundle.main.url(forResource: resource, withExtension: ext),
              let text = try? String(contentsOf: url, encoding: .utf8),
              !text.isEmpty
        else { return nil }
        // An inline <script> ends at the first `</script`, wherever it appears.
        if ext == "js", text.range(of: "</script", options: .caseInsensitive) != nil { return nil }
        return text
    }
}
