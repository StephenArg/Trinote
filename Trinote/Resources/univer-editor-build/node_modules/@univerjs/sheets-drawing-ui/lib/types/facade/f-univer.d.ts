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
import type { IDisposable, Injector } from '@univerjs/core';
import { FUniver } from '@univerjs/core/facade';
export interface IFUniverSheetsDrawingUIMixin {
    /**
     * Register a custom image downloader for URL images
     * @param downloader The downloader function that takes a URL and returns a base64 string
     * @returns A disposable object to unregister the downloader
     * @example
     * ```ts
     * const disposable = univerAPI.registerURLImageDownloader(async (url) => {
     *   const response = await fetch(url);
     *   const blob = await response.blob();
     *   const base64 = await new Promise<string>((resolve) => {
     *     const reader = new FileReader();
     *     reader.onloadend = () => resolve(reader.result as string);
     *     reader.readAsDataURL(blob);
     *   });
     *   return base64;
     * });
     * ```
     */
    registerURLImageDownloader(downloader: (url: string) => Promise<string>): IDisposable;
}
/**
 * @ignore
 */
export declare class FUniverSheetsDrawingUIMixin extends FUniver implements IFUniverSheetsDrawingUIMixin {
    /**
     * @ignore
     */
    _initialize(injector: Injector): void;
    registerURLImageDownloader(downloader: (url: string) => Promise<string>): IDisposable;
}
declare module '@univerjs/core/facade' {
    interface FUniver extends IFUniverSheetsDrawingUIMixin {
    }
}
