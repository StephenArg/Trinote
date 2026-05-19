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
import type { UnitAction } from '@univerjs/protocol';
import { IPermissionService } from '@univerjs/core';
import { RangeProtectionRuleModel } from './range-protection-rule.model';
export type ICellPermission = Record<UnitAction, boolean> & {
    ruleId?: string;
    ranges?: IRange[];
};
export declare class RangeProtectionRenderModel {
    private _selectionProtectionRuleModel;
    private _permissionService;
    private _cache;
    constructor(_selectionProtectionRuleModel: RangeProtectionRuleModel, _permissionService: IPermissionService);
    private _init;
    private _createKey;
    getCellInfo(unitId: string, subUnitId: string, row: number, col: number): ICellPermission[];
    clear(): void;
}
