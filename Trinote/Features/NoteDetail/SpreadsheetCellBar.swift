import SwiftUI
import UIKit

/// The selected cell of a spreadsheet being edited, as the page reports it (`activeCellState` in univer-editor-app.js).
struct SpreadsheetCell: Equatable, Decodable {
    let sheetId: String
    let row: Int
    let column: Int
    /// The cell, such as `B3`.
    let address: String
    /// The whole selection, such as `B3:D5`: what a formula gets when the cell is tapped while writing one.
    let range: String
    let isRange: Bool
    /// Its formula, or its value as one would type it.
    let text: String
    /// Univer's own in-cell editor is open on it (a double tap), with the web keyboard.
    let isEditingInCell: Bool
    /// A finger chose it just now; Return moving down, or Trinote's own selecting, doesn't count.
    var fromTap: Bool? = nil

    func isSameCell(as other: SpreadsheetCell) -> Bool {
        sheetId == other.sheetId && row == other.row && column == other.column
    }

    func with(text: String) -> SpreadsheetCell {
        SpreadsheetCell(
            sheetId: sheetId, row: row, column: column, address: address, range: range,
            isRange: isRange, text: text, isEditingInCell: isEditingInCell, fromTap: fromTap
        )
    }
}

/// What the cell bar asks of the sheet.
enum SpreadsheetCellAction: Equatable {
    /// Typed text for a cell, read as Univer's cell editor reads it (`=` starts a formula).
    case write(SpreadsheetCell, String)
    case select(sheetId: String, row: Int, column: Int)
    /// Shows what's being typed in the cell, without editing it yet.
    case preview(SpreadsheetCell, String)
    /// The cell as it was, the typing dropped.
    case endPreview(SpreadsheetCell)
}

/// A native bar under the sheet for typing into cells, as in Numbers or Google Sheets on a phone: Univer's own touch
/// editing needs a double tap and edits inside the tiny cell, and a phone has no Delete key to empty one.
///
/// Tapping a cell puts the caret in the bar, keyboard up, so tapping and typing is all it takes. Tapping another cell saves
/// what was typed and edits that one; so do Return (moving down), Done, the keyboard going away, and any save of the note.
/// While a formula waits for an operand (`=SUM(`), tapping cells types their reference instead of moving away.
@Observable
@MainActor
final class SpreadsheetCellBarModel {
    /// The sheet's selection, as last reported.
    private(set) var selection: SpreadsheetCell?
    /// The cell the bar's text belongs to; its `text` is what the sheet holds, to tell whether anything was typed.
    private(set) var draftCell: SpreadsheetCell?
    var draft = ""
    /// The bar's field is in use: focused, or a moment after it lost focus to a tap on the sheet.
    private(set) var isEditing = false
    /// A cell was tapped (or a reference typed by tapping one): the field takes the keyboard, which the tap on the sheet
    /// may have taken.
    var wantsFocus = false
    /// Univer's own in-cell editor opened: the field lets go of the keyboard.
    var wantsBlur = false
    /// The reference the last tap typed; tapping again (or dragging the selection) replaces it.
    private var pickedReference: String?
    /// Return asked the sheet to select the next cell; its report loads it, whatever the text ends with.
    private var isMovingToNextCell = false
    /// The cell showing what's typed. A write replaces the preview; anything else puts the cell back.
    private(set) var previewingCell: SpreadsheetCell?

    /// Types at the field's caret; set by the field.
    @ObservationIgnored var insertAtCaret: ((String) -> Void)?

    var hasChanges: Bool {
        guard let draftCell else { return false }
        return draft != draftCell.text
    }

    /// Whether a tap on a cell now types its reference: the formula is waiting for an operand.
    var acceptsReference: Bool {
        guard isEditing, draft.hasPrefix("=") else { return false }
        if let pickedReference, draft.hasSuffix(pickedReference) { return true }
        guard let last = draft.last(where: { !$0.isWhitespace }) else { return false }
        return "=(,;+-*/^&<>:".contains(last)
    }

