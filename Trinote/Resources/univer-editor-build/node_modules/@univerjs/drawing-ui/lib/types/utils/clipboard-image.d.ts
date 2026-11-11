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
import type { IImageIoService } from '@univerjs/core';
import { ImageSourceType } from '@univerjs/core';
export declare function extractClipboardImageFiles(clipboardData: DataTransfer): File[];
export declare function isClipboardTextImage(text: string): boolean;
export declare function extractClipboardTextImageFile(text: string): Promise<File | null>;
export declare function isImageOnlyClipboardHtml(html: string): boolean;
export declare function extractClipboardHtmlImageFiles(html: string): Promise<File[]>;
export declare function normalizeClipboardImageFile(file: File): Promise<File | null>;
export declare function svgImageFileToDataUrl(file: File): Promise<string | null>;
export declare function writeImageSourceToClipboard(source: string, imageSourceType?: ImageSourceType, imageIoService?: IImageIoService): Promise<boolean>;
