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
import type { IDataValidationRule, Nullable } from '@univerjs/core';
import type { IOtherFormulaResult } from '@univerjs/engine-formula';
import { Disposable, Injector } from '@univerjs/core';
import { DataValidationModel } from '@univerjs/data-validation';
export interface IListCacheItem {
    list: string[];
    listWithColor: Array<{
        label: string;
        color: string;
    }>;
    colorMap: Record<string, string>;
    set: Set<string>;
}
/**
 * Service for caching data validation list results.
 * Cache is invalidated when formula results change (through markRuleDirty).
 */
export declare class DataValidationListCacheService extends Disposable {
    private readonly _injector;
    private readonly _dataValidationModel;
    private _cache;
    constructor(_injector: Injector, _dataValidationModel: DataValidationModel);
    private _initRuleChangeListener;
    /**
     * Get cached list data or compute and cache it if not exists.
     */
    getOrCompute(unitId: string, subUnitId: string, rule: IDataValidationRule): IListCacheItem;
    private _ensureCache;
    /**
     * Get cached list data for a rule. Returns undefined if not cached.
     */
    getCache(unitId: string, subUnitId: string, ruleId: string): IListCacheItem | undefined;
    /**
     * Set cache for a rule.
     */
    setCache(unitId: string, subUnitId: string, ruleId: string, item: IListCacheItem): void;
    /**
     * Mark a rule's cache as dirty (invalidate it).
     * Called when formula results change.
     */
    markRuleDirty(unitId: string, subUnitId: string, ruleId: string): void;
    /**
     * Clear all caches.
     */
    clear(): void;
    /**
     * Compute list data from formula result and cache it.
     */
    computeAndCache(unitId: string, subUnitId: string, rule: IDataValidationRule, formulaResult: Nullable<Nullable<IOtherFormulaResult>[]>): IListCacheItem;
    /**
     * Extract string list from formula result cells.
     */
    private _getRuleFormulaResultSet;
}
