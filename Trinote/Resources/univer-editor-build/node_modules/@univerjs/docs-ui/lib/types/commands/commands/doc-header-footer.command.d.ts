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
import { BooleanNumber } from '@univerjs/core';
import { HeaderFooterType } from '../../controllers/doc-header-footer.controller';
export interface IHeaderFooterProps {
    marginHeader?: number;
    marginFooter?: number;
    useFirstPageHeaderFooter?: BooleanNumber;
    evenAndOddHeaders?: BooleanNumber;
}
export interface ICoreHeaderFooterParams {
    unitId: string;
    createType?: HeaderFooterType;
    segmentId?: string;
    headerFooterProps?: IHeaderFooterProps;
}
export declare const CoreHeaderFooterCommandId = "doc.command.core-header-footer";
/**
 * The command to update header and footer or create them.
 */
export declare const CoreHeaderFooterCommand: ICommand<ICoreHeaderFooterParams>;
interface IOpenHeaderFooterPanelParams {
}
export declare const OpenHeaderFooterPanelCommand: ICommand<IOpenHeaderFooterPanelParams>;
interface ICloseHeaderFooterParams {
    unitId: string;
}
export declare const CloseHeaderFooterCommand: ICommand<ICloseHeaderFooterParams>;
export {};
