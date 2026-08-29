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
import { FEnum } from '@univerjs/core/facade';
import { TableColumnFilterTypeEnum, TableConditionTypeEnum, TableDateCompareTypeEnum, TableNumberCompareTypeEnum, TableStringCompareTypeEnum } from '@univerjs/sheets-table';
/**
 * @ignore
 */
export interface IFSheetsTableEnumMixin {
    TableColumnFilterTypeEnum: typeof TableColumnFilterTypeEnum;
    TableConditionTypeEnum: typeof TableConditionTypeEnum;
    TableNumberCompareTypeEnum: typeof TableNumberCompareTypeEnum;
    TableStringCompareTypeEnum: typeof TableStringCompareTypeEnum;
    TableDateCompareTypeEnum: typeof TableDateCompareTypeEnum;
}
export declare class FSheetsTableEnumMixin extends FEnum implements IFSheetsTableEnumMixin {
    get TableColumnFilterTypeEnum(): typeof TableColumnFilterTypeEnum;
    get TableConditionTypeEnum(): typeof TableConditionTypeEnum;
    get TableNumberCompareTypeEnum(): typeof TableNumberCompareTypeEnum;
    get TableStringCompareTypeEnum(): typeof TableStringCompareTypeEnum;
    get TableDateCompareTypeEnum(): typeof TableDateCompareTypeEnum;
}
declare module '@univerjs/core/facade' {
    interface FEnum extends IFSheetsTableEnumMixin {
    }
}
