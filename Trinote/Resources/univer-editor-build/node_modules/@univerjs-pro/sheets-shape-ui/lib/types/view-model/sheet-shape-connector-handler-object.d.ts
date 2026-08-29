import type { IShapeProps } from '@univerjs/engine-render';
import { Shape } from '@univerjs/engine-render';
export interface ISheetShapeConnectorHandlerObjectProps extends IShapeProps {
    shapeId: string;
    unitId: string;
    subUnitId: string;
    isStartConnectorPoint: boolean;
}
export declare class SheetShapeConnectorHandlerObject extends Shape<ISheetShapeConnectorHandlerObjectProps> {
    private _shapeId;
    private _index;
    private _unitId;
    private _subUnitId;
    private _isStartConnectorPoint;
    constructor(key?: string, props?: ISheetShapeConnectorHandlerObjectProps);
    getDrawingSearch(): {
        unitId: string;
        subUnitId: string;
        drawingId: string;
    };
    setShapeProps(props: Partial<ISheetShapeConnectorHandlerObjectProps>): void;
    protected _draw(ctx: CanvasRenderingContext2D): void;
}
