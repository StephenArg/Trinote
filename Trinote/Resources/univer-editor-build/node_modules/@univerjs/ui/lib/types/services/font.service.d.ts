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
import type { IDisposable } from '@univerjs/core';
import { IConfigService } from '@univerjs/core';
import { BehaviorSubject } from 'rxjs';
export declare const IFontService: import("@wendellhu/redi").IdentifierDecorator<IFontService>;
/**
 * Font configuration interface
 */
export interface IFontConfig {
    /**
     * Unique identifier, usually also the preferred value for CSS font-family
     * @example 'Microsoft YaHei'
     */
    value: string;
    /**
     * Translation key for i18n
     * @example 'font.microsoft_yahei'
     */
    label: string;
    /**
     * Font category for UI grouping (optional)
     */
    category?: 'sans-serif' | 'serif' | 'monospace' | 'display' | 'handwriting';
}
export interface IFontService {
    /**
     * The data stream of the font list
     * UI components should subscribe to this stream to render dropdown lists
     * When the list changes (add, delete, update), a new value is automatically emitted
     */
    readonly fonts$: BehaviorSubject<IFontConfig[]>;
    /**
     * Get a snapshot of the current font list (synchronously)
     * Suitable for scenarios where subscribing to the stream is not needed,
     * or when obtaining the current state during logic processing
     */
    getFonts(): IFontConfig[];
    /**
     * Get a single font configuration by value
     */
    getFontByValue(value: string): IFontConfig | undefined;
    /**
     * Check if the current browser environment supports the font
     * (Based on document.fonts.check or Canvas fallback)
     */
    isFontSupported(fontValue: string): boolean;
    /**
     * Add a new font
     * @throws Error if the font value already exists
     */
    addFont(font: IFontConfig): void;
    /**
     * Update an existing font configuration
     * Supports partial updates (e.g., only updating stack or label)
     * @param value The unique identifier of the font to update
     * @param updates The fields to update
     */
    updateFont(value: string, updates: Partial<Omit<IFontConfig, 'value'>>): void;
    /**
     * Remove a font
     * @param value The identifier of the font to remove
     * @returns boolean Whether the removal was successful (e.g., built-in fonts may not be allowed to be removed)
     */
    removeFont(value: string): boolean;
    /**
     * Reset to the default built-in font list
     * (Used for the "Restore Defaults" feature)
     */
    resetToDefaults(): void;
}
export declare class FontService implements IFontService, IDisposable {
    protected readonly _configService: IConfigService;
    readonly fonts$: BehaviorSubject<IFontConfig[]>;
    constructor(_configService: IConfigService);
    dispose(): void;
    getFonts(): IFontConfig[];
    getFontByValue(value: string): IFontConfig | undefined;
    /**
     * Check if the current browser environment supports the font
     * @param fontValue
     * @returns boolean Whether the font is supported
     */
    isFontSupported(fontValue: string): boolean;
    addFont(font: IFontConfig): void;
    updateFont(value: string, updates: Partial<Omit<IFontConfig, 'value'>>): void;
    removeFont(value: string): boolean;
    resetToDefaults(): void;
}
