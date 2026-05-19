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
import type { Nullable } from '@univerjs/core';
import type { IBreakPoints, LineBreaker } from '../line-breaker';
import { Break } from '../break';
export declare class LineBreakerLinkEnhancer implements IBreakPoints {
    private _lineBreaker;
    private _curBreak;
    private _nextBreak;
    private _isInLink;
    private _link;
    private _index;
    private _linkSlice;
    content: string;
    constructor(_lineBreaker: LineBreaker);
    nextBreakPoint(): Nullable<Break>;
}
