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
import type { IAccessor, IDocumentBody, IMutationInfo, Nullable } from '@univerjs/core';
import type { IDiscreteRange } from '@univerjs/sheets';
import type { ICellDataWithSpanInfo, ICopyPastePayload, ISheetDiscreteRangeLocation } from '../../services/clipboard/type';
import { ObjectMatrix } from '@univerjs/core';
/**
 *
 * @param pasteFrom
 * @param pasteTo
 * @param data
 * @param payload
 * @param accessor
 */
export declare function getDefaultOnPasteCellMutations(pasteFrom: ISheetDiscreteRangeLocation, pasteTo: ISheetDiscreteRangeLocation, data: ObjectMatrix<ICellDataWithSpanInfo>, payload: ICopyPastePayload, accessor: IAccessor): {
    undos: IMutationInfo<object>[];
    redos: IMutationInfo<object>[];
};
/**
 *
 * @param from
 * @param from.unitId
 * @param from.subUnitId
 * @param from.range
 * @param to
 * @param to.unitId
 * @param to.subUnitId
 * @param to.range
 * @param accessor
 */
export declare function getMoveRangeMutations(from: {
    unitId: string;
    subUnitId: string;
    range?: IDiscreteRange;
}, to: {
    unitId: string;
    subUnitId: string;
    range?: IDiscreteRange;
}, accessor: IAccessor): {
    undos: (IMutationInfo<object> | {
        id: string;
        params: import("@univerjs/sheets").IMoveRangeMutationParams;
    })[];
    redos: (IMutationInfo<object> | {
        id: string;
        params: import("@univerjs/sheets").IMoveRangeMutationParams;
    })[];
};
/**
 *
 * @param pasteTo
 * @param pasteFrom
 * @param matrix
 * @param accessor
 */
export declare function getSetCellValueMutations(pasteTo: ISheetDiscreteRangeLocation, pasteFrom: Nullable<ISheetDiscreteRangeLocation>, matrix: ObjectMatrix<ICellDataWithSpanInfo>, accessor: IAccessor): {
    undos: IMutationInfo<object>[];
    redos: IMutationInfo<object>[];
};
/**
 *
 * @param pasteTo
 * @param pasteFrom
 * @param matrix
 * @param accessor
 * @param _withRichFormat
 */
export declare function getSetCellStyleMutations(pasteTo: ISheetDiscreteRangeLocation, pasteFrom: Nullable<ISheetDiscreteRangeLocation>, matrix: ObjectMatrix<ICellDataWithSpanInfo>, accessor: IAccessor, _withRichFormat?: boolean): {
    undos: IMutationInfo<object>[];
    redos: IMutationInfo<object>[];
};
/**
 *
 * @param pasteTo
 * @param matrix
 * @param accessor
 */
export declare function getClearCellStyleMutations(pasteTo: ISheetDiscreteRangeLocation, matrix: ObjectMatrix<ICellDataWithSpanInfo>, accessor: IAccessor): {
    undos: IMutationInfo<object>[];
    redos: IMutationInfo<object>[];
};
/**
 *
 * @param pasteTo
 * @param matrix
 * @param accessor
 */
export declare function getClearCellValueMutations(pasteTo: ISheetDiscreteRangeLocation, matrix: ObjectMatrix<ICellDataWithSpanInfo>, accessor: IAccessor): {
    undos: IMutationInfo<object>[];
    redos: IMutationInfo<object>[];
};
/**
 *
 * @param pasteTo
 * @param matrix
 * @param accessor
 */
export declare function getClearAndSetMergeMutations(pasteTo: ISheetDiscreteRangeLocation, matrix: ObjectMatrix<ICellDataWithSpanInfo>, accessor: IAccessor): {
    redos: IMutationInfo<object>[];
    undos: IMutationInfo<object>[];
};
/**
 *
 * @param text
 */
export declare function generateBody(text: string): IDocumentBody;
