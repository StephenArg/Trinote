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
import { numfmt, Rectangle, Tools } from '@univerjs/core';
/**
 * @ignore
 */
export declare class FUtil {
    /**
     * @ignore
     */
    static _instance: FUtil | null;
    static get(): FUtil;
    /**
     * @ignore
     */
    static extend(source: any): void;
    /**
     * Rectangle utils, including range operations likes merge, subtract, split
     *
     * @example
     * ```ts
     * const ranges = [
     *   { startRow: 0, startColumn: 0, endRow: 1, endColumn: 1 },
     *   { startRow: 1, startColumn: 1, endRow: 2, endColumn: 2 }
     * ];
     * const merged = univerAPI.Util.rectangle.mergeRanges(ranges);
     * console.log(merged);
     * ```
     */
    get rectangle(): typeof Rectangle;
    /**
     * Number format utils, including parse and strigify about date, price, etc
     *
     * @example
     * ```ts
     * const text = univerAPI.Util.numfmt.format('#,##0.00', 1234.567);
     * console.log(text);
     * ```
     */
    get numfmt(): typeof numfmt;
    /**
     * common tools
     *
     * @example
     * ```ts
     * const key = univerAPI.Util.tools.generateRandomId(6);
     * console.log(key);
     * ```
     */
    get tools(): typeof Tools;
}
