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
import type { IAccessor, Worksheet } from '@univerjs/core';
export declare enum DisableLinkType {
    ALLOWED = 0,
    DISABLED_BY_CELL = 1,
    ALLOW_ON_EDITING = 2
}
export declare const getShouldDisableCellLink: (accessor: IAccessor, worksheet: Worksheet, row: number, col: number) => true | DisableLinkType;
export declare const getShouldDisableCurrentCellLink: (accessor: IAccessor) => boolean;
export declare const shouldDisableAddLink: (accessor: IAccessor) => boolean;
