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
import type { IDataValidationRule, IDisposable, Nullable } from '@univerjs/core';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { ISidebarService } from '@univerjs/ui';
export declare class DataValidationPanelService extends Disposable {
    private readonly _univerInstanceService;
    private readonly _sidebarService;
    private _open$;
    readonly open$: import("rxjs").Observable<boolean>;
    private _activeRule;
    private _activeRule$;
    readonly activeRule$: import("rxjs").Observable<Nullable<{
        unitId: string;
        subUnitId: string;
        rule: IDataValidationRule;
    }>>;
    get activeRule(): Nullable<{
        unitId: string;
        subUnitId: string;
        rule: IDataValidationRule;
    }>;
    get isOpen(): boolean;
    private _closeDisposable;
    private _focusFormulaEditorActiveRuleSubUnitId;
    constructor(_univerInstanceService: IUniverInstanceService, _sidebarService: ISidebarService);
    dispose(): void;
    open(): void;
    close(): void;
    setCloseDisposable(disposable: IDisposable): void;
    setActiveRule(rule: Nullable<{
        unitId: string;
        subUnitId: string;
        rule: IDataValidationRule;
    }>): void;
    setFocusFormulaEditorActiveRuleSubUnitId(subUnitId: string | null): void;
    getFocusFormulaEditorActiveRuleSubUnitId(): string | null;
}
