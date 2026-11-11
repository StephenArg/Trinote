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
import type { IPreset } from '@univerjs/presets';
import type { IUniverRPCMainThreadConfig } from '@univerjs/rpc';
import type { IUniverSheetsNumfmtConfig } from '@univerjs/sheets-numfmt';
import type { IUniverSheetsUIConfig } from '@univerjs/sheets-ui';
import type { IUniverUIConfig } from '@univerjs/ui';
import type { IUniverDocsPresetConfig, IUniverFormulaConfig, IUniverSheetsPresetConfig } from './types';
import '@univerjs/network/facade';
import '@univerjs/sheets/facade';
import '@univerjs/ui/facade';
import '@univerjs/docs-ui/facade';
import '@univerjs/sheets-ui/facade';
import '@univerjs/engine-formula/facade';
import '@univerjs/sheets-formula/facade';
import '@univerjs/sheets-numfmt/facade';
import '@univerjs/sheets-formula-ui/facade';
export type * from '@univerjs/docs-ui/facade';
export type * from '@univerjs/engine-formula/facade';
export type * from '@univerjs/network/facade';
export type * from '@univerjs/sheets-formula-ui/facade';
export type * from '@univerjs/sheets-formula/facade';
export type * from '@univerjs/sheets-numfmt/facade';
export type * from '@univerjs/sheets-ui/facade';
export type * from '@univerjs/sheets/facade';
export type * from '@univerjs/ui/facade';
export interface IUniverSheetsCorePresetConfig extends Pick<IUniverUIConfig, 'container' | 'header' | 'toolbar' | 'ribbonType' | 'menu' | 'contextMenu' | 'disableAutoFocus' | 'customFontFamily'>, Pick<IUniverSheetsUIConfig, 'formulaBar' | 'footer'>, IUniverSheetsNumfmtConfig {
    /**
     * The docs related configuration.
     */
    docs?: IUniverDocsPresetConfig;
    /**
     * The sheets related configuration.
     */
    sheets?: IUniverSheetsPresetConfig;
    /**
     * The formula related configuration.
     */
    formula?: IUniverFormulaConfig;
    /**
     * The URL of the worker script.
     */
    workerURL: IUniverRPCMainThreadConfig['workerURL'];
}
/**
 * This presets helps you to create a Univer sheet with open sourced features.
 */
export declare function UniverSheetsCorePreset(config?: Partial<IUniverSheetsCorePresetConfig>): IPreset;
