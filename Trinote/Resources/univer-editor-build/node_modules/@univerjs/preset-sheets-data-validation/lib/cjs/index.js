Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_data_validation = require("@univerjs/data-validation");
let _univerjs_sheets_data_validation = require("@univerjs/sheets-data-validation");
let _univerjs_sheets_data_validation_ui = require("@univerjs/sheets-data-validation-ui");
require("@univerjs/sheets-data-validation/facade");

//#region src/preset.ts
function UniverSheetsDataValidationPreset(config = {}) {
	const { showEditOnDropdown, showSearchOnDropdown } = config;
	return { plugins: [
		_univerjs_data_validation.UniverDataValidationPlugin,
		_univerjs_sheets_data_validation.UniverSheetsDataValidationPlugin,
		[_univerjs_sheets_data_validation_ui.UniverSheetsDataValidationUIPlugin, {
			showEditOnDropdown,
			showSearchOnDropdown
		}]
	].filter((v) => !!v) };
}

//#endregion
exports.UniverSheetsDataValidationPreset = UniverSheetsDataValidationPreset;
Object.keys(_univerjs_data_validation).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_data_validation[k]; }
  });
});

Object.keys(_univerjs_sheets_data_validation).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_data_validation[k]; }
  });
});

Object.keys(_univerjs_sheets_data_validation_ui).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_data_validation_ui[k]; }
  });
});
