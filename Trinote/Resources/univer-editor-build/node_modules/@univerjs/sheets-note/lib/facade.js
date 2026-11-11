import { FEventName, FUniver } from "@univerjs/core/facade";
import { RemoveNoteMutation, SheetDeleteNoteCommand, SheetToggleNotePopupCommand, SheetUpdateNoteCommand, SheetsNoteModel, UpdateNoteMutation } from "@univerjs/sheets-note";
import { FRange, FWorksheet } from "@univerjs/sheets/facade";
import { CanceledError, ICommandService } from "@univerjs/core";
import { SheetsSelectionsService } from "@univerjs/sheets";

//#region src/facade/f-event.ts
/**
* @ignore
*/
var FSheetsNoteEventNameMixin = class extends FEventName {
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
FEventName.extend(FSheetsNoteEventNameMixin);

//#endregion
//#region src/facade/f-range.ts
var FRangeSheetsNoteMixin = class extends FRange {
	createOrUpdateNote(note) {
		this._commandService.syncExecuteCommand(UpdateNoteMutation.id, {
			unitId: this.getUnitId(),
			sheetId: this.getSheetId(),
			row: this.getRow(),
			col: this.getColumn(),
			note
		});
		return this;
	}
	deleteNote() {
		this._commandService.syncExecuteCommand(RemoveNoteMutation.id, {
			unitId: this.getUnitId(),
			sheetId: this.getSheetId(),
			row: this.getRow(),
			col: this.getColumn()
		});
		return this;
	}
	getNote() {
		return this._injector.get(SheetsNoteModel).getNote(this.getUnitId(), this.getSheetId(), {
			row: this.getRow(),
			col: this.getColumn()
		});
	}
};
FRange.extend(FRangeSheetsNoteMixin);

//#endregion
//#region src/facade/f-univer.ts
var FUniverSheetsNoteMixin = class extends FUniver {
	_initialize(injector) {
		const commandService = injector.get(ICommandService);
		this.disposeWithMe(this.registerEventHandler(this.Event.SheetNoteAdd, () => {
			return injector.get(SheetsNoteModel).change$.subscribe((change) => {
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
			return injector.get(SheetsNoteModel).change$.subscribe((change) => {
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
			return injector.get(SheetsNoteModel).change$.subscribe((change) => {
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
			return injector.get(SheetsNoteModel).change$.subscribe((change) => {
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
			return injector.get(SheetsNoteModel).change$.subscribe((change) => {
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
			if (command.id === SheetUpdateNoteCommand.id) {
				const params = command.params;
				const target = this.getSheetCommandTarget(params);
				if (!target) return;
				const { workbook, worksheet, unitId, subUnitId } = target;
				const { row, col, note } = params;
				if (injector.get(SheetsNoteModel).getNote(unitId, subUnitId, {
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
				if (this.fireEvent(this.Event.BeforeSheetNoteAdd, eventParams)) throw new CanceledError();
			}
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeSheetNoteDelete, () => commandService.beforeCommandExecuted((command) => {
			if (command.id === SheetDeleteNoteCommand.id) {
				const target = this.getSheetCommandTarget();
				if (!target) return;
				const selection = injector.get(SheetsSelectionsService).getCurrentLastSelection();
				if (!(selection === null || selection === void 0 ? void 0 : selection.primary)) return;
				const { workbook, worksheet, unitId, subUnitId } = target;
				const { actualRow: row, actualColumn: col } = selection.primary;
				const oldNote = injector.get(SheetsNoteModel).getNote(unitId, subUnitId, {
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
				if (this.fireEvent(this.Event.BeforeSheetNoteDelete, eventParams)) throw new CanceledError();
			}
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeSheetNoteUpdate, () => commandService.beforeCommandExecuted((command) => {
			if (command.id === SheetUpdateNoteCommand.id) {
				const params = command.params;
				const target = this.getSheetCommandTarget(params);
				if (!target) return;
				const { workbook, worksheet, unitId, subUnitId } = target;
				const { row, col, note } = params;
				const oldNote = injector.get(SheetsNoteModel).getNote(unitId, subUnitId, {
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
				if (this.fireEvent(this.Event.BeforeSheetNoteUpdate, eventParams)) throw new CanceledError();
			}
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeSheetNoteShow, () => commandService.beforeCommandExecuted((command) => {
			if (command.id === SheetToggleNotePopupCommand.id) {
				const target = this.getSheetCommandTarget();
				if (!target) return;
				const selection = injector.get(SheetsSelectionsService).getCurrentLastSelection();
				if (!(selection === null || selection === void 0 ? void 0 : selection.primary)) return;
				const { workbook, worksheet, unitId, subUnitId } = target;
				const { actualRow: row, actualColumn: col } = selection.primary;
				const note = injector.get(SheetsNoteModel).getNote(unitId, subUnitId, {
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
				if (this.fireEvent(this.Event.BeforeSheetNoteShow, eventParams)) throw new CanceledError();
			}
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeSheetNoteHide, () => commandService.beforeCommandExecuted((command) => {
			if (command.id === SheetToggleNotePopupCommand.id) {
				const target = this.getSheetCommandTarget();
				if (!target) return;
				const selection = injector.get(SheetsSelectionsService).getCurrentLastSelection();
				if (!(selection === null || selection === void 0 ? void 0 : selection.primary)) return;
				const { workbook, worksheet, unitId, subUnitId } = target;
				const { actualRow: row, actualColumn: col } = selection.primary;
				const note = injector.get(SheetsNoteModel).getNote(unitId, subUnitId, {
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
				if (this.fireEvent(this.Event.BeforeSheetNoteHide, eventParams)) throw new CanceledError();
			}
		})));
	}
};
FUniver.extend(FUniverSheetsNoteMixin);

//#endregion
//#region src/facade/f-worksheet.ts
var FWorksheetNoteMixin = class extends FWorksheet {
	getNotes() {
		const notes = this._injector.get(SheetsNoteModel).getSheetNotes(this.getWorkbook().getUnitId(), this.getSheetId());
		if (!notes) return [];
		return Array.from(notes.values()).map((note) => ({ ...note }));
	}
};
FWorksheet.extend(FWorksheetNoteMixin);

//#endregion
export { FRangeSheetsNoteMixin, FSheetsNoteEventNameMixin, FUniverSheetsNoteMixin, FWorksheetNoteMixin };