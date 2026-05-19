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
import type { ICommand, IRange } from '@univerjs/core';
import { FormatPainterStatus } from '../../services/format-painter/format-painter.service';
export interface ISetFormatPainterCommandParams {
    status: FormatPainterStatus;
}
export declare const SetInfiniteFormatPainterCommand: ICommand;
export declare const SetOnceFormatPainterCommand: ICommand;
export interface IApplyFormatPainterCommandParams {
    subUnitId: string;
    unitId: string;
    range: IRange;
}
export declare const ApplyFormatPainterCommand: ICommand;
