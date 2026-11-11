Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_find_replace = require("@univerjs/find-replace");
let _univerjs_sheets_find_replace = require("@univerjs/sheets-find-replace");
require("@univerjs/sheets-find-replace/facade");

//#region src/preset.ts
function UniverSheetsFindReplacePreset(_config = {}) {
	return { plugins: [[_univerjs_find_replace.UniverFindReplacePlugin], [_univerjs_sheets_find_replace.UniverSheetsFindReplacePlugin]].filter((v) => !!v) };
}

//#endregion
exports.UniverSheetsFindReplacePreset = UniverSheetsFindReplacePreset;
Object.keys(_univerjs_find_replace).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_find_replace[k]; }
  });
});

Object.keys(_univerjs_sheets_find_replace).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_find_replace[k]; }
  });
});
