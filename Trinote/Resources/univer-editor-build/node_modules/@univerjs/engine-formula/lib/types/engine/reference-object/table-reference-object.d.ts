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
import type { ISuperTable, IUnitSheetNameMap } from '../../basics/common';
import { TableOptionType } from '../../basics/common';
import { BaseReferenceObject } from './base-reference-object';
/**
 * Table reference object compatible with Excel Structured References
 *
 * Supported (examples):
 * - =Table[Column]                          // Single column (default DATA)
 * - =Table[[ColumnA]:[ColumnB]]             // Column range (default DATA)
 * - =Table[#All] / [#Data] / [#Headers] / [#Totals] / [#This Row]
 * - =Table[[#All],[Column]]                 // Section + column/column range
 * - =Table[[#Data],[ColA]:[ColB]]
 * - =Table[[#This Row],[Column]]
 *
 * Not supported (invalid):
 * - Multiple sections in parallel (e.g., [[#Headers],[#Data]])
 * - Non-existent sections (e.g., #Title)
 * - Column indices instead of column names (e.g., [[1]:[3]])
 */
export declare class TableReferenceObject extends BaseReferenceObject {
    private _tableData;
    /**
     * Structured reference body (with or without outer []):
     *  - "#Data" / "#All"
     *  - "[Col]" / "[[ColA]:[ColB]]"
     *  - "[[#Data],[Col]]" / "[[#All],[ColA]:[ColB]]"
     */
    private _columnDataString;
    /** Section text to enum mapping ('#All', '#Data', '#Headers', '#Totals', '#This Row') */
    private _tableOptionMap;
    private _isCurrentRowForRange;
    constructor(token: string, _tableData: ISuperTable, 
    /**
     * Structured reference body (with or without outer []):
     *  - "#Data" / "#All"
     *  - "[Col]" / "[[ColA]:[ColB]]"
     *  - "[[#Data],[Col]]" / "[[#All],[ColA]:[ColB]]"
     */
    _columnDataString: string | undefined, 
    /** Section text to enum mapping ('#All', '#Data', '#Headers', '#Totals', '#This Row') */
    _tableOptionMap: Map<string, TableOptionType>);
    getRangeData(): import("@univerjs/core").IRange;
    getRefOffset(): {
        x: number;
        y: number;
    };
    isTable(): boolean;
    isCurrentRowForRange(): boolean;
    setForcedSheetId(sheetNameMap: IUnitSheetNameMap): void;
    /**
     * Parse structured reference body, returning column range and Section type.
     * Determination rules:
     *  - Whether it's a Section depends on "whether it starts with # after stripping", not whether it still has brackets.
     *  - No comma: Either Section, or column/column range
     *  - Has comma: Left is Section, right is column/column range
     */
    private _parseStructuredRef;
    /** Strip one layer of outer brackets from "[...]" (return as-is if none) */
    private _stripOuterBracketOnce;
    /**
     * Find first comma at depth=0 (used to split Section and column parts)
     * Compatible with nesting like "[[#Data],[ColA]:[ColB]]".
     */
    private _findCommaAtTopLevel;
    /**
     * Parse Section, compatible with both "[#Data]" and "#Data" inputs
     * Returns TableOptionType if matched; returns DATA if not (could throw error instead)
     */
    private _parseSectionMaybeBracketed;
    /**
     * Section mapping: Only accepts keywords starting with #.
     * Returns undefined if not a valid Section (caller treats as column or fallback).
     */
    private _mapSection;
    /**
     * Parse column selection:
     * - "[Col]" / "Col"               => Single column
     * - "[[ColA]:[ColB]]" / "[ColA]:[ColB]" / "ColA:ColB"  => Column range
     *
     * Rules:
     * - First find colon at top level, strip one layer of brackets from left and right sides (if present)
     * - Returns -1 if column name not found (caller should handle as parse error)
     */
    private _parseColumnOrRange;
    /** Strip one layer of outer brackets; return as-is if none (compatible with "[Col]" and "Col") */
    private _stripOuterBracketIfAny;
    /** Find range colon at depth=0 */
    private _findColonAtTopLevel;
    /** Column title → column index; returns -1 if not found (caller should handle as parse error) */
    private _titleToIndex;
    /** Resolve #This Row's row number; takes first data row (tableStartRow+1) when no context available */
    private _resolveThisRow;
}
