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
import type { ICommand, IMultiCommand } from '@univerjs/core';
export declare const SheetCopyCommand: IMultiCommand;
export declare const SheetCutCommand: IMultiCommand;
export interface ISheetPasteParams {
    value: string;
}
export interface ISheetPasteByShortKeyParams {
    htmlContent?: string;
    textContent?: string;
    files?: File[];
}
export declare const SheetPasteCommand: IMultiCommand;
export declare const SheetPasteShortKeyCommand: ICommand;
export declare const SheetPasteValueCommand: ICommand;
export declare const SheetPasteFormatCommand: ICommand;
export declare const SheetPasteColWidthCommand: ICommand;
export declare const SheetPasteBesidesBorderCommand: ICommand;
export declare const SheetOptionalPasteCommand: ICommand;
