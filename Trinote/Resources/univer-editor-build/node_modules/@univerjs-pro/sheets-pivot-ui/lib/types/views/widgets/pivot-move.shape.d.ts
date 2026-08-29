import type { IShapeProps, UniverRenderingContext, UniverRenderingContext2D } from '@univerjs/engine-render';
import { Shape } from '@univerjs/engine-render';
export declare const SHEET_PIVOT_MOVE_KEY = "SHEET_PIVOT_MOVE_KEY";
interface ISheetPivotTableMoveShapeProps {
}
export declare class SheetsPivotTableMoveShape extends Shape<ISheetPivotTableMoveShapeProps> {
    private _moveType;
    constructor(moveType: 'row' | 'col');
    protected _draw(ctx: UniverRenderingContext2D): void;
    static drawWith(ctx: UniverRenderingContext, props: IShapeProps & {
        _moveType: 'row' | 'col';
    }): void;
}
export {};
