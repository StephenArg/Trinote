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
import type { IParagraph, ISectionBreak } from '@univerjs/core';
import { SpacingRule } from '@univerjs/core';
export declare const useCurrentParagraph: () => import("@univerjs/core").IParagraphRange[];
export declare const useCurrentSections: (currentParagraphs: IParagraph[]) => ISectionBreak[];
export declare const useFirstParagraphHorizontalAlign: (paragraph: IParagraph[], defaultValue: string) => readonly [string, (v: string) => Promise<boolean>];
export declare const useFirstParagraphIndentStart: (paragraph: IParagraph[]) => readonly [number, (v: number) => Promise<boolean>];
export declare const useFirstParagraphIndentEnd: (paragraph: IParagraph[]) => readonly [number, (v: number) => Promise<boolean>];
export declare const useFirstParagraphIndentFirstLine: (paragraph: IParagraph[]) => readonly [number, (v: number) => Promise<boolean>];
export declare const useFirstParagraphIndentHanging: (paragraph: IParagraph[]) => readonly [number, (v: number) => Promise<boolean>];
export declare const useFirstParagraphIndentSpaceAbove: (paragraph: IParagraph[]) => readonly [number, (v: number) => Promise<boolean>];
export declare const useFirstParagraphSpaceBelow: (paragraph: IParagraph[]) => readonly [number, (v: number) => Promise<boolean>];
export declare const useFirstParagraphLineSpacing: (paragraph: IParagraph[]) => {
    lineSpacing: readonly [number, (v: number) => Promise<void>];
    spacingRule: readonly [SpacingRule, (v: SpacingRule) => Promise<void>];
};
