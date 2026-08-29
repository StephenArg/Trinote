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
import type { IConditionFormattingRule } from '../models/type';
export declare const SHEET_CONDITIONAL_FORMATTING_PLUGIN = "SHEET_CONDITIONAL_FORMATTING_PLUGIN";
export declare enum CFTextOperator {
    beginsWith = "beginsWith",
    endsWith = "endsWith",
    containsText = "containsText",
    notContainsText = "notContainsText",
    equal = "equal",
    notEqual = "notEqual",
    containsBlanks = "containsBlanks",
    notContainsBlanks = "notContainsBlanks",
    containsErrors = "containsErrors",
    notContainsErrors = "notContainsErrors"
}
export declare enum CFTimePeriodOperator {
    today = "today",
    yesterday = "yesterday",
    tomorrow = "tomorrow",
    last7Days = "last7Days",
    thisMonth = "thisMonth",
    lastMonth = "lastMonth",
    nextMonth = "nextMonth",
    thisWeek = "thisWeek",
    lastWeek = "lastWeek",
    nextWeek = "nextWeek"
}
export declare enum CFNumberOperator {
    greaterThan = "greaterThan",
    greaterThanOrEqual = "greaterThanOrEqual",
    lessThan = "lessThan",
    lessThanOrEqual = "lessThanOrEqual",
    notBetween = "notBetween",
    between = "between",
    equal = "equal",
    notEqual = "notEqual"
}
export declare enum CFRuleType {
    highlightCell = "highlightCell",
    dataBar = "dataBar",
    colorScale = "colorScale",
    iconSet = "iconSet"
}
export declare enum CFSubRuleType {
    uniqueValues = "uniqueValues",
    duplicateValues = "duplicateValues",
    rank = "rank",
    text = "text",
    timePeriod = "timePeriod",
    number = "number",
    average = "average",
    formula = "formula"
}
export declare enum CFValueType {
    num = "num",
    min = "min",
    max = "max",
    percent = "percent",
    percentile = "percentile",
    formula = "formula"
}
export declare const DEFAULT_BG_COLOR = "#fff";
export declare const DEFAULT_FONT_COLOR = "#000000";
export declare const createDefaultRule: () => IConditionFormattingRule;
export declare const createDefaultValue: (subType: CFSubRuleType, operator: CFTextOperator | CFNumberOperator | CFTimePeriodOperator) => 10 | "" | [number, number];
export declare const createDefaultValueByValueType: (type: CFValueType, defaultValue?: number) => number | "" | "=";
