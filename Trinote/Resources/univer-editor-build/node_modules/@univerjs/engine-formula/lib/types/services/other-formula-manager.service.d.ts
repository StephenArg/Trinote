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
import type { Nullable } from '@univerjs/core';
import type { IDirtyUnitOtherFormulaMap, IOtherFormulaData, IOtherFormulaDataItem } from '../basics/common';
import { Disposable } from '@univerjs/core';
export interface IOtherFormulaManagerSearchParam {
    unitId: string;
    subUnitId: string;
    formulaId: string;
}
export interface IOtherFormulaManagerInsertParam extends IOtherFormulaManagerSearchParam {
    item: IOtherFormulaDataItem;
}
export interface IOtherFormulaManagerService {
    dispose(): void;
    remove(searchParam: IOtherFormulaManagerSearchParam): void;
    get(searchParam: IOtherFormulaManagerSearchParam): Nullable<IOtherFormulaDataItem>;
    has(searchParam: IOtherFormulaManagerSearchParam): boolean;
    register(insertParam: IOtherFormulaManagerInsertParam): void;
    getOtherFormulaData(): IOtherFormulaData;
    batchRegister(formulaData: IOtherFormulaData): void;
    batchRemove(formulaData: IDirtyUnitOtherFormulaMap): void;
}
/**
 * Passively marked as dirty, register the reference and execution actions of the feature plugin.
 * After execution, a dirty area and calculated data will be returned,
 * causing the formula to be marked dirty again,
 * thereby completing the calculation of the entire dependency tree.
 */
export declare class OtherFormulaManagerService extends Disposable implements IOtherFormulaManagerService {
    private _otherFormulaData;
    dispose(): void;
    remove(searchParam: IOtherFormulaManagerSearchParam): void;
    get(searchParam: IOtherFormulaManagerSearchParam): IOtherFormulaDataItem | undefined;
    has(searchParam: IOtherFormulaManagerSearchParam): boolean;
    register(insertParam: IOtherFormulaManagerInsertParam): void;
    batchRegister(formulaData: IOtherFormulaData): void;
    batchRemove(formulaData: IDirtyUnitOtherFormulaMap): void;
    getOtherFormulaData(): IOtherFormulaData;
}
export declare const IOtherFormulaManagerService: import("@wendellhu/redi").IdentifierDecorator<IOtherFormulaManagerService>;
