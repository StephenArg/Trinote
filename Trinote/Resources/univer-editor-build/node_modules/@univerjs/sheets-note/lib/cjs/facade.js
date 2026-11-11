Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_core_facade = require("@univerjs/core/facade");
let _univerjs_sheets_note = require("@univerjs/sheets-note");
let _univerjs_sheets_facade = require("@univerjs/sheets/facade");
let _univerjs_core = require("@univerjs/core");
let _univerjs_sheets = require("@univerjs/sheets");

//#region src/facade/f-event.ts
/**
* @ignore
*/
var FSheetsNoteEventNameMixin = class extends _univerjs_core_facade.FEventName {
	get SheetNoteAdd() {
		return "SheetNoteAdd";
	}
	get SheetNoteDelete() {
		return "SheetNoteDelete";
	}
	get SheetNoteUpdate() {
		return "SheetNoteUpdate";
	}
	get SheetNoteShow() {
		return "SheetNoteShow";
	}
	get SheetNoteHide() {
		return "SheetNoteHide";
	}
	get BeforeSheetNoteAdd() {
		return "BeforeSheetNoteAdd";
	}
	get BeforeSheetNoteDelete() {
		return "BeforeSheetNoteDelete";
	}
	get BeforeSheetNoteUpdate() {
		return "BeforeSheetNoteUpdate";
	}
	get BeforeSheetNoteShow() {
		return "BeforeSheetNoteShow";
	}
	get BeforeSheetNoteHide() {
		return "BeforeSheetNoteHide";
	}
};
_univerjs_core_facade.FEventName.extend(FSheetsNoteEventNameMixin);

//#endregion
//#region src/facade/f-range.ts
var FRangeSheetsNoteMixin = class extends _univerjs_sheets_facade.FRange {
	createOrUpdateNote(note) {
		this._commandService.syncExecuteCommand(_univerjs_sheets_note.UpdateNoteMutation.id, {
			unitId: this.getUnitId(),
			sheetId: this.getSheetId(),
			row: this.getRow(),
			col: this.getColumn(),
			note
		});
		return this;
	}
	deleteNote() {
		this._commandService.syncExecuteCommand(_univerjs_sheets_note.RemoveNoteMutation.id, {
			unitId: this.getUnitId(),
			sheetId: this.getSheetId(),
			row: this.getRow(),
			col: this.getColumn()
		});
		return this;
	}
	getNote() {
		return this._injector.get(_univerjs_sheets_note.SheetsNoteModel).getNote(this.getUnitId(), this.getSheetId(), {
			row: this.getRow(),
			col: this.getColumn()
		});
	}
};
_univerjs_sheets_facade.FRange.extend(FRangeSheetsNoteMixin);

