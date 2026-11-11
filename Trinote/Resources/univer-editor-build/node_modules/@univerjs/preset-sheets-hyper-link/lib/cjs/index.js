Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_sheets_hyper_link = require("@univerjs/sheets-hyper-link");
let _univerjs_sheets_hyper_link_ui = require("@univerjs/sheets-hyper-link-ui");
require("@univerjs/sheets-hyper-link/facade");
require("@univerjs/sheets-hyper-link-ui/facade");

//#region src/preset.ts
function UniverSheetsHyperLinkPreset(config = {}) {
	const { urlHandler } = config;
	return { plugins: [_univerjs_sheets_hyper_link.UniverSheetsHyperLinkPlugin, [_univerjs_sheets_hyper_link_ui.UniverSheetsHyperLinkUIPlugin, { urlHandler }]].filter((v) => !!v) };
}

//#endregion
exports.UniverSheetsHyperLinkPreset = UniverSheetsHyperLinkPreset;
Object.keys(_univerjs_sheets_hyper_link).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_hyper_link[k]; }
  });
});

Object.keys(_univerjs_sheets_hyper_link_ui).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_hyper_link_ui[k]; }
  });
});
