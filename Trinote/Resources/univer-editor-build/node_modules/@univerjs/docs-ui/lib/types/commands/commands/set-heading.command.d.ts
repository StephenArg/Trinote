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
import type { ICommand, ITextRangeParam } from '@univerjs/core';
import { NamedStyleType } from '@univerjs/core';
export interface ISetParagraphNamedStyleCommandParams {
    value: NamedStyleType;
    textRanges?: ITextRangeParam[];
}
export declare const SetParagraphNamedStyleCommand: ICommand<ISetParagraphNamedStyleCommandParams>;
export declare const QuickHeadingCommand: ICommand<ISetParagraphNamedStyleCommandParams>;
export declare const QUICK_HEADING_MAP: {
    '#': NamedStyleType;
    '##': NamedStyleType;
    '###': NamedStyleType;
    '####': NamedStyleType;
    '#####': NamedStyleType;
};
export declare const H1HeadingCommand: ICommand<ISetParagraphNamedStyleCommandParams>;
export declare const H2HeadingCommand: ICommand<ISetParagraphNamedStyleCommandParams>;
export declare const H3HeadingCommand: ICommand<ISetParagraphNamedStyleCommandParams>;
export declare const H4HeadingCommand: ICommand<ISetParagraphNamedStyleCommandParams>;
export declare const H5HeadingCommand: ICommand<ISetParagraphNamedStyleCommandParams>;
export declare const NormalTextHeadingCommand: ICommand<ISetParagraphNamedStyleCommandParams>;
export declare const TitleHeadingCommand: ICommand<ISetParagraphNamedStyleCommandParams>;
export declare const SubtitleHeadingCommand: ICommand<ISetParagraphNamedStyleCommandParams>;