    /// A report from the sheet. Returns what to do first: a tap on another cell saves what was typed.
    func receive(_ cell: SpreadsheetCell?) -> [SpreadsheetCellAction] {
        guard let cell else {
            selection = nil
            if !isEditing { load(nil) }
            return []
        }
        selection = cell
        // A double tap opened Univer's in-cell editor: what was typed here is saved, and that editor takes over.
        if cell.isEditingInCell {
            guard isEditing else { return [] }
            wantsBlur = true
            return commit()
        }
        let tappedOneCell = cell.fromTap == true && !cell.isRange
        if isMovingToNextCell {
            isMovingToNextCell = false
            load(cell)
            return []
        }
        guard isEditing, let editing = draftCell else {
            load(cell)
            if tappedOneCell { wantsFocus = true }
            return []
        }
        if cell.isSameCell(as: editing) {
            // The sheet changed under the bar (undo, paste): show it unless something was typed.
            if !hasChanges { load(cell) }
            return []
        }
        if acceptsReference {
            insertReference(cell.range)
            wantsFocus = true
            return []
        }
        let save: [SpreadsheetCellAction] = hasChanges ? [.write(editing, draft)] : endingPreview()
        load(cell)
        if tappedOneCell { wantsFocus = true }
        return save
    }

    /// Writes what's been typed without ending the edit: the note is about to be saved, or the editor to close.
    func flushTypedInput() -> [SpreadsheetCellAction] {
        guard let editing = draftCell, hasChanges else { return [] }
        draftCell = editing.with(text: draft)
        previewingCell = nil
        return [.write(editing, draft)]
    }

    /// The text in the bar changed: the cell shows it as it's typed, or as it was once the text is back to that.
    func draftChanged() -> [SpreadsheetCellAction] {
        guard isEditing, let editing = draftCell else { return [] }
        if hasChanges {
            previewingCell = editing
            return [.preview(editing, draft)]
        }
        guard let previewing = previewingCell else { return [] }
        previewingCell = nil
        return [.endPreview(previewing)]
    }

    func beginEditing() {
        if !isEditing, draftCell == nil { load(selection) }
        isEditing = true
    }

    /// Return: saves, and goes on to the cell below with the keyboard still up.
    func commitAndMoveDown() -> [SpreadsheetCellAction] {
        guard let editing = draftCell else { return [] }
        var actions: [SpreadsheetCellAction] = hasChanges ? [.write(editing, draft)] : endingPreview()
        draftCell = editing.with(text: draft)
        previewingCell = nil
        pickedReference = nil
        isMovingToNextCell = true
        actions.append(.select(sheetId: editing.sheetId, row: editing.row + 1, column: editing.column))
        return actions
    }

    /// Done, or the keyboard went away: saves and stops editing. A cell tapped for a reference gives the selection
    /// back to the edited one.
    func commit() -> [SpreadsheetCellAction] {
        guard isEditing else { return [] }
        isEditing = false
        pickedReference = nil
        guard let editing = draftCell else { return [] }
        var actions: [SpreadsheetCellAction] = hasChanges ? [.write(editing, draft)] : endingPreview()
        draftCell = editing.with(text: draft)
        previewingCell = nil
        actions += selectionBack(to: editing)
        return actions
    }

    func cancel() -> [SpreadsheetCellAction] {
        isEditing = false
        pickedReference = nil
        guard let editing = draftCell else { return [] }
        draft = editing.text
        return endingPreview() + selectionBack(to: editing)
    }

    private func endingPreview() -> [SpreadsheetCellAction] {
        guard let previewing = previewingCell else { return [] }
        previewingCell = nil
        return [.endPreview(previewing)]
    }

