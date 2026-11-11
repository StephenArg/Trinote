Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_sheets_sort = require("@univerjs/sheets-sort");
let _univerjs_sheets_sort_ui = require("@univerjs/sheets-sort-ui");
require("@univerjs/sheets-sort/facade");

//#region src/preset.ts
function UniverSheetsSortPreset() {
	return { plugins: [_univerjs_sheets_sort.UniverSheetsSortPlugin, _univerjs_sheets_sort_ui.UniverSheetsSortUIPlugin].filter((v) => !!v) };
}

//#endregion
exports.UniverSheetsSortPreset = UniverSheetsSortPreset;
Object.keys(_univerjs_sheets_sort).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_sort[k]; }
  });
});

Object.keys(_univerjs_sheets_sort_ui).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_sort_ui[k]; }
  });
});
