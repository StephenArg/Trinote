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
import { BorderStyleTypes, BorderType } from '@univerjs/core';
export interface IBorderInfo {
    type: BorderType;
    color: string | undefined;
    style: BorderStyleTypes;
    activeBorderType: boolean;
}
/**
 * This service is for managing settings border style status.
 */
export declare class BorderStyleManagerService implements IDisposable {
    private readonly _borderInfo;
    private readonly _borderInfo$;
    readonly borderInfo$: import("rxjs").Observable<IBorderInfo>;
    dispose(): void;
    setType(type: BorderType): void;
    setColor(color: string): void;
    setStyle(style: BorderStyleTypes): void;
    setActiveBorderType(status: boolean): void;
    getBorderInfo(): Readonly<IBorderInfo>;
    private _refresh;
}
