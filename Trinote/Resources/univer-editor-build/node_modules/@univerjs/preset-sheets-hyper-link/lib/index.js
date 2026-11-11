import { UniverSheetsHyperLinkPlugin } from "@univerjs/sheets-hyper-link";
import { UniverSheetsHyperLinkUIPlugin } from "@univerjs/sheets-hyper-link-ui";
import "@univerjs/sheets-hyper-link/facade";
import "@univerjs/sheets-hyper-link-ui/facade";

export * from "@univerjs/sheets-hyper-link"

export * from "@univerjs/sheets-hyper-link-ui"

//#region src/preset.ts
function UniverSheetsHyperLinkPreset(config = {}) {
	const { urlHandler } = config;
	return { plugins: [UniverSheetsHyperLinkPlugin, [UniverSheetsHyperLinkUIPlugin, { urlHandler }]].filter((v) => !!v) };
}

//#endregion
export { UniverSheetsHyperLinkPreset };