    /// Starts a formula with `name`, or adds it to the one being written.
    func insertFunction(_ name: String, takesArguments: Bool) {
        beginEditing()
        let call = name + (takesArguments ? "(" : "()")
        pickedReference = nil
        if draft.hasPrefix("=") {
            if let insertAtCaret { insertAtCaret(call) } else { draft += call }
        } else {
            draft = "=" + call
        }
    }

    private func selectionBack(to editing: SpreadsheetCell) -> [SpreadsheetCellAction] {
        guard let selection, !selection.isSameCell(as: editing) else { return [] }
        isMovingToNextCell = true
        return [.select(sheetId: editing.sheetId, row: editing.row, column: editing.column)]
    }

    private func insertReference(_ reference: String) {
        if let pickedReference, draft.hasSuffix(pickedReference) {
            draft.removeLast(pickedReference.count)
        }
        draft += reference
        pickedReference = reference
    }

    private func load(_ cell: SpreadsheetCell?) {
        draftCell = cell
        draft = cell?.text ?? ""
        pickedReference = nil
    }
}

/// Functions offered by the bar's ƒ menu; Univer computes all of them, as Trilium's editor does.
enum SpreadsheetFunctionMenu {
    struct Function: Hashable {
        let name: String
        var takesArguments = true
    }

    static let groups: [[Function]] = [
        ["SUM", "AVERAGE", "MIN", "MAX", "COUNT", "ROUND", "ABS"].map { Function(name: $0) },
        ["IF", "AND", "OR", "IFERROR"].map { Function(name: $0) },
        ["SUMIF", "COUNTIF", "AVERAGEIF"].map { Function(name: $0) },
        ["VLOOKUP", "XLOOKUP", "INDEX", "MATCH"].map { Function(name: $0) },
        ["CONCAT", "LEFT", "RIGHT", "LEN", "UPPER", "LOWER", "TRIM"].map { Function(name: $0) },
        [Function(name: "TODAY", takesArguments: false), Function(name: "NOW", takesArguments: false), Function(name: "DATE")],
    ]
}

/// The bar itself. It sits under the sheet and rises with the keyboard.
struct SpreadsheetCellBar: View {
    @Bindable var model: SpreadsheetCellBarModel
    let perform: ([SpreadsheetCellAction]) -> Void
    let clearCells: () -> Void
    let undo: () -> Void
    let redo: () -> Void

    @State private var isFieldFocused = false
    @State private var focusLossTask: Task<Void, Never>?

    private static let operatorKeys = ["=", "(", ")", ",", ":", "+", "-", "*", "/", "&", "\"", "$"]

