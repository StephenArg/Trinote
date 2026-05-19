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
import type { BBox } from 'rbush';
import type { IUnitRange } from '../sheets/typedef';
import RBush from 'rbush';
type StringOrNumber = string | number;
export interface IRTreeItem extends IUnitRange {
    id: StringOrNumber;
}
interface IRBushItem extends BBox {
    id: StringOrNumber;
}
export interface IRTreeData {
    [unitId: string]: {
        [subUnitId: string]: IRTreeItem[];
    };
}
export declare class RTree {
    private _enableOneCellCache;
    private _tree;
    private _oneCellCache;
    private _kdTree;
    constructor(_enableOneCellCache?: boolean);
    dispose(): void;
    getTree(unitId: string, subUnitId: string): RBush<IRBushItem>;
    private _getOneCellCache;
    private _removeOneCellCache;
    private _removeCellCacheByRange;
    private _insertOneCellCache;
    private _getRdTreeItems;
    private _searchByOneCellCache;
    /**
     * Open the kd-tree search state.
     * The kd-tree is used to search for data in a single cell.
     */
    openKdTree(): void;
    closeKdTree(): void;
    insert(item: IRTreeItem): void;
    bulkInsert(items: IRTreeItem[]): void;
    searchGenerator(search: IUnitRange): IterableIterator<StringOrNumber>;
    bulkSearch(searchList: IUnitRange[], exceptTreeIds?: Set<number>): Set<StringOrNumber>;
    removeById(unitId: string, subUnitId?: string): void;
    private _removeRTreeItem;
    remove(search: IRTreeItem): void;
    bulkRemove(searchList: IRTreeItem[]): void;
    clear(): void;
    toJSON(): IRTreeData;
    fromJSON(data: IRTreeData): void;
}
export { type BBox, RBush };
