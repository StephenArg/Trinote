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
import type { IUniverInstanceService, Workbook } from '@univerjs/core';
import type { IDefinedNamesService, IDefinedNamesServiceParam, IFunctionService, ISuperTableService, LexerTreeBuilder } from '@univerjs/engine-formula';
import type { ISelectionWithStyle } from '@univerjs/sheets';
export declare enum DefinedNameBoxActionType {
    Noop = "noop",
    FocusDefinedName = "focusDefinedName",
    FocusSelection = "focusSelection",
    CreateDefinedName = "createDefinedName",
    Reset = "reset"
}
interface IResolveDefinedNameBoxActionParams {
    inputValue: string;
    rangeString: string;
    unitId: string;
    formulaOrRefString: string;
    univerInstanceService: IUniverInstanceService;
    definedNamesService: IDefinedNamesService;
    superTableService: ISuperTableService;
    functionService: IFunctionService;
}
type DefinedNameBoxAction = {
    type: DefinedNameBoxActionType.Noop;
} | {
    type: DefinedNameBoxActionType.FocusDefinedName;
    definedName: IDefinedNamesServiceParam;
} | {
    type: DefinedNameBoxActionType.FocusSelection;
    refString: string;
} | {
    type: DefinedNameBoxActionType.CreateDefinedName;
    name: string;
} | {
    type: DefinedNameBoxActionType.Reset;
};
export declare function resolveDefinedNameBoxAction(params: IResolveDefinedNameBoxActionParams): DefinedNameBoxAction;
export declare function getAbsoluteRefStringFromSelection(workbook: Workbook, selections: readonly ISelectionWithStyle[] | undefined, lexerTreeBuilder: LexerTreeBuilder): string;
export {};
