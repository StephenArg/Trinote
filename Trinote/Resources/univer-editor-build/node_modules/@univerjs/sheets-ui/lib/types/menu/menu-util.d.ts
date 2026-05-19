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
import type { IAccessor, IPermissionTypes, Workbook, WorkbookPermissionPointConstructor, Worksheet } from '@univerjs/core';
import type { Observable } from 'rxjs';
import { IUniverInstanceService } from '@univerjs/core';
interface IActive {
    workbook: Workbook;
    worksheet: Worksheet;
}
export declare function deriveStateFromActiveSheet$<T>(univerInstanceService: IUniverInstanceService, defaultValue: T, callback: (active: IActive) => Observable<T>): Observable<T>;
/**
 * @description Get the current exclusive range disable status
 * @param accessor The accessor
 * @param {Set<string>} [disableGroupSet] The disable group set, if provided, check if the interestGroupIds contains any of the disableGroupSet, otherwise check if the interestGroupIds is not empty
 * @returns {Observable<boolean>} The current exclusive range disable status
 */
export declare function getCurrentExclusiveRangeInterest$(accessor: IAccessor, disableGroupSet?: Set<string>): Observable<boolean>;
/**
 * Get the observable combine with exclusive range
 * @param accessor The accessor
 * @param {Observable<boolean>} observable$
 * @param {Set<string>} [disableGroupSet] The disable group set, if provided, check if the interestGroupIds contains any of the disableGroupSet, otherwise check if the interestGroupIds is not empty
 * @returns {Observable<boolean>} The observable combine with exclusive range
 */
export declare function getObservableWithExclusiveRange$(accessor: IAccessor, observable$: Observable<boolean>, disableGroupSet?: Set<string>): Observable<boolean>;
export declare function getCurrentRangeDisable$(accessor: IAccessor, permissionTypes?: IPermissionTypes, supportCellEdit?: boolean): Observable<boolean>;
export declare function getBaseRangeMenuHidden$(accessor: IAccessor): Observable<boolean>;
export declare function getInsertAfterMenuHidden$(accessor: IAccessor, type: 'row' | 'col'): Observable<boolean>;
export declare function getInsertBeforeMenuHidden$(accessor: IAccessor, type: 'row' | 'col'): Observable<boolean>;
export declare function getDeleteMenuHidden$(accessor: IAccessor, type: 'row' | 'col'): Observable<boolean>;
export declare function getCellMenuHidden$(accessor: IAccessor, type: 'row' | 'col'): Observable<boolean>;
export declare function getWorkbookPermissionDisable$(accessor: IAccessor, workbookPermissionTypes: WorkbookPermissionPointConstructor[]): Observable<boolean>;
export {};
