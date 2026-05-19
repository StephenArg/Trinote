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
import type { BaseValueObject } from '../../../engine/value-object/base-value-object';
import { BaseFunction } from '../../base-function';
export declare class Sumproduct extends BaseFunction {
    minParams: number;
    maxParams: number;
    calculate(array1: BaseValueObject, ...variants: BaseValueObject[]): BaseValueObject;
    /**
     * Validate all variants:
     * - propagate first error BaseValueObject
     * - ensure array dimensions are compatible with base (rowCount/columnCount)
     * Returns an ErrorValueObject / BaseValueObject on failure, or null when OK.
     */
    private _validateVariants;
    /**
     * Core SUMPRODUCT loop.
     * - baseArray already contains numeric values from array1
     * - variants may be scalar or array; non-number cells are treated as 0
     * - any error cell short-circuits with that error
     */
    private _sumProduct;
    /**
     * Get the value object of a variant at (r, c).
     * - For scalar variants, returns the variant itself.
     * - For array variants, returns the cell at (r, c).
     *   If cell does not exist, returns null and let caller convert to #VALUE!.
     */
    private _getVariantCell;
    private _initArray1;
    private _getResultArrayByArray1;
}
