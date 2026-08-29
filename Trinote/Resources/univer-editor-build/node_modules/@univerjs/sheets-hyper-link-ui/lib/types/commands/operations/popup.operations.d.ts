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
import type { ICommand } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
import { HyperLinkEditSourceType } from '../../types/enums/edit-source';
export interface IOpenHyperLinkEditPanelOperationParams extends ISheetCommandSharedParams {
    row: number;
    col: number;
    customRangeId?: string;
    type: HyperLinkEditSourceType;
}
export declare const OpenHyperLinkEditPanelOperation: ICommand<IOpenHyperLinkEditPanelOperationParams>;
export declare const CloseHyperLinkPopupOperation: ICommand;
export declare const InsertHyperLinkOperation: ICommand;
export declare const InsertHyperLinkToolbarOperation: ICommand;
