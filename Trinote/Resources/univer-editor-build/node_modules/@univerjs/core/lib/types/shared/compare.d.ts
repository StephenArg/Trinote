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
import type { ITextRun } from '../types/interfaces/i-document-data';
interface IAnyObject {
    [key: number | string]: IAnyObject | IAnyObject[] | Array<[number | string]> | any;
}
export declare function deepCompare(arg1: IAnyObject, arg2: IAnyObject): boolean;
export declare function isSameStyleTextRun(tr1: ITextRun, tr2: ITextRun): boolean;
export declare function checkForSubstrings(searchString: string, substrings: string[]): boolean;
export {};
