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
import type { ICellCustomRender, IDisposable, Injector, Nullable } from '@univerjs/core';
import type { SheetExtension } from '@univerjs/engine-render';
import type { Observable } from 'rxjs';
import { InterceptorEffectEnum } from '@univerjs/core';
import { FUniver } from '@univerjs/core/facade';
/**
 * @ignore
 */
export interface IFUniverSheetsUIMixin {
    /**
     * Register sheet row header render extensions.
     * @param {string} unitId The unit id of the spreadsheet.
     * @param {SheetExtension[]} extensions The extensions to register.
     * @returns {IDisposable} The disposable instance.
     */
    registerSheetRowHeaderExtension(unitId: string, ...extensions: SheetExtension[]): IDisposable;
    /**
     * Register sheet column header render extensions.
     * @param {string} unitId The unit id of the spreadsheet.
     * @param {SheetExtension[]} extensions The extensions to register.
     * @returns {IDisposable} The disposable instance.
     */
    registerSheetColumnHeaderExtension(unitId: string, ...extensions: SheetExtension[]): IDisposable;
    /**
     * Register sheet main render extensions.
     * @param {string} unitId The unit id of the spreadsheet.
     * @param {SheetExtension[]} extensions The extensions to register.
     * @returns {IDisposable} The disposable instance.
     */
    registerSheetMainExtension(unitId: string, ...extensions: SheetExtension[]): IDisposable;
    /**
     * Register cell custom render.
     * @param {Nullable<ICellCustomRender[]>} customRender Custom render function.
     * @param {InterceptorEffectEnum} [effect] The effect of the interceptor, style or value.
     * @param {number} [priority] The priority of the interceptor.
     */
    registerCellCustomRender(customRender: Nullable<ICellCustomRender[]>, effect?: InterceptorEffectEnum, priority?: number): IDisposable;
    /**
     * Paste clipboard data or custom data into the active sheet at the current selection position.
     * @param {string} [htmlContent] - The HTML content from the clipboard or custom data.
     * @param {string} [textContent] - The plain text content from the clipboard or custom data.
     * @param {File[]} [files] - The files from the clipboard or custom data.
     * @return {Promise<boolean>} A promise that resolves to true if the paste operation was successful, otherwise false.
     * @example
     * ```typescript
     * // Listen for the paste event and call the pasteIntoSheet method
     * document.addEventListener('paste', async (event) => {
     *   const htmlContent = event.clipboardData.getData('text/html');
     *   const textContent = event.clipboardData.getData('text/plain');
     *   const files = Array.from(event.clipboardData.items)
     *     .map((item) => item.kind === 'file' ? item.getAsFile() : undefined)
     *     .filter(Boolean);
     *   await univerAPI.pasteIntoSheet(htmlContent, textContent, files);
     * });
     *
     * // Or paste custom data
     * univerAPI.pasteIntoSheet('<b>Bold Text</b>', 'Bold Text');
     * ```
     */
    pasteIntoSheet(htmlContent?: string, textContent?: string, files?: File[]): Promise<boolean>;
    /**
     * Set the global strategy for showing the protected range shadow.
     * This will apply to all workbooks in the current Univer instance.
     * @param {('always' | 'non-editable' | 'non-viewable' | 'none')} strategy - The shadow strategy to apply
     * - 'always': Show shadow for all protected ranges
     * - 'non-editable': Only show shadow for ranges that cannot be edited
     * - 'non-viewable': Only show shadow for ranges that cannot be viewed
     * - 'none': Never show shadow for protected ranges
     * @example
     * ```typescript
     * // Always show shadows (default)
     * univerAPI.setProtectedRangeShadowStrategy('always');
     *
     * // Only show shadows for non-editable ranges
     * univerAPI.setProtectedRangeShadowStrategy('non-editable');
     *
     * // Only show shadows for non-viewable ranges
     * univerAPI.setProtectedRangeShadowStrategy('non-viewable');
     *
     * // Never show shadows
     * univerAPI.setProtectedRangeShadowStrategy('none');
     * ```
     */
    setProtectedRangeShadowStrategy(strategy: 'always' | 'non-editable' | 'non-viewable' | 'none'): void;
    /**
     * Get the current global strategy for showing the protected range shadow.
     * @returns {('always' | 'non-editable' | 'non-viewable' | 'none')} The current shadow strategy
     * @example
     * ```typescript
     * const currentStrategy = univerAPI.getProtectedRangeShadowStrategy();
     * console.log(currentStrategy); // 'none', 'always', 'non-editable', or 'non-viewable'
     * ```
     */
    getProtectedRangeShadowStrategy(): 'always' | 'non-editable' | 'non-viewable' | 'none';
    /**
     * Get an observable of the global strategy for showing the protected range shadow.
     * This allows you to listen for strategy changes across all workbooks.
     * @returns {Observable<('always' | 'non-editable' | 'non-viewable' | 'none')>} An observable that emits the current shadow strategy
     * @example
     * ```typescript
     * const subscription = univerAPI.getProtectedRangeShadowStrategy$().subscribe((strategy) => {
     *     console.log('Global strategy changed to:', strategy);
     *     // Update UI or perform other actions
     * });
     *
     * // Later, unsubscribe to clean up
     * subscription.unsubscribe();
     * ```
     */
    getProtectedRangeShadowStrategy$(): Observable<'always' | 'non-editable' | 'non-viewable' | 'none'>;
    /**
     * Set visibility of unauthorized pop-up window
     * @param {boolean} visible - visibility of unauthorized pop-up window
     * @example
     * ```ts
     * const univerAPI = FUniver.newAPI(univer);
     * univerAPI.setPermissionDialogVisible(false);
     * ```
     */
    setPermissionDialogVisible(visible: boolean): void;
}
export declare class FUniverSheetsUIMixin extends FUniver implements IFUniverSheetsUIMixin {
    private _initSheetUIEvent;
    private _initObserverListener;
    private _tryGetRenderDependency;
    /**
     * @ignore
     */
    _initialize(injector: Injector): void;
    private _generateClipboardCopyParam;
    private _beforeClipboardChange;
    private _clipboardChanged;
    private _generateClipboardPasteParam;
    private _generateClipboardPasteParamAsync;
    private _beforeClipboardPaste;
    private _clipboardPaste;
    private _beforeClipboardPasteAsync;
    private _clipboardPasteAsync;
    registerSheetRowHeaderExtension(unitId: string, ...extensions: SheetExtension[]): IDisposable;
    registerSheetColumnHeaderExtension(unitId: string, ...extensions: SheetExtension[]): IDisposable;
    registerSheetMainExtension(unitId: string, ...extensions: SheetExtension[]): IDisposable;
    registerCellCustomRender(customRender: Nullable<ICellCustomRender[]>, effect?: InterceptorEffectEnum, priority?: number): IDisposable;
    /**
     * Get sheet render component from render by unitId and view key.
     * @private
     * @param {string} unitId The unit id of the spreadsheet.
     * @param {SHEET_VIEW_KEY} viewKey The view key of the spreadsheet.
     * @returns {Nullable<RenderComponentType>} The render component.
     */
    private _getSheetRenderComponent;
    pasteIntoSheet(htmlContent?: string, textContent?: string, files?: File[]): Promise<boolean>;
    setProtectedRangeShadowStrategy(strategy: 'always' | 'non-editable' | 'non-viewable' | 'none'): void;
    getProtectedRangeShadowStrategy(): 'always' | 'non-editable' | 'non-viewable' | 'none';
    getProtectedRangeShadowStrategy$(): Observable<'always' | 'non-editable' | 'non-viewable' | 'none'>;
    setPermissionDialogVisible(visible: boolean): void;
}
declare module '@univerjs/core/facade' {
    interface FUniver extends IFUniverSheetsUIMixin {
    }
}
