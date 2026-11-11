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
import type { DocumentDataModel, IDocumentBody, JSONXActions } from '@univerjs/core';
export interface IDocumentPermissionRange {
    startOffset: number;
    endOffset: number;
}
export declare function getDocumentDrawingSegmentId(documentDataModel: DocumentDataModel, drawingId: string): string;
export declare function getDocumentEditTargetObjectIds(documentDataModel: DocumentDataModel, segmentId: string, range: IDocumentPermissionRange): string[];
export declare function getDocumentEditTargetObjectIdsFromActions(documentDataModel: DocumentDataModel, segmentId: string, actions: JSONXActions): string[];
export declare function getDocumentEntityParentPermissionObjectIds(documentDataModel: DocumentDataModel, segmentId: string, entityType: string, entityId: string): string[];
export declare function getDocumentParagraphParentPermissionObjectIds(documentDataModel: DocumentDataModel, segmentId: string, paragraphId: string): string[];
export declare function getDocumentSectionPermissionObjectIdsByIds(sectionIds: Iterable<string>): string[];
export declare function getDocumentSectionIdsAtOffset(body: IDocumentBody, offset: number): string[];
