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
import { Disposable, ICommandService, IConfigService } from '@univerjs/core';
import { FormulaDataModel, IDefinedNamesService, IFunctionService, LexerTreeBuilder } from '@univerjs/engine-formula';
import { SheetInterceptorService } from '@univerjs/sheets';
export declare class ArrayFormulaCellInterceptorController extends Disposable {
    private readonly _commandService;
    private readonly _configService;
    private _sheetInterceptorService;
    private readonly _formulaDataModel;
    private readonly _lexerTreeBuilder;
    private readonly _functionService;
    private readonly _definedNamesService;
    constructor(_commandService: ICommandService, _configService: IConfigService, _sheetInterceptorService: SheetInterceptorService, _formulaDataModel: FormulaDataModel, _lexerTreeBuilder: LexerTreeBuilder, _functionService: IFunctionService, _definedNamesService: IDefinedNamesService);
    private _initialize;
    private _commandExecutedListener;
    private _addPrefixToDefinedNamesFunctionSnapshot;
    private _addPrefixToFunctionSnapshot;
    private _writeArrayFormulaToSnapshot;
    private _initInterceptorCellContent;
}
