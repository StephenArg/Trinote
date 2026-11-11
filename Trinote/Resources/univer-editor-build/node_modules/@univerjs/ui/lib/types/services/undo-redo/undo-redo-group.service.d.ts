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
import { IUndoRedoService } from '@univerjs/core';
export declare class UndoRedoGroupService {
    private readonly _undoRedoService;
    private readonly _sessions;
    constructor(_undoRedoService: Pick<IUndoRedoService, 'beginUndoRedoGroup'>);
    run<T>(unitId: string, action: () => T, mode?: 'replace' | 'append'): T;
    createRunner(unitId: string, mode?: 'replace' | 'append'): <T>(action: () => T) => T;
    runTimed<T>(unitId: string, scope: string, action: () => T, mode?: 'replace' | 'append'): T;
    private _run;
}
