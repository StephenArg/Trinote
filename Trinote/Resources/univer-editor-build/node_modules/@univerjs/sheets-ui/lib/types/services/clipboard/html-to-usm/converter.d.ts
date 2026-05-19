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
import type { ITextStyle, Nullable } from '@univerjs/core';
import type { ISheetSkeletonManagerParam } from '@univerjs/sheets';
import type { IClipboardPropertyItem, IUniverSheetCopyDataModel } from '../type';
import type { IPastePlugin } from './paste-plugins/type';
export interface IStyleRule {
    filter: string | string[] | ((node: HTMLElement) => boolean);
    getStyle(node: HTMLElement): ITextStyle;
}
export interface IParsedTablesInfo {
    index: number;
}
interface IHtmlToUSMServiceProps {
    getCurrentSkeleton: () => Nullable<ISheetSkeletonManagerParam>;
}
export declare class HtmlToUSMService {
    private static _pluginList;
    static use(plugin: IPastePlugin): void;
    private _styleMap;
    private _styleCache;
    private _styleRules;
    private _afterProcessRules;
    private _dom;
    private _msoNumfmtMap;
    private _getCurrentSkeleton;
    constructor(props: IHtmlToUSMServiceProps);
    convert(html: string): IUniverSheetCopyDataModel;
    /**
     * Parse mso-number-format from raw CSS text before the browser drops proprietary properties.
     * Must be called with style.textContent BEFORE the style element is moved into a shadow DOM.
     */
    private _parseMsoNumfmtFromCssText;
    /**
     * Get the mso-number-format value for a given DOM node,
     * following the same priority as _getStyle: class > id > tag.
     */
    private _getMsoNumfmtForNode;
    private _getStyleBySelectorText;
    private _getStyle;
    private _parseTable;
    private _parseTableByHtml;
    private _parseCellHtml;
    private _getCellTextAndRichText;
    private _generateDocumentDataModelSnapshot;
    private process;
    private _processBeforeLink;
    private _processAfterLink;
    dispose(): void;
}
/**
 * This function parses <tr> elements in the table. So it would return several things.
 * @param html raw content
 * @returns
 */
export declare function parseTableRows(html: string): {
    rowProperties: IClipboardPropertyItem[];
    rowCount: number;
};
export {};
