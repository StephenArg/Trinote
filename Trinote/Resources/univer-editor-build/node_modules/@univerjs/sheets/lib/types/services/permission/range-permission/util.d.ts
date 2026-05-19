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
import { UnitAction } from '@univerjs/protocol';
import { RangeProtectionPermissionDeleteProtectionPoint } from '../permission-point/range/delete-protection';
import { RangeProtectionPermissionEditPoint } from '../permission-point/range/edit';
import { RangeProtectionPermissionViewPoint } from '../permission-point/range/view';
export type IRangePermissionPoint = RangeProtectionPermissionEditPoint | RangeProtectionPermissionViewPoint;
export declare const getAllRangePermissionPoint: () => (typeof RangeProtectionPermissionDeleteProtectionPoint)[];
export declare const baseProtectionActions: UnitAction[];
export declare const getDefaultRangePermission: (unitId?: string, subUnitId?: string, permissionId?: string) => Record<UnitAction, boolean>;
