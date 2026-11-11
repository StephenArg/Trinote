import { IImageIoService } from "@univerjs/core";
import { UniverDocsDrawingPlugin } from "@univerjs/docs-drawing";
import { UniverDrawingPlugin } from "@univerjs/drawing";
import { UniverDrawingUIPlugin } from "@univerjs/drawing-ui";
import { UniverSheetsDrawingPlugin } from "@univerjs/sheets-drawing";
import { UniverSheetsDrawingUIPlugin } from "@univerjs/sheets-drawing-ui";
import "@univerjs/sheets-drawing/facade";
import "@univerjs/sheets-drawing-ui/facade";

export * from "@univerjs/docs-drawing"

export * from "@univerjs/drawing"

export * from "@univerjs/drawing-ui"

export * from "@univerjs/sheets-drawing"

export * from "@univerjs/sheets-drawing-ui"

//#region src/preset.ts
function UniverSheetsDrawingPreset(config = {}) {
	const { collaboration = false, allowImageSize } = config;
	return { plugins: [
		[UniverDrawingPlugin, {
			override: collaboration ? [[IImageIoService, null]] : [],
			allowImageSize
		}],
		UniverDocsDrawingPlugin,
		UniverDrawingUIPlugin,
		UniverSheetsDrawingPlugin,
		UniverSheetsDrawingUIPlugin
	].filter((v) => !!v) };
}

//#endregion
export { UniverSheetsDrawingPreset };