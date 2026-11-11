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
import type { DisposableCollection } from '@univerjs/core';
import type { Documents, DocumentSkeleton, Engine, IBoundRectNoAngle, Scene } from '@univerjs/engine-render';
import { Disposable, InterceptorManager } from '@univerjs/core';
export interface IDocPrintContext {
    unitId: string;
    pageIndex?: number;
    scene: Scene;
    engine: Engine;
    root: HTMLElement;
    skeleton: DocumentSkeleton;
}
export interface IDocPrintDomtContext extends IDocPrintContext {
    offset: {
        x: number;
        y: number;
    };
    bound: IBoundRectNoAngle;
}
export interface IDocPrintComponentContext extends IDocPrintContext {
    documents: Documents;
}
export interface IDocPrintPreparationContext {
    unitId: string;
    dpr: number;
}
export declare class DocPrintInterceptorService extends Disposable {
    private _printComponentMap;
    private readonly _printPreparationHandlers;
    readonly interceptor: InterceptorManager<{
        PRINTING_COMPONENT_COLLECT: import("@univerjs/core").IInterceptor<undefined, IDocPrintComponentContext>;
        PRINTING_DOM_COLLECT: import("@univerjs/core").IInterceptor<DisposableCollection, IDocPrintDomtContext>;
    }>;
    constructor();
    registerPrintComponent(componentKey: string, printingComponentKey: string): void;
    getPrintComponent(componentKey: string): string | undefined;
    getPageDrawingIds(skeleton: DocumentSkeleton, pageIndex?: number): ReadonlySet<string> | null;
    registerPrintPreparation(handler: (context: IDocPrintPreparationContext) => Promise<void>): () => boolean;
    preparePrint(context: IDocPrintPreparationContext): Promise<void>;
    dispose(): void;
}
