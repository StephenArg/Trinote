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
import type { DocumentDataModel } from '@univerjs/core';
import type { IDocumentSkeletonPage, IDocumentSkeletonRow, IDocumentSkeletonTable, IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { Disposable, ICommandService, IUniverInstanceService, LifecycleService } from '@univerjs/core';
import { DocSkeletonManagerService } from '@univerjs/docs';
import { IEditorService } from '@univerjs/docs-ui';
import { IDrawingManagerService } from '@univerjs/drawing';
import { DocRefreshDrawingsService } from '../../services/doc-refresh-drawings.service';
export declare function getDocsTableCellDrawingOffset(unitId: string, table: IDocumentSkeletonTable, row: IDocumentSkeletonRow, cell: IDocumentSkeletonPage): {
    left: number;
    top: number;
};
export declare class DocDrawingTransformUpdateController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _docSkeletonManagerService;
    private readonly _commandService;
    private readonly _editorService;
    private readonly _drawingManagerService;
    private readonly _docRefreshDrawingsService;
    private _univerInstanceService;
    private _lifecycleService;
    private _liquid;
    constructor(_context: IRenderContext<DocumentDataModel>, _docSkeletonManagerService: DocSkeletonManagerService, _commandService: ICommandService, _editorService: IEditorService, _drawingManagerService: IDrawingManagerService, _docRefreshDrawingsService: DocRefreshDrawingsService, _univerInstanceService: IUniverInstanceService, _lifecycleService: LifecycleService);
    private _initialize;
    private _initialRenderRefresh;
    private _commandExecutedListener;
    private _initResize;
    private _refreshDrawing;
    private _handleMultiDrawingsTransform;
    private _calculateDrawingPosition;
    private _calculateTableCellDrawingPositions;
    private _drawingInitializeListener;
}
