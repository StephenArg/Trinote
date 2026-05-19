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
import type { DisposableCollection, IRange, Worksheet } from '@univerjs/core';
import type { Engine, Scene, Spreadsheet, SpreadsheetSkeleton } from '@univerjs/engine-render';
import { Disposable, InterceptorManager } from '@univerjs/core';
interface ISheetPrintContext {
    unitId: string;
    subUnitId: string;
    scene: Scene;
    engine: Engine;
    root: HTMLElement;
    worksheet: Worksheet;
    skeleton: SpreadsheetSkeleton;
    offset: {
        offsetX: number;
        offsetY: number;
    };
}
interface ISheetPrintComponentContext extends ISheetPrintContext {
    spreadsheet: Spreadsheet;
}
export declare class SheetPrintInterceptorService extends Disposable {
    private _printComponentMap;
    readonly interceptor: InterceptorManager<{
        PRINTING_RANGE: import("@univerjs/core").IInterceptor<IRange, {
            unitId: string;
            subUnitId: string;
        }>;
        PRINTING_COMPONENT_COLLECT: import("@univerjs/core").IInterceptor<undefined, ISheetPrintComponentContext>;
        PRINTING_DOM_COLLECT: import("@univerjs/core").IInterceptor<DisposableCollection, ISheetPrintContext>;
    }>;
    constructor();
    registerPrintComponent(componentKey: string, printingComponentKey: string): void;
    getPrintComponent(componentKey: string): string | undefined;
}
export {};
