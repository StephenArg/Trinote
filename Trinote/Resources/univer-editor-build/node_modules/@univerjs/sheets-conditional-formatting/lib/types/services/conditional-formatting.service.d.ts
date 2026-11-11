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
import { Disposable, ICommandService, Injector, IResourceManagerService, IUniverInstanceService } from '@univerjs/core';
import { SheetInterceptorService } from '@univerjs/sheets';
import { ConditionalFormattingRangeIndexModel } from '../models/conditional-formatting-range-index-model';
import { ConditionalFormattingRuleModel } from '../models/conditional-formatting-rule-model';
import { ConditionalFormattingViewModel } from '../models/conditional-formatting-view-model';
import { ConditionalFormattingStyleComposer } from './conditional-formatting-style-composer.service';
export declare class ConditionalFormattingService extends Disposable {
    private _conditionalFormattingRuleModel;
    private _conditionalFormattingRangeIndexModel;
    private _conditionalFormattingStyleComposer;
    private _injector;
    private _univerInstanceService;
    private _resourceManagerService;
    private _sheetInterceptorService;
    private _commandService;
    get _conditionalFormattingViewModelV2(): ConditionalFormattingViewModel;
    constructor(_conditionalFormattingRuleModel: ConditionalFormattingRuleModel, _conditionalFormattingRangeIndexModel: ConditionalFormattingRangeIndexModel, _conditionalFormattingStyleComposer: ConditionalFormattingStyleComposer, _injector: Injector, _univerInstanceService: IUniverInstanceService, _resourceManagerService: IResourceManagerService, _sheetInterceptorService: SheetInterceptorService, _commandService: ICommandService);
    composeStyle(unitId: string, subUnitId: string, row: number, col: number): ({
        style?: import("..").IHighlightCell["style"];
    } & import("..").IDataBarCellData & import("..").IIconSetCellData & {
        isShowValue: boolean;
    }) | null;
    private _initSnapshot;
    private _initSheetChange;
    private _initCellChange;
}
