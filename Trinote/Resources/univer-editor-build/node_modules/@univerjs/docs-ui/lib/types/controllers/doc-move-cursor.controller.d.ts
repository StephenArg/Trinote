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
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { DocSelectionManagerService } from '@univerjs/docs';
import { IRenderManagerService } from '@univerjs/engine-render';
export declare class DocMoveCursorController extends Disposable {
    private readonly _univerInstanceService;
    private readonly _renderManagerService;
    private readonly _textSelectionManagerService;
    private readonly _commandService;
    private _onInputSubscription;
    constructor(_univerInstanceService: IUniverInstanceService, _renderManagerService: IRenderManagerService, _textSelectionManagerService: DocSelectionManagerService, _commandService: ICommandService);
    dispose(): void;
    private _commandExecutedListener;
    private _handleShiftMoveSelection;
    private _handleMoveCursor;
    private _getTopOrBottomPosition;
    private _getGlyphLeftOffsetInLine;
    private _matchPositionByLeftOffset;
    private _getNextOrPrevLine;
    private _scrollToFocusNodePosition;
    private _getDocObject;
}
