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
import type { IDocumentData } from '@univerjs/core';
import type { IPastePlugin } from './paste-plugins/type';
/**
 * Convert html strings into data structures in univer, IDocumentBody.
 * Support plug-in, add custom rules,
 */
export declare class HtmlToUDMService {
    private static _pluginList;
    static use(plugin: IPastePlugin): void;
    private _tableCache;
    private _styleCache;
    private _styleRules;
    private _afterProcessRules;
    private _listStack;
    private _lastParagraphIndex;
    convert(html: string, metaConfig?: {
        unitId?: string;
    }): Partial<IDocumentData>;
    private _process;
    private _processCodeBlock;
    private _processBeforeStructuredBlock;
    private _processAfterStructuredBlock;
    private _processBeforeList;
    private _processAfterList;
    private _processAfterDefaultBlock;
    private _appendParagraph;
    private _applyListInfo;
    private _processHtmlTable;
    private _appendHtmlTableCell;
    private _processBeforeTable;
    private _processAfterTable;
    private _processBeforeLink;
    private _processAfterLink;
}
