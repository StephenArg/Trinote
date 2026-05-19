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
import type { Nullable } from '@univerjs/core';
import type { IDragEvent } from '@univerjs/engine-render';
import type { IHoverCellPosition } from './hover-manager.service';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
export interface IDragCellPosition extends IHoverCellPosition {
    dataTransfer: DataTransfer;
}
export declare class DragManagerService extends Disposable {
    private readonly _univerInstanceService;
    private readonly _renderManagerService;
    private _currentCell$;
    currentCell$: import("rxjs").Observable<Nullable<IDragCellPosition>>;
    private _endCell$;
    endCell$: import("rxjs").Observable<Nullable<IDragCellPosition>>;
    constructor(_univerInstanceService: IUniverInstanceService, _renderManagerService: IRenderManagerService);
    dispose(): void;
    private _initCellDisposableListener;
    private _calcActiveCell;
    onDragOver(evt: IDragEvent): void;
    onDrop(evt: IDragEvent): void;
}
