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
import type { Worksheet } from '@univerjs/core';
import type { RenderManagerService } from '@univerjs/engine-render';
import type { ISetWorksheetColWidthMutationParams } from '@univerjs/sheets';
import type { ISetWorksheetColIsAutoWidthCommandParams } from '../commands/commands/set-worksheet-auto-col-width.command';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
export declare const createAutoColWidthUndoMutationsByRedos: (params: ISetWorksheetColWidthMutationParams, worksheet: Worksheet) => ISetWorksheetColWidthMutationParams;
export declare class AutoWidthController extends Disposable {
    private readonly _renderManagerService;
    private readonly _univerInstanceService;
    constructor(_renderManagerService: RenderManagerService, _univerInstanceService: IUniverInstanceService);
    getUndoRedoParamsOfColWidth(params: Required<ISetWorksheetColIsAutoWidthCommandParams>): {
        undos: {
            id: string;
            params: ISetWorksheetColWidthMutationParams;
        }[];
        redos: {
            id: string;
            params: ISetWorksheetColWidthMutationParams;
        }[];
    };
}
