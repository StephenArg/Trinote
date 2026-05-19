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
/**
 * This controller is responsible for changing the active worksheet when
 * worksheet tab related mutations executes. We cannot write this logic in
 * commands because it does not take collaborative editing into consideration.
 */
export declare class ActiveWorksheetController extends Disposable {
    private readonly _commandService;
    private readonly _univerInstanceService;
    private _previousSheetIndex;
    constructor(_commandService: ICommandService, _univerInstanceService: IUniverInstanceService);
    private _adjustActiveSheetOnHideSheet;
    private _beforeAdjustActiveSheetOnRemoveSheet;
    private _adjustActiveSheetOnRemoveSheet;
    private _adjustActiveSheetOnInsertSheet;
    private _adjustActiveSheetOnShowSheet;
    private _adjustActiveSheetOnSelection;
    private _switchToNextSheet;
}
