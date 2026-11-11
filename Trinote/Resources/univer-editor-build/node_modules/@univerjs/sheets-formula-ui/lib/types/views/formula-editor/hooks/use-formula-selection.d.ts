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
import type { IAccessor } from '@univerjs/core';
import type { Editor } from '@univerjs/docs-ui';
export declare function resolveFormulaSelectionDataStream(accssor: IAccessor, editor?: Pick<Editor, 'getDocumentDataModel'>, editorId?: string): {
    dataStream: string;
    offset: number;
} | undefined;
export declare enum FormulaSelectingType {
    NOT_SELECT = 0,
    NEED_ADD = 1,
    CAN_EDIT = 2,
    EDIT_OTHER_SHEET_REFERENCE = 3,
    EDIT_OTHER_WORKBOOK_REFERENCE = 4
}
export declare function shouldSkipReferenceEditingByPointer(isDisabledByPointer: boolean, disableOnClick?: boolean): boolean;
export declare function resolveFormulaSelectionWorkbook<TWorkbook>(currentWorkbook: TWorkbook | null | undefined, fallbackWorkbook: TWorkbook | null | undefined): TWorkbook | undefined;
export declare function resolveFormulaSelectionCursorIndex(activeRange: {
    collapsed?: boolean;
    startOffset?: number;
} | undefined, dataStream: string): number;
export declare function getSelectionAfterLaggingFormulaInput(dataStream: string, selection: {
    collapsed?: boolean;
    startOffset?: number;
    endOffset?: number;
} | undefined, content: string): {
    startOffset: number;
    endOffset: number;
    collapsed: true;
} | undefined;
export declare function resolveFormulaSelectingIntent(adding: boolean, editing: boolean): FormulaSelectingType;
export declare function shouldAddFormulaReference(dataStream: string, index: number): boolean;
export declare function useFormulaSelecting(opts: {
    editor?: Editor;
    editorId: string;
    isFocus: boolean;
    disableOnClick?: boolean;
    resetSignal?: number;
    unitId: string;
    subUnitId: string;
}): {
    isSelecting: FormulaSelectingType;
    isSelectingRef: import("react").RefObject<FormulaSelectingType>;
};
