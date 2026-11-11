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
import type { Workbook } from '@univerjs/core';
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { Disposable, ICommandService, IConfigService, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { INumfmtService, SheetsSelectionsService } from '@univerjs/sheets';
import { CellAlertManagerService } from '@univerjs/sheets-ui';
export declare class NumfmtAlertRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _selectionManagerService;
    private readonly _cellAlertManagerService;
    private readonly _localeService;
    private _numfmtService;
    private readonly _configService;
    private readonly _commandService;
    private readonly _univerInstanceService;
    constructor(_context: IRenderContext<Workbook>, _selectionManagerService: SheetsSelectionsService, _cellAlertManagerService: CellAlertManagerService, _localeService: LocaleService, _numfmtService: INumfmtService, _configService: IConfigService, _commandService: ICommandService, _univerInstanceService: IUniverInstanceService);
    private _init;
    private _initCellAlertPopup;
    private _isCurrentSheet;
    private _updateAlert;
    private get _alertKey();
    private _hideAlert;
}
