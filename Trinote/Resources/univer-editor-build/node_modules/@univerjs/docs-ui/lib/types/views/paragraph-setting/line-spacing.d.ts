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
import type { IDocumentSkeletonLine } from '@univerjs/engine-render';
import type { LocaleKey } from '../../locale/types';
import { SpacingRule } from '@univerjs/core';
interface ILineSpacingMetrics {
    glyphLineHeight: number;
    renderedLineHeight: number;
}
export declare const LINE_SPACING_RULE_OPTIONS: Array<{
    label: LocaleKey;
    value: string;
}>;
export declare function getLineSpacingInputConfig(spacingRule: SpacingRule): {
    readonly min: 1;
    readonly max: 5;
    readonly step: 0.1;
} | {
    readonly min: 1;
    readonly max: 100;
};
export declare function convertStoredLineSpacingToDisplayValue(lineSpacing: number, spacingRule: SpacingRule): number;
export declare function convertDisplayLineSpacingToStoredValue(lineSpacing: number, spacingRule: SpacingRule): number;
export declare function getLineSpacingMetrics(lineNode?: IDocumentSkeletonLine): ILineSpacingMetrics | null;
export declare function convertLineSpacingForRuleChange(currentStoredValue: number, currentRule: SpacingRule, nextRule: SpacingRule, metrics?: ILineSpacingMetrics | null): number;
export {};