//#endregion
//#region src/facade/f-univer.ts
var FUniverSheetsNoteMixin = class extends _univerjs_core_facade.FUniver {
	_initialize(injector) {
		const commandService = injector.get(_univerjs_core.ICommandService);
		this.disposeWithMe(this.registerEventHandler(this.Event.SheetNoteAdd, () => {
			return injector.get(_univerjs_sheets_note.SheetsNoteModel).change$.subscribe((change) => {
				if (change.type === "update" && !change.oldNote && change.newNote) {
					const { unitId, subUnitId, newNote } = change;
					const target = this.getSheetCommandTarget({
						unitId,
						subUnitId
					});
					if (!target) return;
					const { workbook, worksheet } = target;
					const eventParams = {
						workbook,
						worksheet,
						row: newNote.row,
						col: newNote.col,
						note: newNote
					};
					this.fireEvent(this.Event.SheetNoteAdd, eventParams);
				}
			});
		}));
		this.disposeWithMe(this.registerEventHandler(this.Event.SheetNoteDelete, () => {
			return injector.get(_univerjs_sheets_note.SheetsNoteModel).change$.subscribe((change) => {
				if (change.type === "update" && change.oldNote && !change.newNote) {
					const { unitId, subUnitId, oldNote } = change;
					const target = this.getSheetCommandTarget({
						unitId,
						subUnitId
					});
					if (!target) return;
					const { workbook, worksheet } = target;
					const eventParams = {
						workbook,
						worksheet,
						row: oldNote.row,
						col: oldNote.col,
						oldNote
					};
					this.fireEvent(this.Event.SheetNoteDelete, eventParams);
				}
			});
		}));
		this.disposeWithMe(this.registerEventHandler(this.Event.SheetNoteUpdate, () => {
			return injector.get(_univerjs_sheets_note.SheetsNoteModel).change$.subscribe((change) => {
				if (change.type === "update" && change.oldNote && change.newNote) {
					const { unitId, subUnitId, oldNote, newNote } = change;
					const target = this.getSheetCommandTarget({
						unitId,
						subUnitId
					});
					if (!target) return;
					const { workbook, worksheet } = target;
					const eventParams = {
						workbook,
						worksheet,
						row: newNote.row,
						col: newNote.col,
						note: newNote,
						oldNote
					};
					this.fireEvent(this.Event.SheetNoteUpdate, eventParams);
				}
			});
		}));
		this.disposeWithMe(this.registerEventHandler(this.Event.SheetNoteShow, () => {
			return injector.get(_univerjs_sheets_note.SheetsNoteModel).change$.subscribe((change) => {
				if (change.type === "update" && change.oldNote && change.newNote && !change.oldNote.show && change.newNote.show) {
					const { unitId, subUnitId, newNote } = change;
					const target = this.getSheetCommandTarget({
						unitId,
						subUnitId
					});
					if (!target) return;
					const { workbook, worksheet } = target;
					const eventParams = {
						workbook,
						worksheet,
						row: newNote.row,
						col: newNote.col
					};
					this.fireEvent(this.Event.SheetNoteShow, eventParams);
				}
			});
		}));
		this.disposeWithMe(this.registerEventHandler(this.Event.SheetNoteHide, () => {
			return injector.get(_univerjs_sheets_note.SheetsNoteModel).change$.subscribe((change) => {
				if (change.type === "update" && change.oldNote && change.newNote && change.oldNote.show && !change.newNote.show) {
					const { unitId, subUnitId, newNote } = change;
					const target = this.getSheetCommandTarget({
						unitId,
						subUnitId
					});
					if (!target) return;
					const { workbook, worksheet } = target;
					const eventParams = {
						workbook,
						worksheet,
						row: newNote.row,
						col: newNote.col
					};
					this.fireEvent(this.Event.SheetNoteHide, eventParams);
				}
			});
		}));
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeSheetNoteAdd, () => commandService.beforeCommandExecuted((command) => {
			if (command.id === _univerjs_sheets_note.SheetUpdateNoteCommand.id) {
				const params = command.params;
				const target = this.getSheetCommandTarget(params);
				if (!target) return;
				const { workbook, worksheet, unitId, subUnitId } = target;
				const { row, col, note } = params;
				if (injector.get(_univerjs_sheets_note.SheetsNoteModel).getNote(unitId, subUnitId, {
					noteId: note.id,
					row,
					col
				})) return;
				const eventParams = {
					workbook,
					worksheet,
					row,
					col,
					note
				};
				if (this.fireEvent(this.Event.BeforeSheetNoteAdd, eventParams)) throw new _univerjs_core.CanceledError();
			}
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeSheetNoteDelete, () => commandService.beforeCommandExecuted((command) => {
			if (command.id === _univerjs_sheets_note.SheetDeleteNoteCommand.id) {
				const target = this.getSheetCommandTarget();
				if (!target) return;
				const selection = injector.get(_univerjs_sheets.SheetsSelectionsService).getCurrentLastSelection();
				if (!(selection === null || selection === void 0 ? void 0 : selection.primary)) return;
				const { workbook, worksheet, unitId, subUnitId } = target;
				const { actualRow: row, actualColumn: col } = selection.primary;
				const oldNote = injector.get(_univerjs_sheets_note.SheetsNoteModel).getNote(unitId, subUnitId, {
					row,
					col
				});
				if (!oldNote) return;
				const eventParams = {
					workbook,
					worksheet,
					row,
					col,
					oldNote
				};
				if (this.fireEvent(this.Event.BeforeSheetNoteDelete, eventParams)) throw new _univerjs_core.CanceledError();
			}
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeSheetNoteUpdate, () => commandService.beforeCommandExecuted((command) => {
			if (command.id === _univerjs_sheets_note.SheetUpdateNoteCommand.id) {
				const params = command.params;
				const target = this.getSheetCommandTarget(params);
				if (!target) return;
				const { workbook, worksheet, unitId, subUnitId } = target;
				const { row, col, note } = params;
				const oldNote = injector.get(_univerjs_sheets_note.SheetsNoteModel).getNote(unitId, subUnitId, {
					row,
					col
				});
				if (!oldNote) return;
				const eventParams = {
					workbook,
					worksheet,
					row,
					col,
					note,
					oldNote
				};
				if (this.fireEvent(this.Event.BeforeSheetNoteUpdate, eventParams)) throw new _univerjs_core.CanceledError();
			}
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeSheetNoteShow, () => commandService.beforeCommandExecuted((command) => {
			if (command.id === _univerjs_sheets_note.SheetToggleNotePopupCommand.id) {
				const target = this.getSheetCommandTarget();
				if (!target) return;
				const selection = injector.get(_univerjs_sheets.SheetsSelectionsService).getCurrentLastSelection();
				if (!(selection === null || selection === void 0 ? void 0 : selection.primary)) return;
				const { workbook, worksheet, unitId, subUnitId } = target;
				const { actualRow: row, actualColumn: col } = selection.primary;
				const note = injector.get(_univerjs_sheets_note.SheetsNoteModel).getNote(unitId, subUnitId, {
					row,
					col
				});
				if (!note || note.show) return;
				const eventParams = {
					workbook,
					worksheet,
					row,
					col
				};
				if (this.fireEvent(this.Event.BeforeSheetNoteShow, eventParams)) throw new _univerjs_core.CanceledError();
			}
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeSheetNoteHide, () => commandService.beforeCommandExecuted((command) => {
			if (command.id === _univerjs_sheets_note.SheetToggleNotePopupCommand.id) {
				const target = this.getSheetCommandTarget();
				if (!target) return;
				const selection = injector.get(_univerjs_sheets.SheetsSelectionsService).getCurrentLastSelection();
				if (!(selection === null || selection === void 0 ? void 0 : selection.primary)) return;
				const { workbook, worksheet, unitId, subUnitId } = target;
				const { actualRow: row, actualColumn: col } = selection.primary;
				const note = injector.get(_univerjs_sheets_note.SheetsNoteModel).getNote(unitId, subUnitId, {
					row,
					col
				});
				if (!note || !note.show) return;
				const eventParams = {
					workbook,
					worksheet,
					row,
					col
				};
				if (this.fireEvent(this.Event.BeforeSheetNoteHide, eventParams)) throw new _univerjs_core.CanceledError();
			}
		})));
	}
};
_univerjs_core_facade.FUniver.extend(FUniverSheetsNoteMixin);

//#endregion
//#region src/facade/f-worksheet.ts
var FWorksheetNoteMixin = class extends _univerjs_sheets_facade.FWorksheet {
	getNotes() {
		const notes = this._injector.get(_univerjs_sheets_note.SheetsNoteModel).getSheetNotes(this.getWorkbook().getUnitId(), this.getSheetId());
		if (!notes) return [];
		return Array.from(notes.values()).map((note) => ({ ...note }));
	}
};
_univerjs_sheets_facade.FWorksheet.extend(FWorksheetNoteMixin);

//#endregion
exports.FRangeSheetsNoteMixin = FRangeSheetsNoteMixin;
exports.FSheetsNoteEventNameMixin = FSheetsNoteEventNameMixin;
exports.FUniverSheetsNoteMixin = FUniverSheetsNoteMixin;
exports.FWorksheetNoteMixin = FWorksheetNoteMixin;