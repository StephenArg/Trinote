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
import { ISuperTableService } from '@univerjs/engine-formula';
import { IDescriptionService } from '../services/description.service';
/**
 * header highlight
 * column menu: show, hover and mousedown event
 */
export declare class SuperTableController extends Disposable {
    private readonly _descriptionService;
    private readonly _univerInstanceService;
    private readonly _commandService;
    private readonly _superTableService;
    private _preUnitId;
    constructor(_descriptionService: IDescriptionService, _univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _superTableService: ISuperTableService);
    private _initialize;
    private _descriptionListener;
    private _changeUnitListener;
    private _changeSheetListener;
    private _registerDescription;
    private _unregisterDescription;
    private _unRegisterDescriptions;
    private _getUnitIdAndSheetId;
    private _registerDescriptions;
    private _unregisterDescriptionsForNotInSheetId;
}
