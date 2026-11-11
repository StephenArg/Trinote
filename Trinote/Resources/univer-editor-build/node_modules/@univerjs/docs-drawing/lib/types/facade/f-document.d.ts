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
import type { IObjectPositionH, IObjectPositionV, ITextRangeParam } from '@univerjs/core';
import { ImageSourceType } from '@univerjs/core';
import { TextWrappingStyle } from '@univerjs/docs-drawing';
import { FDocument } from '@univerjs/docs/facade';
import { FDocumentImage } from './f-document-image';
/** Options for inserting an image into a document. */
export interface IFDocumentInsertImageOptions {
    /** The image source. It cannot be changed after insertion. */
    source: string;
    /** The image source type. It cannot be changed after insertion. */
    imageSourceType: ImageSourceType;
    /** The width in pixels. When only width is provided, height is calculated from the intrinsic aspect ratio. */
    width?: number;
    /** The height in pixels. When only height is provided, width is calculated from the intrinsic aspect ratio. */
    height?: number;
    /** The clockwise rotation angle in degrees. Defaults to `0`. */
    angle?: number;
    /**
     * The horizontal position relative to the document. Defaults to the page with an offset of `0`.
     * It has a visible positioning effect only when `wrappingStyle` is not `INLINE`.
     */
    positionH?: IObjectPositionH;
    /**
     * The vertical position relative to the document. Defaults to the paragraph with an offset of `0`.
     * It has a visible positioning effect only when `wrappingStyle` is not `INLINE`.
     */
    positionV?: IObjectPositionV;
    /**
     * The image wrapping style. Defaults to `TextWrappingStyle.INLINE`.
     *
     * Use `INLINE` to place the image in the text flow, `WRAP_SQUARE` to flow text beside it, or
     * `WRAP_TOP_AND_BOTTOM` to keep text above and below it. `BEHIND_TEXT` and `IN_FRONT_OF_TEXT` are overlay styles:
     * they do not reserve space in the text layout, so text and the image can overlap.
     */
    wrappingStyle?: TextWrappingStyle;
    /** The document range at which to insert the image. The current selection is used when omitted. */
    textRange?: ITextRangeParam;
}
/** Image facade methods mixed into `FDocument`. */
export interface IFDocumentImageMixin {
    /**
     * Inserts an image into the document.
     *
     * When width and height are both omitted, the intrinsic size is proportionally limited to 500 by 500 pixels.
     * For ordinary content, prefer `INLINE`, `WRAP_SQUARE`, or `WRAP_TOP_AND_BOTTOM`. Use `BEHIND_TEXT` for
     * backgrounds or watermarks and `IN_FRONT_OF_TEXT` only for intentional overlays, because these two styles do not
     * cause text to reflow.
     *
     * @param {IFDocumentInsertImageOptions} options The image source, optional transform, and insertion range.
     * @returns {Promise<FDocumentImage | null>} The inserted image facade, or `null` when the insertion command fails.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = await fDocument.insertImage({
     *   source: 'https://avatars.githubusercontent.com/u/61444807?s=48&v=4',
     *   imageSourceType: univerAPI.Enum.ImageSourceType.URL,
     *   width: 320,
     *   // Keep the image in the text flow so it cannot cover surrounding text.
     *   wrappingStyle: univerAPI.Enum.TextWrappingStyle.INLINE,
     *   textRange: {
     *     startOffset: 30,
     *   },
     * });
     * console.log(image);
     * ```
     *
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = await fDocument.insertImage({
     *   source: 'https://avatars.githubusercontent.com/u/61444807?s=48&v=4',
     *   imageSourceType: univerAPI.Enum.ImageSourceType.URL,
     *   width: 320,
     *   // Float the image and let body text flow beside its rectangular bounds.
     *   wrappingStyle: univerAPI.Enum.TextWrappingStyle.WRAP_SQUARE,
     *   textRange: {
     *     startOffset: 30,
     *   },
     * });
     * console.log(image);
     * ```
     */
    insertImage(options: IFDocumentInsertImageOptions): Promise<FDocumentImage | null>;
    /**
     * Gets an image by its drawing id.
     * @param {string} imageId The drawing id of the image.
     * @returns {FDocumentImage | null} The image facade, or `null` when the image does not exist.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImage('image-1');
     * console.log(image);
     * ```
     */
    getImage(imageId: string): FDocumentImage | null;
    /**
     * Gets all images in the document in drawing order.
     * @returns {FDocumentImage[]} The image facades in drawing order.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const images = fDocument.getImages();
     * console.log(images);
     * ```
     */
    getImages(): FDocumentImage[];
}
export declare class FDocumentImageMixin extends FDocument implements IFDocumentImageMixin {
    insertImage(options: IFDocumentInsertImageOptions): Promise<FDocumentImage | null>;
    getImage(imageId: string): FDocumentImage | null;
    getImages(): FDocumentImage[];
    private _getIntrinsicSize;
}
declare module '@univerjs/docs/facade' {
    interface FDocument extends IFDocumentImageMixin {
    }
}
