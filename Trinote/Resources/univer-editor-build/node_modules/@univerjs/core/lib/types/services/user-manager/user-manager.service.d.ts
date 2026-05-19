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
import { Disposable } from '../../shared/lifecycle';
export interface IUser {
    userID: string;
    name: string;
    avatar?: string;
}
export declare class UserManagerService extends Disposable {
    private _model;
    private _userChange$;
    userChange$: import("rxjs").Observable<{
        type: "add" | "delete";
        user: IUser;
    } | {
        type: "clear";
    }>;
    private _currentUser$;
    /**
     * When the current user undergoes a switch or change
     * @memberof UserManagerService
     */
    currentUser$: import("rxjs").Observable<IUser>;
    dispose(): void;
    getCurrentUser<T extends IUser>(): T;
    setCurrentUser<T extends IUser>(user: T): void;
    addUser<T extends IUser>(user: T): void;
    getUser<T extends IUser>(userId: string, callBack?: () => void): T | undefined;
    delete(userId: string): void;
    clear(): void;
    list(): IUser[];
}
