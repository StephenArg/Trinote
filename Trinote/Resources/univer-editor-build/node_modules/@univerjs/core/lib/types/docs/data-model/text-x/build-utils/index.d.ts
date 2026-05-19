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
import { addCustomDecorationTextX, deleteCustomDecorationTextX } from './custom-decoration';
import { copyCustomRange, getCustomRangesInterestsWithSelection, isIntersecting } from './custom-range';
import { getParagraphsInRange, getParagraphsInRanges, isSegmentIntersects, makeSelection, normalizeSelection, transformParagraphs } from './selection';
import { addCustomRangeTextX, deleteCustomRangeTextX, deleteSelectionTextX, retainSelectionTextX } from './text-x-utils';
export declare class BuildTextUtils {
    static customRange: {
        add: typeof addCustomRangeTextX;
        delete: typeof deleteCustomRangeTextX;
        copyCustomRange: typeof copyCustomRange;
        getCustomRangesInterestsWithSelection: typeof getCustomRangesInterestsWithSelection;
        isIntersecting: typeof isIntersecting;
    };
    static customDecoration: {
        add: typeof addCustomDecorationTextX;
        delete: typeof deleteCustomDecorationTextX;
    };
    static selection: {
        replace: (params: import("./text-x-utils").IReplaceSelectionTextXParams) => false | import("../text-x").TextX;
        makeSelection: typeof makeSelection;
        normalizeSelection: typeof normalizeSelection;
        delete: typeof deleteSelectionTextX;
        replaceTextRuns: (params: import("./text-x-utils").IReplaceSelectionTextRunsParams) => false | import("../text-x").TextX;
        retain: typeof retainSelectionTextX;
    };
    static range: {
        isIntersects: typeof isSegmentIntersects;
        getParagraphsInRange: typeof getParagraphsInRange;
        getParagraphsInRanges: typeof getParagraphsInRanges;
    };
    static transform: {
        getPlainText: (dataStream: string) => string;
        fromPlainText: (text: string) => import("../../../..").IDocumentBody;
        isEmptyDocument: (dataStream?: string) => boolean;
    };
    static paragraph: {
        bullet: {
            set: (params: import("./paragraph").ISetParagraphBulletParams) => false | import("../text-x").TextX;
            switch: (params: import("./paragraph").ISwitchParagraphBulletParams) => import("../text-x").TextX;
            toggleChecklist: (params: import("./paragraph").IToggleChecklistParagraphParams) => false | import("../text-x").TextX;
            changeNestLevel: (params: import("./paragraph").IChangeParagraphBulletNestLevelParams) => import("../text-x").TextX;
        };
        style: {
            set: (params: import("./paragraph").ISetParagraphStyleParams) => import("../text-x").TextX;
        };
        util: {
            transform: typeof transformParagraphs;
            getParagraphsInRange: typeof getParagraphsInRange;
            getParagraphsInRanges: typeof getParagraphsInRanges;
        };
    };
    static drawing: {
        add: (param: import("./drawings").IAddDrawingParam) => false | import("ot-json1").JSONOp;
    };
}
export type { IAddCustomRangeTextXParam, IDeleteCustomRangeParam, IReplaceSelectionTextXParams } from './text-x-utils';
