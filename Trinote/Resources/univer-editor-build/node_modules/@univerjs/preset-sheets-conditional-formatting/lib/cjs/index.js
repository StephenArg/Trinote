Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_sheets_conditional_formatting = require("@univerjs/sheets-conditional-formatting");
let _univerjs_sheets_conditional_formatting_ui = require("@univerjs/sheets-conditional-formatting-ui");
require("@univerjs/sheets-conditional-formatting/facade");

//#region src/preset.ts
function UniverSheetsConditionalFormattingPreset() {
	return { plugins: [_univerjs_sheets_conditional_formatting.UniverSheetsConditionalFormattingPlugin, _univerjs_sheets_conditional_formatting_ui.UniverSheetsConditionalFormattingUIPlugin].filter((v) => !!v) };
}

//#endregion
exports.UniverSheetsConditionalFormattingPreset = UniverSheetsConditionalFormattingPreset;
Object.keys(_univerjs_sheets_conditional_formatting).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_conditional_formatting[k]; }
  });
});

Object.keys(_univerjs_sheets_conditional_formatting_ui).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_conditional_formatting_ui[k]; }
  });
});
