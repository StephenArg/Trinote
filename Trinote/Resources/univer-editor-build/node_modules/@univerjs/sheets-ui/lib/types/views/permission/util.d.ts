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
import type { Injector, IRange, Worksheet } from '@univerjs/core';
import type { IPermissionPanelRule } from '../../services/permission/sheet-permission-panel.model';
import { EditStateEnum, UnitObject, ViewStateEnum } from '@univerjs/sheets';
export declare const checkRangeValid: (injector: Injector, permissionRanges: IRange[], permissionId: string, unitId: string, subUnitId: string) => string | undefined;
export declare const checkRangesIsWholeSheet: (ranges: IRange[], sheet: Worksheet) => boolean;
export declare const generateDefaultRule: (injector: Injector, fromSheetBar: boolean) => {
    unitId: string;
    subUnitId: string;
    permissionId: string;
    unitType: UnitObject.Worksheet | UnitObject.SelectRange;
    description: string;
    id: string;
    ranges: IRange[];
    editState: EditStateEnum;
    viewState: ViewStateEnum;
};
export declare const generateRuleByUnitType: (injector: Injector, rule: IPermissionPanelRule) => IPermissionPanelRule;
