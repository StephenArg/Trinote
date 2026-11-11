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
export declare enum DataStreamTreeNodeType {
    PARAGRAPH = "PARAGRAPH",// \r  paragraph
    SECTION_BREAK = "SECTION_BREAK",// \n  section break
    TABLE = "TABLE",
    TABLE_ROW = "TABLE_ROW",
    TABLE_CELL = "TABLE_CELL",
    COLUMN_GROUP = "COLUMN_GROUP",
    COLUMN = "COLUMN",
    BLOCK = "BLOCK",
    CUSTOM_BLOCK = "CUSTOM_BLOCK"
}
export declare enum DataStreamTreeTokenType {
    PARAGRAPH = "\r",// paragraph
    SECTION_BREAK = "\n",// section break
    TABLE_START = "\u001A",// table start
    TABLE_ROW_START = "\u001B",// table row start
    TABLE_CELL_START = "\u001C",// table cell start
    TABLE_CELL_END = "\u001D",// table cell end
    TABLE_ROW_END = "\u000E",// table row end
    TABLE_END = "\u000F",// table end
    COLUMN_GROUP_START = "\u0012",// column group start
    COLUMN_START = "\u0013",// column start
    COLUMN_END = "\u0014",// column end
    COLUMN_GROUP_END = "\u0015",// column group end
    BLOCK_START = "\u0010",// block start
    BLOCK_END = "\u0011",// block end
    CUSTOM_RANGE_START = "\u001F",// custom range start
    CUSTOM_RANGE_END = "\u001E",// custom range end
    COLUMN_BREAK = "\v",// column break
    PAGE_BREAK = "\f",// page break
    DOCS_END = "\0",// document end
    TAB = "\t",// tab
    CUSTOM_BLOCK = "\b",// images, mentions, etc. that do not participate in document flow
    LETTER = "",
    SPACE = " "
}
