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
import type { IScale } from '@univerjs/core';
import type { SpreadsheetSkeleton, UniverRenderingContext } from '@univerjs/engine-render';
import { SheetExtension } from '@univerjs/engine-render';
export declare const worksheetProtectionKey = "worksheet-protection";
export declare class WorksheetProtectionRenderExtension extends SheetExtension {
    uKey: string;
    Z_INDEX: number;
    private _pattern;
    private _img;
    protected _shadowStrategy: 'always' | 'non-editable' | 'non-viewable' | 'none';
    constructor(shadowStrategy?: 'always' | 'non-editable' | 'non-viewable' | 'none');
    draw(ctx: UniverRenderingContext, _parentScale: IScale, spreadsheetSkeleton: SpreadsheetSkeleton): false | undefined;
    /**
     * Set the shadow strategy for this extension
     * @param strategy The shadow strategy
     */
    setShadowStrategy(strategy: 'always' | 'non-editable' | 'non-viewable' | 'none'): void;
    /**
     * Get the current shadow strategy
     */
    getShadowStrategy(): 'always' | 'non-editable' | 'non-viewable' | 'none';
    setZIndex(zIndex: number): void;
}
