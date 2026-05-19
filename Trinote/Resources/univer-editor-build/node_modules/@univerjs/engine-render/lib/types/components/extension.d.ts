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
import type { IDocumentRenderConfig, IRange, IScale, Nullable } from '@univerjs/core';
import type { BaseObject } from '../base-object';
import type { IBoundRectNoAngle, Vector2 } from '../basics/vector2';
import type { UniverRenderingContext } from '../context';
import { Registry } from '@univerjs/core';
export interface IExtensionConfig {
    originTranslate?: Vector2;
    spanStartPoint?: Vector2;
    spanPointWithFont?: Vector2;
    centerPoint?: Vector2;
    alignOffset?: Vector2;
    renderConfig?: IDocumentRenderConfig;
}
export interface IDrawInfo {
    viewRanges: IRange[];
    viewportKey: string;
    checkOutOfViewBound?: boolean;
    viewBound?: IBoundRectNoAngle;
}
export declare class ComponentExtension<T, U, V> {
    uKey: string;
    type: U;
    protected Z_INDEX: number;
    parent: Nullable<BaseObject>;
    translateX: number;
    translateY: number;
    extensionOffset: IExtensionConfig;
    get zIndex(): number;
    draw(_ctx: UniverRenderingContext, _parentScale: IScale, _skeleton: T, _diff?: V, _more?: IDrawInfo): void;
    clearCache(): void;
    protected _getScale(parentScale: IScale): number;
    dispose(): void;
}
export declare const SpreadsheetExtensionRegistry: Registry<any>;
export declare const SheetRowHeaderExtensionRegistry: Registry<any>;
export declare const SheetColumnHeaderExtensionRegistry: Registry<any>;
export declare const DocumentsSpanAndLineExtensionRegistry: Registry<any>;
