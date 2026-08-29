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
import type { DocumentDataModel, ICustomBlock, ICustomTable, IDocumentBlockRange } from '@univerjs/core';
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import type { IMutiPageParagraphBound, ITableBound } from './doc-event-manager.service';
import { Disposable } from '@univerjs/core';
import { DocSelectionManagerService, DocSkeletonManagerService } from '@univerjs/docs';
import { DocEventManagerService } from './doc-event-manager.service';
import { DocCanvasPopManagerService } from './doc-popup-manager.service';
import { DocFloatMenuService } from './float-menu.service';
export type DocBlockMenuTargetKind = 'paragraph' | 'blockRange' | 'table' | 'customBlock';
export interface IDocBlockMenuTarget {
    kind: DocBlockMenuTargetKind;
    key: string;
    paragraph?: IMutiPageParagraphBound;
    blockRange?: IDocumentBlockRange;
    table?: ICustomTable;
    customBlock?: ICustomBlock;
    icon?: string;
    cellRange?: {
        startOffset: number;
        endOffset: number;
    };
    menuRange: {
        startOffset: number;
        endOffset: number;
        collapsed: boolean;
    };
    moveRange: {
        startOffset: number;
        endOffset: number;
    };
    emptyMode: boolean;
    draggable: boolean;
}
export interface IDocBlockDropTarget {
    targetOffset: number;
    rect: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
}
export declare class DocParagraphMenuService extends Disposable implements IRenderModule {
    private _context;
    private _docSelectionManagerService;
    private _docEventManagerService;
    private _docPopupManagerService;
    private _docSkeletonManagerService;
    private _floatMenuService;
    private _paragrahMenu;
    private readonly _activeTarget$;
    readonly activeTarget$: import("rxjs").Observable<IDocBlockMenuTarget | null>;
    private _isBlockMenuDragging;
    get activeParagraph(): IMutiPageParagraphBound | undefined;
    get activeTarget(): IDocBlockMenuTarget | null;
    setBlockMenuDragging(isDragging: boolean): void;
    get isBlockMenuDragging(): boolean;
    constructor(_context: IRenderContext<DocumentDataModel>, _docSelectionManagerService: DocSelectionManagerService, _docEventManagerService: DocEventManagerService, _docPopupManagerService: DocCanvasPopManagerService, _docSkeletonManagerService: DocSkeletonManagerService, _floatMenuService: DocFloatMenuService);
    private _isCursorInActiveParagraph;
    setParagraphMenuActive(active: boolean): void;
    private _init;
    showParagraphMenu(paragraph: IMutiPageParagraphBound): void;
    showTableMenu(tableBound: ITableBound): void;
    getDropTargetFromClientPoint(clientX: number, clientY: number, sourceRange: {
        startOffset: number;
        endOffset: number;
    }): IDocBlockDropTarget | null;
    hideParagraphMenu(force?: boolean): void;
    private _buildParagraphMenuTarget;
    private _getBodyBlockTargets;
    private _getCellBlockTargets;
}
