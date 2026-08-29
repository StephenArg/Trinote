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
import type { ISelectionCellWithMergeInfo } from '@univerjs/core';
import type { IRenderContext, IRenderModule, SpreadsheetSkeleton, UniverRenderingContext } from '@univerjs/engine-render';
import { Disposable } from '@univerjs/core';
import { SheetPrintInterceptorService } from '@univerjs/sheets-ui';
export declare class SheetGraphicsRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _sheetPrintInterceptorService;
    private _graphicsExtensionInstance;
    constructor(_context: IRenderContext, _sheetPrintInterceptorService: SheetPrintInterceptorService);
    private _initRender;
    private _initPrinting;
    registerRenderer(key: string, renderer: (ctx: UniverRenderingContext, skeleton: SpreadsheetSkeleton, coordInfo: ISelectionCellWithMergeInfo) => void): void;
}
