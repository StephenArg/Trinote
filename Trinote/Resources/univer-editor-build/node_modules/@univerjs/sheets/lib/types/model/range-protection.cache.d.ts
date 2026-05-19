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
import { Disposable, IPermissionService, IUniverInstanceService } from '@univerjs/core';
import { UnitAction } from '@univerjs/protocol';
import { RangeProtectionRuleModel } from './range-protection-rule.model';
export declare class RangeProtectionCache extends Disposable {
    private readonly _ruleModel;
    private readonly _permissionService;
    private readonly _univerInstanceService;
    private readonly _cellRuleCache;
    private readonly _permissionIdCache;
    private readonly _cellInfoCache;
    private readonly _rowInfoCache;
    private readonly _colInfoCache;
    constructor(_ruleModel: RangeProtectionRuleModel, _permissionService: IPermissionService, _univerInstanceService: IUniverInstanceService);
    private _initCache;
    private _initUpdateCellInfoCache;
    private _initUpdateCellRuleCache;
    private _ensureRuleMap;
    private _ensureCellInfoMap;
    private _ensureRowColInfoMap;
    private _addCellRuleCache;
    private _deleteCellRuleCache;
    private _getSelectionActions;
    reBuildCache(unitId: string, subUnitId: string): void;
    getRowPermissionInfo(unitId: string, subUnitId: string, row: number, types: UnitAction[]): boolean;
    getColPermissionInfo(unitId: string, subUnitId: string, col: number, types: UnitAction[]): boolean;
    private _initUpdateRowColInfoCache;
    getCellInfo(unitId: string, subUnitId: string, row: number, col: number): (Partial<Record<UnitAction, boolean>> & {
        ruleId?: string;
        ranges?: IRange[];
    }) | {
        ruleId: string;
        ranges: IRange[];
        1: boolean;
        0: boolean;
        2: boolean;
        42: boolean;
    } | undefined;
    deleteUnit(unitId: string): void;
}
