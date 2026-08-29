/**
 * Copyright 2023-present DreamNum Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { IRangeThemeStyleJSON } from '@univerjs/sheets';
import { BorderStyleTypes } from '@univerjs/core';
export interface ITableDefaultThemeStyle {
    name: string;
    style: Omit<IRangeThemeStyleJSON, 'name'>;
}
export declare const tableDefaultBorderStyle: {
    s: BorderStyleTypes;
    cl: {
        rgb: string;
    };
};
export declare const SHEETS_TABLE_PLUGIN_CONFIG_KEY = "sheets-table.config";
export declare const configSymbol: unique symbol;
export interface IUniverSheetsTableConfig {
    userThemes?: ITableDefaultThemeStyle[];
    defaultThemeIndex?: number;
}
export declare const defaultPluginConfig: IUniverSheetsTableConfig;
