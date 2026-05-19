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
import type { IAccessor, ICommand, IRange } from '@univerjs/core';
import type { IMoveRangeMutationParams } from '../mutations/move-range.mutation';
export interface IMoveRangeCommandParams {
    toRange: IRange;
    fromRange: IRange;
    fromUnitId?: string;
    fromSubUnitId?: string;
    toUnitId?: string;
    toSubUnitId?: string;
}
export declare const MoveRangeCommandId = "sheet.command.move-range";
interface IGetMoveRangeCommandMutationsOptions {
    includeSelection?: boolean;
    includeAfterCommand?: boolean;
    includeAutoHeight?: boolean;
}
export declare const MoveRangeCommand: ICommand;
export declare function getMoveRangeCommandMutations(accessor: IAccessor, params: IMoveRangeCommandParams, options?: IGetMoveRangeCommandMutationsOptions): {
    unitId: string;
    redos: (import("@univerjs/core").IMutationInfo<object> | {
        id: string;
        params: IMoveRangeMutationParams;
    })[];
    undos: (import("@univerjs/core").IMutationInfo<object> | {
        id: string;
        params: IMoveRangeMutationParams;
    })[];
} | null;
export interface IRangeUnit {
    unitId: string;
    subUnitId: string;
    range: IRange;
}
export declare function getMoveRangeUndoRedoMutations(accessor: IAccessor, from: IRangeUnit, to: IRangeUnit, ignoreMerge?: boolean): {
    redos: {
        id: string;
        params: IMoveRangeMutationParams;
    }[];
    undos: {
        id: string;
        params: IMoveRangeMutationParams;
    }[];
} | null;
export {};
