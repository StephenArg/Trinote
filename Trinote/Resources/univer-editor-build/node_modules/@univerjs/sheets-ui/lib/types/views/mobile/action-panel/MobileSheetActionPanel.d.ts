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
import type { Worksheet } from '@univerjs/core';
import type { ISelectionWithStyle } from '@univerjs/sheets';
import type { IValueOption } from '@univerjs/ui';
import type { IMobileStyleCommand } from './MobileStylePanel';
export declare function getMobileCellRevealOffset(cellTop: number, cellBottom: number, safeTop: number, safeBottom: number): number;
export declare function getMobileCellCenterOffset(cellTop: number, cellBottom: number, safeTop: number, safeBottom: number): number;
export declare function getMobileEditingMenuBottomOffset(formulaOperatorsVisible: boolean): number;
export declare function normalizeMobileSelectionPrimary(selections: Readonly<ISelectionWithStyle[]>, worksheet: Pick<Worksheet, 'getMergedCell'>): ISelectionWithStyle[] | null;
export declare function getMobileMenuCommand(params: IValueOption | IMobileStyleCommand): {
    commandId: string;
    commandParams?: Record<string, unknown>;
} | null;
export declare function MobileSheetActionPanel(): import("react").JSX.Element | null;
