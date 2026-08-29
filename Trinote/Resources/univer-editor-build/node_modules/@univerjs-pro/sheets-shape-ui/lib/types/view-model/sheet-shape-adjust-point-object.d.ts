import type { IShapeProps } from '@univerjs/engine-render';
import { Shape } from '@univerjs/engine-render';
export interface ISheetShapeAdjustPointObjectProps extends IShapeProps {
    shapeId: string;
    adjName: string;
    unitId: string;
    subUnitId: string;
}
export declare class SheetShapeAdjustPointObject extends Shape<ISheetShapeAdjustPointObjectProps> {
    private _shapeId;
    private _adjName;
    private _unitId;
    private _subUnitId;
    constructor(key?: string, props?: ISheetShapeAdjustPointObjectProps);
    getDrawingSearch(): {
        unitId: string;
        subUnitId: string;
        drawingId: string;
    };
    setShapeProps(props: Partial<ISheetShapeAdjustPointObjectProps>): void;
    protected _draw(ctx: CanvasRenderingContext2D): void;
}
