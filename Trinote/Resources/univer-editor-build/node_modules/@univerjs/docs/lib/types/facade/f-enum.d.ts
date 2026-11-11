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
import { ColumnSeparatorType, DocumentFlavor, SectionType } from '@univerjs/core';
import { FEnum } from '@univerjs/core/facade';
/** @ignore */
export interface IFDocsEnumMixin {
    /** Document layout flavors. */
    DocumentFlavor: typeof DocumentFlavor;
    /** OOXML-compatible section start types. */
    SectionType: typeof SectionType;
    /** Section column separator types. */
    ColumnSeparatorType: typeof ColumnSeparatorType;
}
export declare class FDocsEnumMixin extends FEnum implements IFDocsEnumMixin {
    get DocumentFlavor(): typeof DocumentFlavor;
    get SectionType(): typeof SectionType;
    get ColumnSeparatorType(): typeof ColumnSeparatorType;
}
declare module '@univerjs/core/facade' {
    interface FEnum extends IFDocsEnumMixin {
    }
}
