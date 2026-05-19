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
import { ILocalStorageService } from '@univerjs/core';
type HabitValue = string | number;
interface IUserHabitController {
    addHabit(habit: string, initValue: HabitValue[]): Promise<void>;
    markHabit(habit: string, value: HabitValue): void;
    deleteHabit(habit: string): void;
    getHabit(habit: string, sortList?: HabitValue[]): Promise<HabitValue[]>;
}
export declare const UserHabitCurrencyContext: import("react").Context<string[]>;
export declare class UserHabitController implements IUserHabitController {
    private _localStorageService;
    constructor(_localStorageService: ILocalStorageService);
    private _getKey;
    addHabit<T = unknown[]>(habit: string, initValue: T): Promise<void>;
    markHabit(habit: string, value: HabitValue): void;
    getHabit(habit: string, sortList: HabitValue[]): Promise<HabitValue[]>;
    deleteHabit(habit: string): void;
}
export {};
