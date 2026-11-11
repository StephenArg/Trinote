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
import type { ITextRun } from '@univerjs/core';
import type { ISequenceNode } from './engine/utils/sequence';
import type { IDescriptionService, ISearchItemWithType } from './services/formula/description.service';
import { FunctionType } from './basics/function';
import { sequenceNodeType } from './engine/utils/sequence';
export type FormulaSequenceNode = string | ISequenceNode;
export interface IFormulaHighlightColors {
    formulaRefColors: string[];
    numberColor: string;
    stringColor: string;
    plainTextColor: string;
}
export interface IFormulaRefSelection {
    refIndex: number;
    themeColor: string;
    token: string;
    nodeType: sequenceNodeType;
    startIndex: number;
    endIndex: number;
    index: number;
}
export interface IFormulaStructuredReferenceRange {
    token: string;
    startIndex: number;
    endIndex: number;
}
export type FormulaReferenceEditingMode = 'add' | 'replace' | 'none';
export interface IFormulaReferenceEditingContext {
    mode: FormulaReferenceEditingMode;
    nodeIndex: number;
    referenceIndex: number;
    offset: number;
}
export declare function getFormulaReplaceResult(nodes: FormulaSequenceNode[], index: number, formulaName: string, functionType: FunctionType): {
    text: string;
    offset: number;
} | undefined;
export declare function searchFormulaFunctions(descriptionService: IDescriptionService, token: string, limit?: number): ISearchItemWithType[];
export declare function findFormulaStructuredReferences(formulaText: string): IFormulaStructuredReferenceRange[];
export declare function getFormulaSequenceNodeIndex(sequenceNodes: FormulaSequenceNode[], offset: number, isEqual?: boolean): number;
export declare function getFormulaReferenceIndex(sequenceNodes: FormulaSequenceNode[], nodeIndex: number): number;
export declare function getFormulaSequenceCharacterAtOffset(sequenceNodes: Array<string | {
    token: string;
}>, offset: number): string | undefined;
export declare function isFormulaReferenceAddingContext(sequenceNodes: Array<string | {
    token: string;
}>, offset: number): boolean;
export declare function isFormulaReferenceAddingTextContext(formulaText: string, offset: number): boolean;
export declare function resolveFormulaReferenceEditingContext(options: {
    formulaText: string;
    sequenceNodes: FormulaSequenceNode[];
    offset: number;
    selectionStart?: number;
    selectionEnd?: number;
}): IFormulaReferenceEditingContext;
export declare function getFormulaHighlightDataStream(leadingCharacter: string, sequenceNodes: FormulaSequenceNode[], sourceText?: string): string;
export declare function buildFormulaTextRuns(descriptionService: IDescriptionService, colors: IFormulaHighlightColors, sequenceNodes: FormulaSequenceNode[], options?: {
    includeTableReferences?: boolean;
}): {
    textRuns: ITextRun[];
    refSelections: IFormulaRefSelection[];
};
