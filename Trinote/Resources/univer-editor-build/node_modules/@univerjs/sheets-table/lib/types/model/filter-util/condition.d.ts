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
import type { IDocumentData, Worksheet } from '@univerjs/core';
import type { TableStringCompareTypeEnum } from '../../types/enum';
import type { ICalculatedOptions, ITableConditionFilterItem } from '../../types/type';
import { TableConditionTypeEnum, TableDateCompareTypeEnum, TableNumberCompareTypeEnum } from '../../types/enum';
type TableConditionCompareType = TableNumberCompareTypeEnum | TableDateCompareTypeEnum | TableStringCompareTypeEnum;
export declare function isNumberDynamicFilter(compareType: TableConditionCompareType): compareType is TableNumberCompareTypeEnum;
export declare function isDateDynamicFilter(compareType: TableConditionCompareType): compareType is TableDateCompareTypeEnum;
export declare function getConditionExecuteFunc(filter: ITableConditionFilterItem, calculatedOptions: ICalculatedOptions | undefined): ((date: Date) => boolean) | ((value: number) => boolean) | ((value: string) => boolean);
export declare function getCellValueWithConditionType(sheet: Worksheet, row: number, col: number, conditionType: TableConditionTypeEnum): string | number | Date | null | undefined;
export declare const getStringFromDataStream: (data: IDocumentData) => string;
export declare function excelSerialToDateTime(serial: number): Date;
export {};
