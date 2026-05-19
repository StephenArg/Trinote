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
import type { IRange } from '@univerjs/core';
import type { INumfmtService } from './type';
import { Disposable, ILogService, IResourceManagerService, IUniverInstanceService } from '@univerjs/core';
export declare class NumfmtService extends Disposable implements INumfmtService {
    private _resourceManagerService;
    private _univerInstanceService;
    private _logService;
    constructor(_resourceManagerService: IResourceManagerService, _univerInstanceService: IUniverInstanceService, _logService: ILogService);
    getValue(unitId: string, subUnitId: string, row: number, col: number): {
        pattern: string;
    } | null | undefined;
    deleteValues(unitId: string, subUnitId: string, values: IRange[]): void;
    setValues(unitId: string, subUnitId: string, values: Array<{
        ranges: IRange[];
        pattern: string;
    }>): void;
}
