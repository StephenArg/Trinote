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
import type { ImageSourceType, Injector, IObjectPositionH, IObjectPositionV, ISize } from '@univerjs/core';
import type { IDocImage, TextWrappingStyle } from '@univerjs/docs-drawing';
import type { FDocument } from '@univerjs/docs/facade';
import { FBase } from '@univerjs/core/facade';
/**
 * Facade API for an image in a document.
 * @hideconstructor
 */
export declare class FDocumentImage extends FBase {
    private readonly _document;
    private readonly _imageId;
    protected readonly _injector: Injector;
    constructor(_document: FDocument, _imageId: string, _injector: Injector);
    /**
     * Gets the id of the document containing the image.
     * @returns {string} The document unit id.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   console.log(image.getUnitId());
     * }
     * ```
     */
    getUnitId(): string;
    /**
     * Gets the drawing id of the image.
     * @returns {string} The drawing id.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   console.log(image.getId());
     * }
     * ```
     */
    getId(): string;
    /**
     * Gets the image source supplied at insertion time.
     * @returns {string | undefined} The image source, or `undefined` when the image no longer exists.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   console.log(image.getSource());
     * }
     * ```
     */
    getSource(): string | undefined;
    /**
     * Gets the image source type supplied at insertion time.
     * @returns {ImageSourceType | undefined} The image source type, or `undefined` when the image no longer exists.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   console.log(image.getSourceType());
     * }
     * ```
     */
    getSourceType(): ImageSourceType | undefined;
    /**
     * Gets the current image size.
     * @returns {ISize | null} The width and height in pixels, or `null` when the image no longer exists.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   console.log(image.getSize());
     * }
     * ```
     */
    getSize(): ISize | null;
    /**
     * Gets the current clockwise rotation angle.
     * @returns {number | undefined} The rotation angle in degrees, or `undefined` when the image no longer exists.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   console.log(image.getAngle());
     * }
     * ```
     */
    getAngle(): number | undefined;
    /**
     * Gets the current horizontal position.
     * @returns {IObjectPositionH | null} The horizontal position, or `null` when the image no longer exists.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   console.log(image.getPositionH());
     * }
     * ```
     */
    getPositionH(): IObjectPositionH | null;
    /**
     * Gets the current vertical position.
     * @returns {IObjectPositionV | null} The vertical position, or `null` when the image no longer exists.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   console.log(image.getPositionV());
     * }
     * ```
     */
    getPositionV(): IObjectPositionV | null;
    /**
     * Gets the current raw document image data.
     * @returns {IDocImage | null} The image data, or `null` when the image no longer exists.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   console.log(image.getImageData());
     * }
     * ```
     */
    getImageData(): IDocImage | null;
    /**
     * Sets the image size.
     * @param {number} width The width in pixels.
     * @param {number} height The height in pixels.
     * @returns {boolean} `true` when the update command succeeds; otherwise, `false`.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   const success = image.setSize(400, 300);
     *   console.log(success);
     * }
     * ```
     */
    setSize(width: number, height: number): boolean;
    /**
     * Sets the clockwise rotation angle.
     * @param {number} angle The rotation angle in degrees.
     * @returns {boolean} `true` when the update command succeeds; otherwise, `false`.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   const success = image.setRotate(45);
     *   console.log(success);
     * }
     * ```
     */
    setRotate(angle: number): boolean;
    /**
     * Sets the horizontal position of the image.
     * Inline images are positioned by their document placeholder, so this has a visible effect only when the image
     * wrapping style is not `TextWrappingStyle.INLINE`.
     * @param {IObjectPositionH} positionH The horizontal position relative to the document.
     * @returns {boolean} `true` when the update command succeeds; otherwise, `false`.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   const success = image.setPositionH({
     *     relativeFrom: univerAPI.Enum.DocsImageRelativeFromH.MARGIN,
     *     posOffset: 100
     *   });
     *   console.log(success);
     * }
     * ```
     */
    setPositionH(positionH: IObjectPositionH): boolean;
    /**
     * Sets the vertical position of the image.
     * Inline images are positioned by their document placeholder, so this has a visible effect only when the image
     * wrapping style is not `TextWrappingStyle.INLINE`.
     * @param {IObjectPositionV} positionV The vertical position relative to the document.
     * @returns {boolean} `true` when the update command succeeds; otherwise, `false`.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   const success = image.setPositionV({
     *     relativeFrom: univerAPI.Enum.DocsImageRelativeFromV.MARGIN,
     *     posOffset: 100
     *   });
     *   console.log(success);
     * }
     * ```
     */
    setPositionV(positionV: IObjectPositionV): boolean;
    /**
     * Sets the image wrapping style.
     *
     * Use `INLINE` to place the image in the text flow, `WRAP_SQUARE` to flow text beside it, or
     * `WRAP_TOP_AND_BOTTOM` to keep text above and below it. `BEHIND_TEXT` and `IN_FRONT_OF_TEXT` do not reserve space
     * in the text layout and can overlap text.
     *
     * When switching from inline to a floating style in a UI environment, the current visual position is preserved.
     * @param {TextWrappingStyle} wrappingStyle The wrapping style to apply.
     * @returns {boolean} `true` when the update command succeeds; otherwise, `false`.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   // Float the image beside body text without covering it.
     *   const success = image.setWrappingStyle(univerAPI.Enum.TextWrappingStyle.WRAP_SQUARE);
     *   console.log(success);
     * }
     * ```
     */
    setWrappingStyle(wrappingStyle: TextWrappingStyle): boolean;
    /**
     * Moves the image forward by one level in the drawing order.
     * @returns {boolean} `true` when the arrange command succeeds; otherwise, `false`.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   const success = image.setForward();
     *   console.log(success);
     * }
     * ```
     */
    setForward(): boolean;
    /**
     * Moves the image backward by one level in the drawing order.
     * @returns {boolean} `true` when the arrange command succeeds; otherwise, `false`.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   const success = image.setBackward();
     *   console.log(success);
     * }
     * ```
     */
    setBackward(): boolean;
    /**
     * Moves the image to the back of the drawing order.
     * @returns {boolean} `true` when the arrange command succeeds; otherwise, `false`.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   const success = image.setBack();
     *   console.log(success);
     * }
     * ```
     */
    setBack(): boolean;
    /**
     * Moves the image to the front of the drawing order.
     * @returns {boolean} `true` when the arrange command succeeds; otherwise, `false`.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   const success = image.setFront();
     *   console.log(success);
     * }
     * ```
     */
    setFront(): boolean;
    /**
     * Removes the image and its document placeholder.
     * @returns {boolean} `true` when the remove command succeeds; otherwise, `false`.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const image = fDocument.getImages()[0];
     *
     * if (image) {
     *   const success = image.remove();
     *   console.log(success);
     * }
     * ```
     */
    remove(): boolean;
    private _updateTransform;
    private _arrange;
    private _getTextRange;
}
