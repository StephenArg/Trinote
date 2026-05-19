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
import type { DocumentDataModel, ICommandInfo, ICustomRange, IDisposable, IParagraphRange, Nullable } from '@univerjs/core';
import type { ITextRangeWithStyle } from '@univerjs/engine-render';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { DocSelectionManagerService } from '@univerjs/docs';
export interface IAutoFormatContext {
    unit: DocumentDataModel;
    selection: ITextRangeWithStyle;
    /**
     * is selection at doc body
     */
    isBody: boolean;
    /**
     * selection relative paragraphs
     */
    paragraphs: IParagraphRange[];
    /**
     * selection relative custom ranges
     */
    customRanges: ICustomRange[];
    commandId: string;
    commandParams: Nullable<object>;
}
export interface IAutoFormat {
    id: string;
    match: (context: IAutoFormatContext) => boolean;
    getMutations: (context: IAutoFormatContext) => ICommandInfo[];
    priority?: number;
}
/**
 * service for auto-formatting, handle shortcut like `Space` or `Tab`.
 */
export declare class DocAutoFormatService extends Disposable {
    private readonly _univerInstanceService;
    private readonly _textSelectionManagerService;
    private _matches;
    constructor(_univerInstanceService: IUniverInstanceService, _textSelectionManagerService: DocSelectionManagerService);
    registerAutoFormat(match: IAutoFormat): IDisposable;
    onAutoFormat(id: string, params: Nullable<object>): ICommandInfo[];
}
