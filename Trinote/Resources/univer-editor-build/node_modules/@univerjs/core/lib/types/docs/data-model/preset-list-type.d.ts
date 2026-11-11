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
import type { IListData } from '../../types/interfaces/i-document-data';
export declare enum QuickListType {
    ORDER_LIST_QUICK_1 = "1.",
    ORDER_LIST_QUICK_2 = "a)",
    ORDER_LIST_QUICK_3 = "a.",
    ORDER_LIST_QUICK_4 = "i.",
    ORDER_LIST_QUICK_5 = "A.",
    ORDER_LIST_QUICK_6 = "I.",
    ORDER_LIST_QUICK_7 = "01.",
    BULLET_LIST = "*"
}
export declare enum PresetListType {
    /** Standard filled-circle bullet list. */
    BULLET_LIST = "BULLET_LIST",
    /** Decorative diamond and arrow bullet list. */
    BULLET_LIST_1 = "BULLET_LIST_1",
    /** Checkmark-led bullet list for completed-item style content. */
    BULLET_LIST_2 = "BULLET_LIST_2",
    /** Square and diamond bullet list. */
    BULLET_LIST_3 = "BULLET_LIST_3",
    /** Star-like decorative bullet list. */
    BULLET_LIST_4 = "BULLET_LIST_4",
    /** Arrow-led bullet list. */
    BULLET_LIST_5 = "BULLET_LIST_5",
    /**
     * Hierarchical ordered list using `1`, `a`, and `i` markers.
     */
    ORDER_LIST = "ORDER_LIST",
    /**
     * Hierarchical ordered list using `1)`, `a)`, and `i)` markers.
     */
    ORDER_LIST_1 = "ORDER_LIST_1",
    /**
     * Outline list using compound markers such as `1.`, `1.1.`, and `1.1.1.`.
     */
    ORDER_LIST_2 = "ORDER_LIST_2",
    /**
     * Hierarchical ordered list using `A`, `a`, and `i` markers.
     */
    ORDER_LIST_3 = "ORDER_LIST_3",
    /**
     * Hierarchical ordered list using `A`, `1`, and `i` markers.
     */
    ORDER_LIST_4 = "ORDER_LIST_4",
    /**
     * Zero-padded ordered list using `01`, `a`, and `i` markers.
     */
    ORDER_LIST_5 = "ORDER_LIST_5",
    /** Quick ordered list using closing-parenthesis markers. */
    ORDER_LIST_QUICK_2 = "ORDER_LIST_QUICK_2",
    /** Quick ordered list using lowercase letter and period markers. */
    ORDER_LIST_QUICK_3 = "ORDER_LIST_QUICK_3",
    /** Quick ordered list using lowercase Roman numeral markers. */
    ORDER_LIST_QUICK_4 = "ORDER_LIST_QUICK_4",
    /** Quick ordered list using uppercase letter markers. */
    ORDER_LIST_QUICK_5 = "ORDER_LIST_QUICK_5",
    /** Quick ordered list using uppercase Roman numeral markers. */
    ORDER_LIST_QUICK_6 = "ORDER_LIST_QUICK_6",
    /** Unchecked task-list item. */
    CHECK_LIST = "CHECK_LIST",
    /** Checked task-list item. */
    CHECK_LIST_CHECKED = "CHECK_LIST_CHECKED"
}
export declare const PRESET_LIST_TYPE: Record<string, IListData>;
export declare const QuickListTypeMap: {
    "1.": PresetListType;
    "a)": PresetListType;
    "a.": PresetListType;
    "i.": PresetListType;
    "A.": PresetListType;
    "I.": PresetListType;
    "01.": PresetListType;
    "*": PresetListType;
};
