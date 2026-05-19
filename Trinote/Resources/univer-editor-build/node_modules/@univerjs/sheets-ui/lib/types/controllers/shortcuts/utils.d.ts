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
import type { IContextService } from '@univerjs/core';
export declare function whenSheetFocused(contextService: IContextService): boolean;
/**
 * Requires the currently focused unit to be Workbook and the sheet editor is focused but not activated.
 * @param contextService
 * @returns If the sheet editor is focused but not activated.
 */
export declare function whenSheetEditorFocused(contextService: IContextService): boolean;
/**
 * Requires the currently focused unit to be Workbook, regardless of whether the cell editor is activated.
 * Used by inline-format shortcuts (bold/italic/underline/strikethrough) so they can also fire
 * inside the cell editor — the corresponding command will route to the docs inline-format command
 * when EDITOR_ACTIVATED is true.
 * @param contextService
 */
export declare function whenSheetFocusedInlineFormat(contextService: IContextService): boolean;
export declare function whenSheetEditorFocusedAndFxNotFocused(contextService: IContextService): boolean;
/**
 * Requires the currently focused unit to be Workbook and the sheet editor is activated.
 * @param contextService
 * @returns If the sheet editor is activated.
 */
export declare function whenSheetEditorActivated(contextService: IContextService): boolean;
export declare function whenEditorActivated(contextService: IContextService): boolean;
/**
 * Requires the currently focused editor is a formula editor.
 * @param contextService
 * @returns If the formula editor is focused.
 */
export declare function whenFormulaEditorFocused(contextService: IContextService): boolean;
/**
 * Requires the currently focused editor is a formula editor, and it is activated.
 * @param contextService
 * @returns If the formula editor is activated.
 */
export declare function whenFormulaEditorActivated(contextService: IContextService): boolean;
/**
 * Requires the currently focused editor is not a formula editor, and it is activated.
 * @param contextService
 * @returns If the editor is activated and the editor is not the formula editor.
 */
export declare function whenEditorDidNotInputFormulaActivated(contextService: IContextService): boolean;
