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
import type { IAccessor } from '@univerjs/core';
export declare function getAddPermissionHidden$(accessor: IAccessor): import("rxjs").Observable<boolean>;
export declare function getEditPermissionHidden$(accessor: IAccessor): import("rxjs").Observable<boolean>;
export declare function getPermissionDisableBase$(accessor: IAccessor): import("rxjs").Observable<boolean>;
export declare function getAddPermissionDisableBase$(accessor: IAccessor): import("rxjs").Observable<boolean>;
export declare function getAddPermissionFromSheetBarDisable$(accessor: IAccessor): import("rxjs").Observable<boolean>;
export declare function getRemovePermissionFromSheetBarDisable$(accessor: IAccessor): import("rxjs").Observable<boolean>;
export declare function getSetPermissionFromSheetBarDisable$(accessor: IAccessor): import("rxjs").Observable<boolean>;
export declare function getRemovePermissionDisable$(accessor: IAccessor): import("rxjs").Observable<boolean>;
export declare function getViewPermissionDisable$(accessor: IAccessor): import("rxjs").Observable<boolean>;
