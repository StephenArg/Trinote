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
import type { IDocumentData } from '@univerjs/core';
export declare function measureDocumentNoWrapTextRangeWidth(documentData: IDocumentData, start: number, end: number): number;
/**
 * Measures the widest no-wrap line using the same text-width policy that docs
 * layout relies on for lightweight shape/text-box autofit flows.
 *
 * This is intentionally not a full document layout replacement: callers that
 * need line breaking, pagination, floating objects, or final line metrics should
 * use `DocumentSkeleton`. This helper exists for consumers that must size a
 * no-wrap host before committing a full layout pass. Keep docs-specific glyph
 * width adjustments here so feature packages do not duplicate paragraph shaping
 * details such as CJK-Latin spacing.
 */
export declare function measureDocumentNoWrapTextWidth(documentData: IDocumentData | null | undefined): number;
/**
 * Measures the widest line after applying the docs Unicode break policy
 * within a fixed-width host.
 */
export declare function measureDocumentWrappedTextWidth(documentData: IDocumentData | null | undefined, maxLineWidth: number): number;
/**
 * Measures the widest segment that docs line breaking keeps together. This is
 * useful when a host may wrap normally but still needs enough width to avoid
 * clipping an individual word, CJK glyph, or punctuation segment.
 */
export declare function measureDocumentUnbreakableTextWidth(documentData: IDocumentData | null | undefined): number;
