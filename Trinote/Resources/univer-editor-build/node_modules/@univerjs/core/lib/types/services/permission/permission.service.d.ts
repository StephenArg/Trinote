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
import type { Observable } from 'rxjs';
import type { IPermissionPoint, IPermissionService } from './type';
import { BehaviorSubject } from 'rxjs';
import { Disposable } from '../../shared';
export declare class PermissionService extends Disposable implements IPermissionService {
    private _permissionPointMap;
    private _permissionPointUpdate$;
    permissionPointUpdate$: Observable<IPermissionPoint<unknown>>;
    private _showComponents;
    setShowComponents(showComponents: boolean): void;
    getShowComponents(): boolean;
    deletePermissionPoint(permissionId: string): void;
    addPermissionPoint<T = boolean>(_item: IPermissionPoint<T> | BehaviorSubject<IPermissionPoint<T>>): boolean;
    updatePermissionPoint<T = boolean>(permissionId: string, value: T): void;
    clearPermissionMap(): void;
    getPermissionPoint<T = boolean>(permissionId: string): IPermissionPoint<T> | undefined;
    getPermissionPoint$<T = boolean>(permissionId: string): Observable<IPermissionPoint<T>> | undefined;
    composePermission$(permissionIdList: string[]): Observable<IPermissionPoint<any>[]>;
    composePermission(permissionIdList: string[]): IPermissionPoint<any>[];
    getAllPermissionPoint(): Map<string, BehaviorSubject<IPermissionPoint<unknown>>>;
}
