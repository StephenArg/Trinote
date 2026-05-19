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
import type { IDocumentSkeletonGlyph } from '../../../../../basics/i-document-skeleton-cached';
import type { ISectionBreakConfig } from '../../../../../basics/interfaces';
import type { DataStreamTreeNode } from '../../../view-model/data-stream-tree-node';
import type { DocumentViewModel } from '../../../view-model/document-view-model';
import type { ILayoutContext } from '../../tools';
import { BreakPointType } from '../../line-breaker/break';
export interface IShapedText {
    text: string;
    glyphs: IDocumentSkeletonGlyph[];
    breakPointType: BreakPointType;
}
export declare function shaping(ctx: ILayoutContext, content: string, viewModel: DocumentViewModel, paragraphNode: DataStreamTreeNode, sectionBreakConfig: ISectionBreakConfig, useOpenType?: boolean): IShapedText[];