    var body: some View {
        // Univer's own in-cell editor has the web keyboard, and before a workbook opens there's no cell.
        let isUnavailable = model.selection == nil || model.selection?.isEditingInCell == true
        VStack(spacing: 0) {
            Divider()
            if model.isEditing {
                operatorRow
            }
            HStack(spacing: 6) {
                Text(verbatim: model.draftCell?.address ?? model.selection?.address ?? "")
                    .font(.footnote.monospacedDigit().weight(.semibold))
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
                    .frame(minWidth: 34, alignment: .leading)
                    .accessibilityHidden(true)

                SpreadsheetCellTextField(
                    text: $model.draft,
                    isFocused: $isFieldFocused,
                    placeholder: String(localized: "Value or =formula", comment: "Spreadsheet cell bar: placeholder of the field for a cell's contents"),
                    accessibilityLabel: String(localized: "Cell Contents", comment: "Spreadsheet cell bar: the field for the selected cell's contents"),
                    onReturn: { perform(model.commitAndMoveDown()) },
                    registerInsert: { model.insertAtCaret = $0 }
                )
                .frame(height: 34)
                .padding(.horizontal, 8)
                .background(Color(uiColor: .tertiarySystemFill), in: RoundedRectangle(cornerRadius: 8))

                Menu {
                    ForEach(Array(SpreadsheetFunctionMenu.groups.enumerated()), id: \.offset) { _, group in
                        Section {
                            ForEach(group, id: \.self) { function in
                                Button {
                                    model.insertFunction(function.name, takesArguments: function.takesArguments)
                                    isFieldFocused = true
                                } label: {
                                    Text(verbatim: function.name)
                                }
                            }
                        }
                    }
                } label: {
                    barIcon("function")
                }
                .accessibilityLabel(String(localized: "Functions", comment: "Spreadsheet cell bar: menu of formula functions"))

                if model.isEditing {
                    Button {
                        isFieldFocused = false
                        perform(model.cancel())
                    } label: {
                        barIcon("xmark")
                    }
                    .accessibilityLabel(String(localized: "Cancel", comment: "Spreadsheet cell bar: drop what was typed"))
                    Button {
                        isFieldFocused = false
                        perform(model.commit())
                    } label: {
                        barIcon("checkmark", weight: .semibold)
                    }
                    .accessibilityLabel(String(localized: "Done", comment: "Spreadsheet cell bar: save what was typed"))
                } else {
                    Button(action: clearCells) {
                        barIcon("eraser")
                    }
                    .accessibilityLabel(String(localized: "Clear Cells", comment: "Spreadsheet cell bar: empty the selected cells"))
                    Button(action: undo) {
                        barIcon("arrow.uturn.backward")
                    }
                    .accessibilityLabel(String(localized: "Undo", comment: "Spreadsheet cell bar: undo"))
                    Button(action: redo) {
                        barIcon("arrow.uturn.forward")
                    }
                    .accessibilityLabel(String(localized: "Redo", comment: "Spreadsheet cell bar: redo"))
                }
            }
            .padding(.horizontal, 10)
            .padding(.vertical, 7)
        }
        .buttonStyle(.plain)
        .background(.bar, ignoresSafeAreaEdges: .bottom)
        .disabled(isUnavailable && !model.isEditing)
        .opacity(isUnavailable && !model.isEditing ? 0.45 : 1)
        .onChange(of: isFieldFocused) { _, focused in
            focusLossTask?.cancel()
            if focused {
                model.beginEditing()
                return
            }
            guard model.isEditing else { return }
            // A tap on the sheet can take the keyboard just before its report types a reference.
            focusLossTask = Task { @MainActor in
                try? await Task.sleep(nanoseconds: 350_000_000)
                guard !Task.isCancelled, !isFieldFocused else { return }
                perform(model.commit())
            }
        }
        .onChange(of: model.wantsFocus) { _, wants in
            guard wants else { return }
            model.wantsFocus = false
            isFieldFocused = true
        }
        .onChange(of: model.draft) { _, _ in
            perform(model.draftChanged())
        }
        .onChange(of: model.wantsBlur) { _, wants in
            guard wants else { return }
            model.wantsBlur = false
            focusLossTask?.cancel()
            isFieldFocused = false
        }
    }

    private var operatorRow: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 6) {
                ForEach(Self.operatorKeys, id: \.self) { key in
                    Button {
                        if let insert = model.insertAtCaret { insert(key) } else { model.draft += key }
                    } label: {
                        Text(verbatim: key)
                            .font(.body.monospaced())
                            .frame(minWidth: 34, minHeight: 32)
                            .background(Color(uiColor: .tertiarySystemFill), in: RoundedRectangle(cornerRadius: 7))
                    }
                }
            }
            .padding(.horizontal, 10)
            .padding(.top, 7)
        }
    }

    private func barIcon(_ name: String, weight: Font.Weight = .regular) -> some View {
        Image(systemName: name)
            .font(.system(size: 17, weight: weight))
            .foregroundStyle(.primary)
            .frame(width: 34, height: 34)
            .contentShape(Rectangle())
    }
}

/// A plain text field without smart quotes, dashes or autocorrect, which would turn `"a"` in a formula into `“a”`.
private struct SpreadsheetCellTextField: UIViewRepresentable {
    @Binding var text: String
    @Binding var isFocused: Bool
    let placeholder: String
    let accessibilityLabel: String
    let onReturn: () -> Void
    let registerInsert: (@escaping (String) -> Void) -> Void

