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
import type { ISheetNote } from '@univerjs/sheets-note';
import type { FWorkbook, FWorksheet } from '@univerjs/sheets/facade';
import { FEventName } from '@univerjs/core/facade';
export interface ISheetNoteAddEventParams {
    workbook: FWorkbook;
    worksheet: FWorksheet;
    row: number;
    col: number;
    note: ISheetNote;
    cancel?: boolean;
}
export interface ISheetNoteDeleteEventParams {
    workbook: FWorkbook;
    worksheet: FWorksheet;
    row: number;
    col: number;
    oldNote: ISheetNote;
    cancel?: boolean;
}
export interface ISheetNoteUpdateEventParams {
    workbook: FWorkbook;
    worksheet: FWorksheet;
    row: number;
    col: number;
    note: ISheetNote;
    oldNote: ISheetNote;
    cancel?: boolean;
}
export interface ISheetNoteShowEventParams {
    workbook: FWorkbook;
    worksheet: FWorksheet;
    row: number;
    col: number;
    cancel?: boolean;
}
export interface ISheetNoteHideEventParams {
    workbook: FWorkbook;
    worksheet: FWorksheet;
    row: number;
    col: number;
    cancel?: boolean;
}
/**
 * @ignore
 */
export interface ISheetsNoteEventParamConfig {
    SheetNoteAdd: ISheetNoteAddEventParams;
    SheetNoteDelete: ISheetNoteDeleteEventParams;
    SheetNoteUpdate: ISheetNoteUpdateEventParams;
    SheetNoteShow: ISheetNoteShowEventParams;
    SheetNoteHide: ISheetNoteHideEventParams;
    BeforeSheetNoteAdd: ISheetNoteAddEventParams;
    BeforeSheetNoteDelete: ISheetNoteDeleteEventParams;
    BeforeSheetNoteUpdate: ISheetNoteUpdateEventParams;
    BeforeSheetNoteShow: ISheetNoteShowEventParams;
    BeforeSheetNoteHide: ISheetNoteHideEventParams;
}
/**
 * @ignore
 */
