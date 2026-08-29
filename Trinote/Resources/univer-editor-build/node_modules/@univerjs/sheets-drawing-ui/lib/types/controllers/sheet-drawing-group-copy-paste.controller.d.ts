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
import type { IDrawingGroupNestedParam, IMutationInfo } from '@univerjs/core';
import { Disposable } from '@univerjs/core';
import { IDrawingManagerService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetSkeletonService } from '@univerjs/sheets';
import { ISheetDrawingService } from '@univerjs/sheets-drawing';
import { ISheetClipboardService } from '@univerjs/sheets-ui';
export interface IGroupFeaturePasteHookParams {
    /** Unit ID of the copy source */
    fromUnitId: string;
    /** Sub-unit ID of the copy source */
    fromSubUnitId: string;
    /** Unit ID of the paste destination */
    toUnitId: string;
    /** Sub-unit ID of the paste destination */
    toSubUnitId: string;
    /** Maps original drawingId → new (cloned) drawingId */
    idMap: Map<string, string>;
    /** The fully cloned group param with remapped IDs */
    cloned: IDrawingGroupNestedParam;
}
export type GroupFeaturePasteHook = (params: IGroupFeaturePasteHookParams) => {
    redos: IMutationInfo[];
    undos: IMutationInfo[];
};
export declare class SheetsDrawingGroupCopyPasteController extends Disposable {
    private readonly _sheetClipboardService;
    private readonly _renderManagerService;
    private readonly _sheetSkeletonService;
    private readonly _sheetDrawingService;
    private readonly _drawingManagerService;
    private readonly _featurePasteHooks;
    private _copyInfo;
    constructor(_sheetClipboardService: ISheetClipboardService, _renderManagerService: IRenderManagerService, _sheetSkeletonService: SheetSkeletonService, _sheetDrawingService: ISheetDrawingService, _drawingManagerService: IDrawingManagerService);
    private get _focusedDrawings();
    private _initCopyPaste;
    registerFeaturePasteHook(hook: GroupFeaturePasteHook): void;
    private _getGroupFeaturePasteMutations;
    private _generateGroupPasteMutations;
    dispose(): void;
}