    func makeCoordinator() -> Coordinator { Coordinator(self) }

    func makeUIView(context: Context) -> UITextField {
        let field = UITextField()
        field.delegate = context.coordinator
        field.placeholder = placeholder
        field.accessibilityLabel = accessibilityLabel
        field.font = .preferredFont(forTextStyle: .body)
        field.adjustsFontForContentSizeCategory = true
        field.autocorrectionType = .no
        field.autocapitalizationType = .none
        field.spellCheckingType = .no
        field.smartQuotesType = .no
        field.smartDashesType = .no
        field.smartInsertDeleteType = .no
        field.returnKeyType = .next
        field.clearButtonMode = .never
        field.setContentHuggingPriority(.defaultLow, for: .horizontal)
        field.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)
        field.addTarget(context.coordinator, action: #selector(Coordinator.textChanged(_:)), for: .editingChanged)
        registerInsert { [weak field] insertion in
            guard let field else { return }
            if !field.isFirstResponder { field.becomeFirstResponder() }
            field.insertText(insertion)
        }
        return field
    }

    func updateUIView(_ field: UITextField, context: Context) {
        context.coordinator.parent = self
        if field.text != text {
            field.text = text
            let end = field.endOfDocument
            field.selectedTextRange = field.textRange(from: end, to: end)
        }
        if isFocused, !field.isFirstResponder {
            DispatchQueue.main.async { field.becomeFirstResponder() }
        } else if !isFocused, field.isFirstResponder {
            DispatchQueue.main.async { field.resignFirstResponder() }
        }
    }

    final class Coordinator: NSObject, UITextFieldDelegate {
        var parent: SpreadsheetCellTextField

        init(_ parent: SpreadsheetCellTextField) {
            self.parent = parent
        }

        @objc func textChanged(_ field: UITextField) {
            parent.text = field.text ?? ""
        }

        func textFieldDidBeginEditing(_ textField: UITextField) {
            if !parent.isFocused { parent.isFocused = true }
        }

        func textFieldDidEndEditing(_ textField: UITextField) {
            if parent.isFocused { parent.isFocused = false }
        }

        func textFieldShouldReturn(_ textField: UITextField) -> Bool {
            parent.onReturn()
            return false
        }
    }
}

/// The spreadsheet editor with the cell bar under it.
struct SpreadsheetEditorWithCellBar: View {
    let initialJSON: String
    let bridge: SpreadsheetEditorBridge
    var colorScheme: ColorScheme
    var imageBytes: TriliumImageSchemeHandler.ByteProvider?
    var onWorkbookChanged: (() -> Void)?
    var currentJSON: (() -> String)?

    @State private var cellBar = SpreadsheetCellBarModel()

    var body: some View {
        VStack(spacing: 0) {
            SpreadsheetEditorView(
                initialJSON: initialJSON,
                bridge: bridge,
                colorScheme: colorScheme,
                imageBytes: imageBytes,
                onWorkbookChanged: onWorkbookChanged,
                currentJSON: currentJSON,
                onCellSelection: { cell in
                    bridge.perform(cellBar.receive(cell))
                }
            )
            // Always there, even before the sheet reports a cell: a bar that came and went would resize the sheet,
            // which cancels a drag of a selection's corners under the finger.
            SpreadsheetCellBar(
                model: cellBar,
                perform: { bridge.perform($0) },
                clearCells: { bridge.clearSelectedCells() },
                undo: { bridge.undo() },
                redo: { bridge.redo() }
            )
        }
        .onAppear {
            // Every read of the workbook (save, Back, autosave, export) first writes what's typed in the bar.
            bridge.typedInput = { [cellBar] in cellBar.flushTypedInput() }
        }
        .background(Color(uiColor: .trinoteSpreadsheetBackground).ignoresSafeArea())
    }
}
