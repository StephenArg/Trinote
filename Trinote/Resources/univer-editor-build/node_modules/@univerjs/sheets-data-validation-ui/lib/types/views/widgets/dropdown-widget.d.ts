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
import type { ICellRenderContext } from '@univerjs/core';
import type { IBaseDataValidationWidget } from '@univerjs/data-validation';
import type { IMouseEvent, IPointerEvent, SpreadsheetSkeleton, UniverRenderingContext2D } from '@univerjs/engine-render';
import { ICommandService, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetDataValidationModel } from '@univerjs/sheets-data-validation';
export interface IDropdownInfo {
    top: number;
    left: number;
    width: number;
    height: number;
}
export declare class DropdownWidget implements IBaseDataValidationWidget {
    private readonly _univerInstanceService;
    private readonly _localeService;
    private readonly _commandService;
    private readonly _renderManagerService;
    private readonly _dataValidationModel;
    private _dropdownInfoMap;
    constructor(_univerInstanceService: IUniverInstanceService, _localeService: LocaleService, _commandService: ICommandService, _renderManagerService: IRenderManagerService, _dataValidationModel: SheetDataValidationModel);
    zIndex?: number | undefined;
    private _ensureMap;
    private _generateKey;
    private _drawDownIcon;
    drawWith(ctx: UniverRenderingContext2D, info: ICellRenderContext, skeleton: SpreadsheetSkeleton): void;
    calcCellAutoHeight(info: ICellRenderContext): number | undefined;
    calcCellAutoWidth(info: ICellRenderContext): number | undefined;
    isHit(position: {
        x: number;
        y: number;
    }, info: ICellRenderContext): boolean;
    onPointerDown(info: ICellRenderContext, evt: IPointerEvent | IMouseEvent): void;
    onPointerEnter(_info: ICellRenderContext, _evt: IPointerEvent | IMouseEvent): void;
    onPointerLeave(_info: ICellRenderContext, _evt: IPointerEvent | IMouseEvent): void;
}
