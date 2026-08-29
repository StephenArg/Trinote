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
import type { IRange, Worksheet } from '@univerjs/core';
import type { ISheetHyperLinkInfo } from '@univerjs/sheets-hyper-link';
import { ICommandService, IConfigService, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { IDefinedNamesService } from '@univerjs/engine-formula';
import { IMessageService } from '@univerjs/ui';
export declare class SheetsHyperLinkResolverService {
    private _univerInstanceService;
    private _commandService;
    private _definedNamesService;
    private _messageService;
    private _localeService;
    private _configService;
    constructor(_univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _definedNamesService: IDefinedNamesService, _messageService: IMessageService, _localeService: LocaleService, _configService: IConfigService);
    navigate(info: ISheetHyperLinkInfo): void;
    private _navigateToUniver;
    navigateToRange(unitId: string, subUnitId: string, range: IRange, forceTop?: boolean): Promise<void>;
    navigateToSheetById(unitId: string, subUnitId: string): Promise<false | Worksheet>;
    navigateToDefineName(unitId: string, rangeId: string): Promise<boolean>;
    navigateToOtherWebsite(url: string): Promise<void>;
}
