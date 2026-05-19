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
import type { IDisposable } from '@univerjs/core';
import type { IFunctionInfo, IFunctionNames } from '@univerjs/engine-formula';
import { Disposable, IConfigService, LocaleService } from '@univerjs/core';
import { FunctionType, IFunctionService } from '@univerjs/engine-formula';
export interface ISearchItem {
    name: string;
    desc: string;
}
export interface ISearchItemWithType extends ISearchItem {
    functionType: FunctionType;
}
export interface IDescriptionService {
    /**
     * get all descriptions
     */
    getDescriptions(): Map<IFunctionNames, IFunctionInfo>;
    hasFunction(searchText: string): boolean;
    /**
     * get function info by name
     */
    getFunctionInfo(searchText: string): IFunctionInfo | undefined;
    /**
     * get search list by name
     */
    getSearchListByName(searchText: string): ISearchItem[];
    /**
     * get search list by name, from first letter
     */
    getSearchListByNameFirstLetter(searchText: string): ISearchItemWithType[];
    /**
     * get search list by type, if type is -1, return all
     */
    getSearchListByType(type: number): ISearchItem[];
    /**
     * register descriptions
     */
    registerDescriptions(functionList: IFunctionInfo[]): IDisposable;
    /**
     * unregister descriptions
     */
    unregisterDescriptions(functionNames: string[]): void;
    /**
     * check if has description
     */
    hasDescription(name: string): boolean;
    /**
     * check if has defined name description
     */
    hasDefinedNameDescription(name: string): boolean;
    /**
     * check if is formula defined name
     */
    isFormulaDefinedName(name: string): boolean;
}
export declare const IDescriptionService: import("@wendellhu/redi").IdentifierDecorator<IDescriptionService>;
export declare class DescriptionService extends Disposable implements IDescriptionService {
    private readonly _functionService;
    private readonly _localeService;
    private readonly _configService;
    private _descriptions;
    constructor(_functionService: IFunctionService, _localeService: LocaleService, _configService: IConfigService);
    private _initialize;
    private _initDescriptions;
    private _initRegisterDescriptions;
    private _registerDescriptions;
    dispose(): void;
    getDescriptions(): Map<IFunctionNames, IFunctionInfo>;
    hasFunction(searchText: string): boolean;
    getFunctionInfo(searchText: string): IFunctionInfo | undefined;
    getSearchListByName(searchText: string): ISearchItem[];
    getSearchListByNameFirstLetter(searchText: string): ISearchItemWithType[];
    getSearchListByType(type: number): ISearchItem[];
    registerDescriptions(descriptions: IFunctionInfo[]): IDisposable;
    unregisterDescriptions(functionNames: string[]): void;
    hasDescription(name: string): boolean;
    hasDefinedNameDescription(name: string): boolean;
    isFormulaDefinedName(name: string): boolean;
}