interface IFSheetsNoteEventNameMixin {
    /**
     * Event fired when a note is added
     * @see {@link ISheetNoteAddEventParams}
     * @example
     * ```ts
     * const disposable = univerAPI.addEvent(univerAPI.Event.SheetNoteAdd, (params) => {
     *   const { workbook, worksheet, row, col, note } = params;
     *   console.log(params);
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly SheetNoteAdd: 'SheetNoteAdd';
    /**
     * Event fired when a note is deleted
     * @see {@link ISheetNoteDeleteEventParams}
     * @example
     * ```ts
     * const disposable = univerAPI.addEvent(univerAPI.Event.SheetNoteDelete, (params) => {
     *   const { workbook, worksheet, row, col, oldNote } = params;
     *   console.log(params);
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly SheetNoteDelete: 'SheetNoteDelete';
    /**
     * Event fired when a note is updated
     * @see {@link ISheetNoteUpdateEventParams}
     * @example
     * ```ts
     * const disposable = univerAPI.addEvent(univerAPI.Event.SheetNoteUpdate, (params) => {
     *   const { workbook, worksheet, row, col, note, oldNote } = params;
     *   console.log(params);
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly SheetNoteUpdate: 'SheetNoteUpdate';
    /**
     * Event fired when a note is shown
     * @see {@link ISheetNoteShowEventParams}
     * @example
     * ```ts
     * const disposable = univerAPI.addEvent(univerAPI.Event.SheetNoteShow, (params) => {
     *   const { workbook, worksheet, row, col } = params;
     *   console.log(params);
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly SheetNoteShow: 'SheetNoteShow';
    /**
     * Event fired when a note is hidden
     * @see {@link ISheetNoteHideEventParams}
     * @example
     * ```ts
     * const disposable = univerAPI.addEvent(univerAPI.Event.SheetNoteHide, (params) => {
     *   const { workbook, worksheet, row, col } = params;
     *   console.log(params);
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly SheetNoteHide: 'SheetNoteHide';
    /**
     * Event fired before a note is added
     * @see {@link ISheetNoteAddEventParams}
     * @example
     * ```ts
     * const disposable = univerAPI.addEvent(univerAPI.Event.BeforeSheetNoteAdd, (params) => {
     *   const { workbook, worksheet, row, col, note } = params;
     *   console.log(params);
     *
     *   // Cancel the note addition operation
     *   params.cancel = true;
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly BeforeSheetNoteAdd: 'BeforeSheetNoteAdd';
    /**
     * Event fired before a note is deleted
     * @see {@link ISheetNoteDeleteEventParams}
     * @example
     * ```ts
     * const disposable = univerAPI.addEvent(univerAPI.Event.BeforeSheetNoteDelete, (params) => {
     *   const { workbook, worksheet, row, col, oldNote } = params;
     *   console.log(params);
     *
     *   // Cancel the note deletion operation
     *   params.cancel = true;
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly BeforeSheetNoteDelete: 'BeforeSheetNoteDelete';
    /**
     * Event fired before a note is updated
     * @see {@link ISheetNoteUpdateEventParams}
     * @example
     * ```ts
     * const disposable = univerAPI.addEvent(univerAPI.Event.BeforeSheetNoteUpdate, (params) => {
     *   const { workbook, worksheet, row, col, note, oldNote } = params;
     *   console.log(params);
     *
     *   // Cancel the note update operation
     *   params.cancel = true;
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly BeforeSheetNoteUpdate: 'BeforeSheetNoteUpdate';
    /**
     * Event fired before a note is shown
     * @see {@link ISheetNoteShowEventParams}
     * @example
     * ```ts
     * const disposable = univerAPI.addEvent(univerAPI.Event.BeforeSheetNoteShow, (params) => {
     *   const { workbook, worksheet, row, col } = params;
     *   console.log(params);
     *
     *   // Cancel the note show operation
     *   params.cancel = true;
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly BeforeSheetNoteShow: 'BeforeSheetNoteShow';
    /**
     * Event fired before a note is hidden
     * @see {@link ISheetNoteHideEventParams}
     * @example
     * ```ts
     * const disposable = univerAPI.addEvent(univerAPI.Event.BeforeSheetNoteHide, (params) => {
     *   const { workbook, worksheet, row, col } = params;
     *   console.log(params);
     *
     *   // Cancel the note hide operation
     *   params.cancel = true;
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`
     * ```
     */
    readonly BeforeSheetNoteHide: 'BeforeSheetNoteHide';
}
/**
 * @ignore
 */
export declare class FSheetsNoteEventNameMixin extends FEventName implements IFSheetsNoteEventNameMixin {
    get SheetNoteAdd(): 'SheetNoteAdd';
    get SheetNoteDelete(): 'SheetNoteDelete';
    get SheetNoteUpdate(): 'SheetNoteUpdate';
    get SheetNoteShow(): 'SheetNoteShow';
    get SheetNoteHide(): 'SheetNoteHide';
    get BeforeSheetNoteAdd(): 'BeforeSheetNoteAdd';
    get BeforeSheetNoteDelete(): 'BeforeSheetNoteDelete';
    get BeforeSheetNoteUpdate(): 'BeforeSheetNoteUpdate';
    get BeforeSheetNoteShow(): 'BeforeSheetNoteShow';
    get BeforeSheetNoteHide(): 'BeforeSheetNoteHide';
}
/**
 * @ignore
 */
export interface ISheetsNoteEventParamConfig {
    SheetNoteAdd: ISheetNoteAddEventParams;
    SheetNoteDelete: ISheetNoteDeleteEventParams;
    SheetNoteUpdate: ISheetNoteUpdateEventParams;
    SheetNoteShow: ISheetNoteShowEventParams;
    SheetNoteHide: ISheetNoteHideEventParams;
    BeforeSheetNoteAdd: ISheetNoteAddEventParams;
    BeforeSheetNoteDelete: ISheetNoteDeleteEventParams;
    BeforeSheetNoteUpdate: ISheetNoteUpdateEventParams;
    BeforeSheetNoteShow: ISheetNoteShowEventParams;
    BeforeSheetNoteHide: ISheetNoteHideEventParams;
}
declare module '@univerjs/core/facade' {
    interface FEventName extends IFSheetsNoteEventNameMixin {
    }
    interface IEventParamConfig extends ISheetsNoteEventParamConfig {
    }
}
export {};
