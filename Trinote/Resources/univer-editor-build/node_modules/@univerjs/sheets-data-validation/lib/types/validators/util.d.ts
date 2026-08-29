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
import type { ICellData, ISheetDataValidationRule, IUnitRangeName, IUniverInstanceService, Nullable } from '@univerjs/core';
import type { LexerTreeBuilder } from '@univerjs/engine-formula';
import type { ISheetLocationBase } from '@univerjs/sheets';
export declare function getSheetRangeValueSet(grid: IUnitRangeName, univerInstanceService: IUniverInstanceService, currUnitId: string, currSubUnitId: string): string[];
export declare function getDataValidationCellValue(cellData: Nullable<ICellData>): string;
export declare function getTransformedFormula(lexerTreeBuilder: LexerTreeBuilder, rule: ISheetDataValidationRule, position: ISheetLocationBase): {
    transformedFormula1: string | undefined;
    transformedFormula2: string | undefined;
};
