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
import type { IScale } from '@univerjs/core';
import type { UniverRenderingContext } from '../../../context';
import type { IAColumnCfg, IAColumnCfgObj, IHeaderStyleCfg } from '../interfaces';
import type { SpreadsheetSkeleton } from '../sheet.render-skeleton';
import { SheetExtension } from './sheet-extension';
export interface IColumnsHeaderCfgParam {
    headerStyle?: Partial<IHeaderStyleCfg>;
    columnsCfg?: Record<number, IAColumnCfg>;
}
/**
 * Column Header Bar, include a lot of columns header
 */
export declare class ColumnHeaderLayout extends SheetExtension {
    uKey: string;
    Z_INDEX: number;
    columnsCfg: Record<number, IAColumnCfg>;
    headerStyle: Partial<IHeaderStyleCfg>;
    columnsCfgOfWorksheet: Map<string, Record<number, IAColumnCfg>>;
    headerStyleOfWorksheet: Map<string, Partial<IHeaderStyleCfg>>;
    constructor(cfg?: IColumnsHeaderCfgParam);
    configHeaderColumn(cfg: IColumnsHeaderCfgParam, sheetId?: string): void;
    getColumnsCfg(sheetId: string): Record<number, IAColumnCfg>;
    getHeaderStyle(sheetId: string): IHeaderStyleCfg;
    getCfgOfCurrentColumn(columnsCfg: Record<number, IAColumnCfg>, headerStyle: IHeaderStyleCfg, colIndex: number): [IAColumnCfgObj, boolean];
    setStyleToCtx(ctx: UniverRenderingContext, columnStyle: Partial<IHeaderStyleCfg>): void;
    draw(ctx: UniverRenderingContext, parentScale: IScale, spreadsheetSkeleton: SpreadsheetSkeleton): void;
}
