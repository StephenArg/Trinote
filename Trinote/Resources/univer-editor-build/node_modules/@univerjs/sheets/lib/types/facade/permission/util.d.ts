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
import type { Injector } from '@univerjs/core';
import type { FRange } from '../f-range';
import type { FWorksheet } from '../f-worksheet';
import { ObjectScope } from '@univerjs/protocol';
import { EditStateEnum, ViewStateEnum } from '@univerjs/sheets';
import { FRangeProtectionRule } from './f-range-protection-rule';
export declare function determineViewState(allowViewByOthers?: boolean): ViewStateEnum;
export declare function determineEditState(allowedUsers?: string[]): EditStateEnum;
export declare function determineScope(editState: EditStateEnum, viewState: ViewStateEnum): {
    edit: ObjectScope;
    read: ObjectScope;
};
/**
 * Check if there are no range protection rules for the given unit and subunit when removing a range protection rule.
 * If there are no rules left, also remove the associated worksheet protection and update the permission points accordingly.
 */
export declare function handleWorksheetRangePermissionIsEmpty(injector: Injector, unitId: string, subUnitId: string): void;
/**
 * Get the list of range protection rules for a specific worksheet or range, and convert them to FRangeProtectionRule instances.
 */
export declare function getListRangeProtectionRules(injector: Injector, unitId: string, subUnitId: string, options: {
    worksheet: FWorksheet;
    specificRange?: FRange;
    ignoreCollaborators?: boolean;
}): Promise<FRangeProtectionRule[]>;
