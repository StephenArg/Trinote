import type { MenuConfig } from '@univerjs/ui';
export declare const SHEETS_OUTLINE_UI_PLUGIN_CONFIG_KEY = "sheets-outline-ui.config";
export declare const configSymbol: unique symbol;
export interface IUniverSheetsOutlineUIConfig {
    menu?: MenuConfig;
}
export declare const defaultPluginConfig: IUniverSheetsOutlineUIConfig;
