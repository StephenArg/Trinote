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
import type { ITable, Nullable } from '@univerjs/core';
import type { IDocumentSkeletonPage, IDocumentSkeletonTable, IParagraphList, ISectionBreakConfig } from '../../../../basics';
import type { DataStreamTreeNode } from '../../view-model/data-stream-tree-node';
import type { DocumentViewModel } from '../../view-model/document-view-model';
import type { ILayoutContext } from '../tools';
export declare function createTableSkeleton(ctx: ILayoutContext, curPage: IDocumentSkeletonPage, viewModel: DocumentViewModel, tableNode: DataStreamTreeNode, sectionBreakConfig: ISectionBreakConfig): Nullable<IDocumentSkeletonTable>;
export declare function rollbackListCache(listLevel: Map<string, IParagraphList[][]>, table: DataStreamTreeNode): void;
export interface ISlicedTableSkeletonParams {
    skeTables: IDocumentSkeletonTable[];
    fromCurrentPage: boolean;
}
export declare function createTableSkeletons(ctx: ILayoutContext, curPage: IDocumentSkeletonPage, viewModel: DocumentViewModel, tableNode: DataStreamTreeNode, sectionBreakConfig: ISectionBreakConfig, availableHeight: number): ISlicedTableSkeletonParams;
export declare function getNullTableSkeleton(st: number, ed: number, table: ITable): IDocumentSkeletonTable;
export declare function getTableSliceId(tableId: string, sliceIndex: number): string;
export declare function getTableIdAndSliceIndex(tableSliceId: string): {
    tableId: string;
    sliceIndex: number;
};
