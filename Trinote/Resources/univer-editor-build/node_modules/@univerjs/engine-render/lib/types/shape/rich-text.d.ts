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
import type { IDocumentData, IStyleBase, ITransformState, LocaleService } from '@univerjs/core';
import type { BASE_OBJECT_ARRAY } from '../base-object';
import type { IViewportInfo } from '../basics/vector2';
import type { UniverRenderingContext } from '../context';
import { DocumentDataModel } from '@univerjs/core';
import { BaseObject, ObjectType } from '../base-object';
export interface IRichTextProps extends ITransformState, IStyleBase {
    text?: string;
    richText?: IDocumentData;
    zIndex: number;
    forceRender?: boolean;
}
export type RichtextObjectJSONType = {
    [key in typeof BASE_OBJECT_ARRAY[number]]: number;
} & {
    text: string;
    fs: number;
    richText?: unknown;
};
export declare const RICHTEXT_OBJECT_ARRAY: string[];
export declare class RichText extends BaseObject {
    private _localeService;
    private _documentData;
    private _documentSkeleton;
    private _documents;
    documentModel: DocumentDataModel;
    /**
     * fontFamily
     */
    private _ff?;
    /**
     * fontSize
     * pt
     */
    private _fs?;
    /**
     * italic
     * 0: false
     * 1: true
     */
    private _it?;
    /**
     * bold
     * 0: false
     * 1: true
     */
    private _bl?;
    /**
     * underline
     */
    private _ul?;
    /**
     * strikethrough
     */
    private _st?;
    /**
     * overline
     */
    private _ol?;
    /**
     * background
     */
    private _bg?;
    /**
     * border
     */
    private _bd?;
    /**
     * foreground
     */
    private _cl?;
    objectType: ObjectType;
    constructor(_localeService: LocaleService, key?: string, props?: IRichTextProps);
    get fs(): number;
    get text(): string;
    get documentData(): IDocumentData;
    /**
     * get last page size
     */
    getDocsSkeletonPageSize(): {
        width: number;
        height: number;
    } | undefined;
    /**
     * this[`_${key}`] = props[key];
     * @param props
     */
    setProps(props?: IRichTextProps): this | undefined;
    render(mainCtx: UniverRenderingContext, bounds?: IViewportInfo): this;
    toJson(): RichtextObjectJSONType;
    protected _draw(ctx: UniverRenderingContext): void;
    private _convertToDocumentData;
    private _initialProps;
    /**
     * After changing editor size & end of editing, update skeleton of doc.
     */
    refreshDocumentByDocData(): void;
    /**
     * invoked when end editing.
     */
    resizeToContentSize(): void;
}
