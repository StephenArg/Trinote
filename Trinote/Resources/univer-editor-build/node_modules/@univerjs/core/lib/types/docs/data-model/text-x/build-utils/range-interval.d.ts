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
import type { ICustomBlock, ICustomColumnGroup, ICustomRange, ICustomTable, IDocumentBlockRange } from '../../../../types/interfaces/i-document-data';
/**
 * A canonical half-open interval used by document editing algorithms.
 * `startOffset` is included and `endOffset` is excluded.
 */
export interface IDocOperationalInterval {
    startOffset: number;
    endOffset: number;
}
type IInclusiveDocumentRange = Pick<IDocumentBlockRange, 'startIndex' | 'endIndex'>;
type IExclusiveDocumentRange = Pick<ICustomTable, 'startIndex' | 'endIndex'>;
/** Converts persisted inclusive indexes `[startIndex, endIndex]` to `[startOffset, endOffset)`. */
export declare function getInclusiveRangeInterval(range: IInclusiveDocumentRange): IDocOperationalInterval;
/** Converts persisted half-open indexes `[startIndex, endIndex)` to the operational representation. */
export declare function getExclusiveRangeInterval(range: IExclusiveDocumentRange): IDocOperationalInterval;
/** A table stores an exclusive end immediately after `TABLE_END`. */
export declare function getTableRangeInterval(table: Pick<ICustomTable, 'startIndex' | 'endIndex'>): IDocOperationalInterval;
/** A document block stores an inclusive end that points at `BLOCK_END`. */
export declare function getBlockRangeInterval(blockRange: Pick<IDocumentBlockRange, 'startIndex' | 'endIndex'>): IDocOperationalInterval;
/** A column group stores an inclusive end that points at `COLUMN_GROUP_END`. */
export declare function getColumnGroupRangeInterval(columnGroup: Pick<ICustomColumnGroup, 'startIndex' | 'endIndex'>): IDocOperationalInterval;
/** A custom range stores inclusive character indexes. */
export declare function getCustomRangeInterval(customRange: Pick<ICustomRange, 'startIndex' | 'endIndex'>): IDocOperationalInterval;
/** A custom block occupies exactly one `CUSTOM_BLOCK` sentinel. */
export declare function getCustomBlockInterval(customBlock: Pick<ICustomBlock, 'startIndex'>): IDocOperationalInterval;
/** Returns the half-open token interval for a row that starts at `startOffset`. */
export declare function getTableRowTokenInterval(dataStream: string, startOffset: number): IDocOperationalInterval | null;
/** Returns the half-open token interval for a cell that starts at `startOffset`. */
export declare function getTableCellTokenInterval(dataStream: string, startOffset: number): IDocOperationalInterval | null;
/** Tests whether a stream index belongs to a half-open operational interval. */
export declare function containsStreamIndex(interval: IDocOperationalInterval, index: number): boolean;
/**
 * Tests whether an insertion point is strictly inside a container.
 * Boundary insertion affinity must be decided by the caller.
 */
export declare function containsInteriorInsertionOffset(interval: IDocOperationalInterval, offset: number): boolean;
/** Tests whether two half-open operational intervals overlap. */
export declare function intersectsOperationalIntervals(left: IDocOperationalInterval, right: IDocOperationalInterval): boolean;
/** Shifts or expands an inclusive persisted range for an insertion at `offset`. */
export declare function shiftInclusiveRangeOnInsert<T extends {
    startIndex: number;
    endIndex: number;
}>(range: T, offset: number, length: number): T;
/** Shifts or expands a half-open persisted range for an insertion at `offset`. */
export declare function shiftExclusiveRangeOnInsert<T extends {
    startIndex: number;
    endIndex: number;
}>(range: T, offset: number, length: number): T;
/** Transforms an inclusive persisted range after deleting `[offset, offset + length)`. */
export declare function shiftInclusiveRangeOnDelete<T extends {
    startIndex: number;
    endIndex: number;
}>(range: T, offset: number, length: number): T | null;
/** Transforms a half-open persisted range after deleting `[offset, offset + length)`. */
export declare function shiftExclusiveRangeOnDelete<T extends {
    startIndex: number;
    endIndex: number;
}>(range: T, offset: number, length: number): T | null;
export {};
