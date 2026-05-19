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
import type { INumfmtLocaleTag } from '@univerjs/core';
import { Disposable, ICommandService, IConfigService, IUniverInstanceService, LocaleService, ThemeService } from '@univerjs/core';
import { INumfmtService, SheetInterceptorService } from '@univerjs/sheets';
export declare class SheetsNumfmtCellContentController extends Disposable {
    private readonly _instanceService;
    private _sheetInterceptorService;
    private _themeService;
    private _commandService;
    private _numfmtService;
    private _localeService;
    private readonly _configService;
    private _locale$;
    locale$: import("rxjs").Observable<INumfmtLocaleTag>;
    constructor(_instanceService: IUniverInstanceService, _sheetInterceptorService: SheetInterceptorService, _themeService: ThemeService, _commandService: ICommandService, _numfmtService: INumfmtService, _localeService: LocaleService, _configService: IConfigService);
    get locale(): INumfmtLocaleTag;
    private _initInterceptorCellContent;
    setNumfmtLocal(locale: INumfmtLocaleTag): void;
}
