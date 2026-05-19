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
import type { ICommand } from '@univerjs/core';
import type { IRangeProtectionRule } from '@univerjs/sheets';
export interface IAddRangeProtectionParams {
    permissionId: string;
    rule: IRangeProtectionRule;
}
export type ISetRangeProtectionParams = IAddRangeProtectionParams;
export interface IDeleteRangeProtectionParams {
    unitId: string;
    subUnitId: string;
    rule: IRangeProtectionRule;
}
export declare const AddRangeProtectionFromToolbarCommand: ICommand;
export declare const AddRangeProtectionFromContextMenuCommand: ICommand;
export declare const ViewSheetPermissionFromContextMenuCommand: ICommand;
export declare const AddRangeProtectionFromSheetBarCommand: ICommand;
export declare const ViewSheetPermissionFromSheetBarCommand: ICommand;
export declare const DeleteRangeProtectionFromContextMenuCommand: ICommand;
export declare const SetRangeProtectionFromContextMenuCommand: ICommand;
