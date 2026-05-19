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
import { Disposable, IConfigService, LocaleService } from '@univerjs/core';
import { IZenZoneService } from '@univerjs/ui';
import { CellAlertManagerService } from '../services/cell-alert-manager.service';
import { HoverManagerService } from '../services/hover-manager.service';
export declare class ForceStringAlertRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _hoverManagerService;
    private readonly _cellAlertManagerService;
    private readonly _localeService;
    private readonly _zenZoneService;
    private readonly _configService;
    constructor(_context: IRenderContext<Workbook>, _hoverManagerService: HoverManagerService, _cellAlertManagerService: CellAlertManagerService, _localeService: LocaleService, _zenZoneService: IZenZoneService, _configService: IConfigService);
    private _init;
    private _initCellAlertPopup;
    private _initZenService;
    private _hideAlert;
}
