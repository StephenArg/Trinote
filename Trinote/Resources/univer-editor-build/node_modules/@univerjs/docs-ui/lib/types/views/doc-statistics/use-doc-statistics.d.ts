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
import type { IDocumentStatistics, ITextRangeParam } from '@univerjs/core';
import type { DocumentSkeleton } from '@univerjs/engine-render';
interface IDocLayoutStatistics {
    pages: number;
    lines: number;
}
export interface IDocStatisticsViewState {
    document: IDocumentStatistics & IDocLayoutStatistics;
    selection: (IDocumentStatistics & IDocLayoutStatistics) | null;
    loading: boolean;
    showPages: boolean;
}
export declare function getDocLayoutStatistics(skeleton: DocumentSkeleton | null, ranges?: Readonly<ITextRangeParam>[], calculatePages?: boolean): IDocLayoutStatistics;
export declare function useDocStatistics(calculateLayout?: boolean): IDocStatisticsViewState;
export {};
