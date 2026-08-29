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
import type { IMouseEvent, IPointerEvent, UniverRenderingContext2D } from '@univerjs/engine-render';
import { ICommandService, IUniverInstanceService, ThemeService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { DataValidationFormulaService, SheetDataValidationModel } from '@univerjs/sheets-data-validation';
export declare class CheckboxRender implements IBaseDataValidationWidget {
    private readonly _commandService;
    private readonly _univerInstanceService;
    private readonly _formulaService;
    private readonly _themeService;
    private readonly _renderManagerService;
    private readonly _dataValidationModel;
    private _calc;
    constructor(_commandService: ICommandService, _univerInstanceService: IUniverInstanceService, _formulaService: DataValidationFormulaService, _themeService: ThemeService, _renderManagerService: IRenderManagerService, _dataValidationModel: SheetDataValidationModel);
    calcCellAutoHeight(info: ICellRenderContext): number | undefined;
    calcCellAutoWidth(info: ICellRenderContext): number | undefined;
    private _parseFormula;
    drawWith(ctx: UniverRenderingContext2D, info: ICellRenderContext): void;
    isHit(evt: {
        x: number;
        y: number;
    }, info: ICellRenderContext): boolean;
    onPointerDown(info: ICellRenderContext, evt: IPointerEvent | IMouseEvent): Promise<void>;
    onPointerEnter(info: ICellRenderContext, evt: IPointerEvent | IMouseEvent): void;
    onPointerLeave(info: ICellRenderContext, evt: IPointerEvent | IMouseEvent): void;
}
