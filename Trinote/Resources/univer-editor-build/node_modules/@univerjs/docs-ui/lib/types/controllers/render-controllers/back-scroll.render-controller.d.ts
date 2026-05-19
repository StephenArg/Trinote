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
import type { DocumentDataModel, ITextRange, Nullable } from '@univerjs/core';
import type { INodePosition, IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { RxDisposable } from '@univerjs/core';
import { DocSelectionManagerService, DocSkeletonManagerService } from '@univerjs/docs';
import { IEditorService } from '../../services/editor/editor-manager.service';
export declare class DocBackScrollRenderController extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _textSelectionManagerService;
    private readonly _editorService;
    private readonly _docSkeletonManagerService;
    constructor(_context: IRenderContext<DocumentDataModel>, _textSelectionManagerService: DocSelectionManagerService, _editorService: IEditorService, _docSkeletonManagerService: DocSkeletonManagerService);
    private _init;
    scrollToRange(range: ITextRange): void;
    scrollToNode(startNodePosition: Nullable<INodePosition>): void;
    private _scrollToSelection;
}
