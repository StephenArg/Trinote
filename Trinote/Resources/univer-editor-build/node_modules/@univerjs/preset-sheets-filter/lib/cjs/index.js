Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_sheets_filter = require("@univerjs/sheets-filter");
let _univerjs_sheets_filter_ui = require("@univerjs/sheets-filter-ui");
require("@univerjs/sheets-filter/facade");

//#region src/preset.ts
function UniverSheetsFilterPreset(config = {}) {
	const { enableSyncSwitch } = config;
	return { plugins: [[_univerjs_sheets_filter.UniverSheetsFilterPlugin, { enableSyncSwitch }], _univerjs_sheets_filter_ui.UniverSheetsFilterUIPlugin].filter((v) => !!v) };
}

//#endregion
exports.UniverSheetsFilterPreset = UniverSheetsFilterPreset;
Object.keys(_univerjs_sheets_filter).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_filter[k]; }
  });
});

Object.keys(_univerjs_sheets_filter_ui).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_filter_ui[k]; }
  });
});
