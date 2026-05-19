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
import type { IAccessor } from '@univerjs/core';
import type { IMenuItem } from '@univerjs/ui';
export declare function InsertCommonFunctionMenuItemFactory(accessor: IAccessor): IMenuItem;
export declare const InsertFinancialFunctionMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertLogicalFunctionMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertTextFunctionMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertDateFunctionMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertLookupFunctionMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertMathFunctionMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertStatisticalFunctionMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertEngineeringFunctionMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertInformationFunctionMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertDatabaseFunctionMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare function AllFunctionsMenuItemFactory(accessor: IAccessor): IMenuItem;
export declare function CopyFormulaOnlyMenuItemFactory(accessor: IAccessor): IMenuItem;
export declare function PasteFormulaMenuItemFactory(accessor: IAccessor): IMenuItem;
