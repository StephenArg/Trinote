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
import type { IPosition, Serializable } from '@univerjs/core';
import type { Observable } from 'rxjs';
import { Disposable } from '@univerjs/core';
import { Subject } from 'rxjs';
export interface IFloatDomLayout extends IPosition {
    rotate: number;
    width: number;
    height: number;
    absolute: {
        left: boolean;
        top: boolean;
    };
    opacity?: number;
}
export interface IFloatDomContentBoxConfig {
    /** Amount subtracted from the visible wrapper width and height. @default 2 */
    wrapperInset?: number;
    /** Amount subtracted from the content width and height. @default 4 */
    contentInset?: number;
}
export interface IFloatDom {
    position$: Observable<IFloatDomLayout>;
    id: string;
    domId?: string;
    componentKey: string | React.ComponentType;
    /**
     * Whether pointer and wheel events inside the floating DOM should be
     * forwarded back to the host canvas. Existing canvas-owned float DOMs keep
     * forwarding by default; interactive embed runtimes can opt out.
     */
    eventPassThrough?: boolean;
    /**
     * Keep rendering this host-owned layer even when focus temporarily moves
     * into a child runtime unit. Interactive embed float blocks need this so
     * their DOM portal is not filtered out when the child handles focus.
     */
    preserveOnFocusChange?: boolean;
    /**
     * Insets subtracted from FloatDom's wrapper and content dimensions.
     * Omitted values preserve the historical wrapper/content insets of 2/4.
     */
    contentBox?: IFloatDomContentBoxConfig;
    onPointerMove: (evt: PointerEvent | MouseEvent) => void;
    onPointerDown: (evt: PointerEvent | MouseEvent) => void;
    onPointerUp: (evt: PointerEvent | MouseEvent) => void;
    onWheel: (evt: WheelEvent) => void;
    props?: Record<string, any>;
    data?: Serializable;
    unitId: string;
}
export declare function shouldForwardFloatDomEvents(layer: Pick<IFloatDom, 'eventPassThrough'>): boolean;
export declare function shouldRenderFloatDomLayer(layer: Pick<IFloatDom, 'unitId' | 'preserveOnFocusChange'>, currentUnitId: string | null | undefined): boolean;
export declare class CanvasFloatDomService extends Disposable {
    private _domLayerMap;
    private _scopedRenderRootCount;
    private _domLayers$;
    domLayers$: Observable<[string, IFloatDom][]>;
    get domLayers(): [string, IFloatDom][];
    private _notice;
    updateFloatDom(id: string, item: Partial<IFloatDom>): void;
    addFloatDom(item: IFloatDom): void;
    hasScopedRenderRoot(unitId: string): boolean;
    registerScopedRenderRoot(unitId: string): import("@wendellhu/redi").IDisposable;
    removeFloatDom(id: string): void;
    removeAll(): void;
    dispose(): void;
}
export interface ICanvasFloatDomPreview {
    id: string;
    image: string;
    updatedAt: number;
}
export interface ICanvasFloatDomPreviewRequest {
    id: string;
    width: number;
    height: number;
    data?: unknown;
}
export declare class CanvasFloatDomPreviewService extends Disposable {
    readonly previewUpdated$: Subject<ICanvasFloatDomPreview>;
    readonly previewRequested$: Subject<ICanvasFloatDomPreviewRequest>;
    private readonly _previewMap;
    private readonly _requestMap;
    getPreview(id: string): ICanvasFloatDomPreview | undefined;
    getPendingRequests(): ICanvasFloatDomPreviewRequest[];
    setPreview(preview: ICanvasFloatDomPreview): void;
    removePreview(id: string): void;
    requestPreview(request: ICanvasFloatDomPreviewRequest): void;
    dispose(): void;
}
