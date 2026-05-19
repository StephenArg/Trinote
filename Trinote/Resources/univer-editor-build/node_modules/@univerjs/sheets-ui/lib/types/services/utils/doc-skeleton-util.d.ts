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
import type { ICellWithCoord, ICustomRange, Injector, IParagraph } from '@univerjs/core';
import type { DocumentSkeleton, IFontCacheItem } from '@univerjs/engine-render';
export declare const calculateDocSkeletonRects: (docSkeleton: DocumentSkeleton, paddingLeft?: number, paddingTop?: number) => {
    links: {
        rects: {
            top: number;
            bottom: number;
            left: number;
            right: number;
        }[];
        range: ICustomRange<Record<string, any>>;
    }[];
    checkLists: {
        rect: {
            top: number;
            bottom: number;
            left: number;
            right: number;
        };
        segmentId: undefined;
        segmentPageIndex: number;
        paragraph: IParagraph;
    }[];
    drawings: {
        drawingId: string;
        rect: {
            top: number;
            bottom: number;
            left: number;
            right: number;
        };
        drawing: import("@univerjs/engine-render").IDocumentSkeletonDrawing;
    }[];
};
export declare function calcPadding(cell: ICellWithCoord, font: IFontCacheItem, isNum: boolean): {
    paddingLeft: number;
    paddingTop: number;
};
export declare const getCustomRangePosition: (injector: Injector, unitId: string, subUnitId: string, row: number, col: number, rangeId: string) => {
    rects: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }[] | undefined;
    customRange: ICustomRange<Record<string, any>>;
    label: string;
} | null | undefined;
export declare const getEditingCustomRangePosition: (injector: Injector, unitId: string, subUnitId: string, row: number, col: number, rangeId: string) => {
    rects: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }[] | undefined;
    customRange: ICustomRange<Record<string, any>>;
    label: string;
} | null;
