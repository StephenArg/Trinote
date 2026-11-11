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
import type { Editor } from '@univerjs/docs-ui';
import { KeyCode, MetaKeys } from '@univerjs/ui';
import { FormulaSelectingType } from './use-formula-selection';
export declare function shouldMoveFormulaSelectionFromCurrentSelection(selectingType: FormulaSelectingType, refSelectionCount: number): boolean;
export interface IFormulaEditorInteractionOwnerOptions {
    fxBarFocused?: boolean;
    formulaBarEditorId?: string;
    normalEditorId?: string;
    allowMissingFocus?: boolean;
}
export declare function isFormulaEditorInteractionOwner(focusEditorId: string | null | undefined | void, editorId: string, options?: IFormulaEditorInteractionOwnerOptions): boolean;
export declare const useLeftAndRightArrow: (isNeed: boolean, shouldMoveSelection: FormulaSelectingType, editor?: Editor, onMoveInEditor?: (keyCode: KeyCode, metaKey?: MetaKeys) => void, getRefSelectionCount?: () => number) => void;
