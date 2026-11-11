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
import { Disposable, Injector, IUniverInstanceService } from '@univerjs/core';
import { ConditionalFormattingRangeTransformService, ConditionalFormattingRuleModel } from '@univerjs/sheets-conditional-formatting';
import { ISheetClipboardService } from '@univerjs/sheets-ui';
export declare class ConditionalFormattingCopyPasteController extends Disposable {
    private _sheetClipboardService;
    private _conditionalFormattingRuleModel;
    private _injector;
    private _univerInstanceService;
    private _conditionalFormattingRangeTransformService;
    private _copyInfo;
    constructor(_sheetClipboardService: ISheetClipboardService, _conditionalFormattingRuleModel: ConditionalFormattingRuleModel, _injector: Injector, _univerInstanceService: IUniverInstanceService, _conditionalFormattingRangeTransformService: ConditionalFormattingRangeTransformService);
    private _initClipboardHook;
    private _collectConditionalRule;
    private _generateConditionalFormattingMutations;
}
