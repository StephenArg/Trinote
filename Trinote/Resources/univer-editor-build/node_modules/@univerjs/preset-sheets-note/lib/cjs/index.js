Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_sheets_note = require("@univerjs/sheets-note");
let _univerjs_sheets_note_ui = require("@univerjs/sheets-note-ui");
require("@univerjs/sheets-note/facade");

//#region src/preset.ts
function UniverSheetsNotePreset() {
	return { plugins: [_univerjs_sheets_note.UniverSheetsNotePlugin, _univerjs_sheets_note_ui.UniverSheetsNoteUIPlugin].filter((v) => !!v) };
}

//#endregion
exports.UniverSheetsNotePreset = UniverSheetsNotePreset;
Object.keys(_univerjs_sheets_note).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_note[k]; }
  });
});

Object.keys(_univerjs_sheets_note_ui).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_note_ui[k]; }
  });
});
