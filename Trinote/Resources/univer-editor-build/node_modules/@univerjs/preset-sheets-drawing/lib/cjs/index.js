Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_core = require("@univerjs/core");
let _univerjs_docs_drawing = require("@univerjs/docs-drawing");
let _univerjs_drawing = require("@univerjs/drawing");
let _univerjs_drawing_ui = require("@univerjs/drawing-ui");
let _univerjs_sheets_drawing = require("@univerjs/sheets-drawing");
let _univerjs_sheets_drawing_ui = require("@univerjs/sheets-drawing-ui");
require("@univerjs/sheets-drawing/facade");
require("@univerjs/sheets-drawing-ui/facade");

//#region src/preset.ts
function UniverSheetsDrawingPreset(config = {}) {
	const { collaboration = false, allowImageSize } = config;
	return { plugins: [
		[_univerjs_drawing.UniverDrawingPlugin, {
			override: collaboration ? [[_univerjs_core.IImageIoService, null]] : [],
			allowImageSize
		}],
		_univerjs_docs_drawing.UniverDocsDrawingPlugin,
		_univerjs_drawing_ui.UniverDrawingUIPlugin,
		_univerjs_sheets_drawing.UniverSheetsDrawingPlugin,
		_univerjs_sheets_drawing_ui.UniverSheetsDrawingUIPlugin
	].filter((v) => !!v) };
}

//#endregion
exports.UniverSheetsDrawingPreset = UniverSheetsDrawingPreset;
Object.keys(_univerjs_docs_drawing).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_docs_drawing[k]; }
  });
});

Object.keys(_univerjs_drawing).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_drawing[k]; }
  });
});

Object.keys(_univerjs_drawing_ui).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_drawing_ui[k]; }
  });
});

Object.keys(_univerjs_sheets_drawing).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_drawing[k]; }
  });
});

Object.keys(_univerjs_sheets_drawing_ui).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_sheets_drawing_ui[k]; }
  });
});
