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
import type { IMutationInfo, Nullable } from '@univerjs/core';
interface ILine {
    start: number;
    end: number;
}
export declare function lineIntersect(line1: ILine, line2: ILine): boolean;
export declare function lineContains(line1: ILine, line2: ILine): boolean;
export declare function objectsShaker<T>(target: Nullable<T>[], isEqual: (o1: T, o2: T) => boolean): T[];
export declare function mergeSetFilterCriteria(mutations: IMutationInfo[]): IMutationInfo<object>[];
export {};
