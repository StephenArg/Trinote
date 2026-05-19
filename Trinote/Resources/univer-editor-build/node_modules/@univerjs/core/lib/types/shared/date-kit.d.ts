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
type DateKitCoreUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
export type DateKitUnitType = DateKitCoreUnit | 'milliseconds' | 'ms' | 'seconds' | 's' | 'minutes' | 'm' | 'hours' | 'h' | 'days' | 'd' | 'weeks' | 'w' | 'months' | 'M' | 'years' | 'y';
export type DateKitInput = Date | number | string | IDateKit | null | undefined;
export interface IDateKit {
    isValid(): boolean;
    format(template?: string): string;
    valueOf(): number;
    toDate(): Date;
    add(value: number, unit?: DateKitUnitType): IDateKit;
    subtract(value: number, unit?: DateKitUnitType): IDateKit;
    startOf(unit: DateKitUnitType): IDateKit;
    endOf(unit: DateKitUnitType): IDateKit;
    utc(): IDateKit;
    local(): IDateKit;
    weekday(): number;
    weekday(value: number): IDateKit;
    week(): number;
    week(value: number): IDateKit;
}
export type DateKit = IDateKit;
export type OpUnitType = DateKitUnitType;
interface IDateKitStatic {
    (input?: DateKitInput): IDateKit;
    utc: (input?: DateKitInput) => IDateKit;
    isDateKit: (value: unknown) => value is IDateKit;
    unix: (timestamp: number) => IDateKit;
}
export declare const dateKit: IDateKitStatic;
export {};
