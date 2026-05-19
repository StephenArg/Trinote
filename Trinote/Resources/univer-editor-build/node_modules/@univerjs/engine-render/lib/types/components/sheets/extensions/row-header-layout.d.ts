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
import type { IARowCfg, IARowCfgObj, IHeaderStyleCfg, IRowStyleCfg } from '../interfaces';
import type { SpreadsheetSkeleton } from '../sheet.render-skeleton';
import { SheetExtension } from './sheet-extension';
export interface IRowsHeaderCfgParam {
    headerStyle?: Partial<IRowStyleCfg>;
    rowsCfg?: Record<number, IARowCfg>;
}
export declare class RowHeaderLayout extends SheetExtension {
    uKey: string;
    Z_INDEX: number;
    rowsCfg: Record<number, IARowCfg>;
    headerStyle: Partial<IRowStyleCfg>;
    rowsCfgOfWorksheet: Map<string, Record<number, IARowCfg>>;
    headerStyleOfWorksheet: Map<string, Partial<IRowStyleCfg>>;
    constructor(cfg?: IRowsHeaderCfgParam);
    configHeaderRow(cfg: IRowsHeaderCfgParam, sheetId?: string): void;
    getRowsCfg(sheetId: string): Record<number, IARowCfg>;
    getHeaderStyle(sheetId: string): IRowStyleCfg;
    getCfgOfCurrentRow(rowsCfg: Record<number, IARowCfg>, headerStyle: IHeaderStyleCfg, rowIndex: number): [IARowCfgObj, boolean];
    setStyleToCtx(ctx: UniverRenderingContext, rowStyle: Partial<IHeaderStyleCfg>): void;
    draw(ctx: UniverRenderingContext, parentScale: IScale, spreadsheetSkeleton: SpreadsheetSkeleton): void;
}
