import type { IShapeProps } from '@univerjs/engine-render';
import { Shape } from '@univerjs/engine-render';
export interface ISheetBasicShapeConnectionSiteObjectProps extends IShapeProps {
    /** The target shape's ID that this connection site belongs to */
    targetShapeId: string;
    /** The connection site index within the target shape */
    cxnIndex: number;
    /** Unit ID */
    unitId: string;
    /** Sub-unit ID */
    subUnitId: string;
    /** Whether this connection site is highlighted (connector endpoint is nearby) */
    isHighlighted?: boolean;
}
/**
 * Render object for displaying connection sites on shapes.
 * These are the points where connectors can attach.
 */
export declare class SheetBasicShapeConnectionSiteObject extends Shape<ISheetBasicShapeConnectionSiteObjectProps> {
    private _targetShapeId;
    private _cxnIndex;
    private _unitId;
    private _subUnitId;
    private _isHighlighted;
    constructor(key?: string, props?: ISheetBasicShapeConnectionSiteObjectProps);
    /**
     * Get the target shape info for this connection site
     */
    getConnectionInfo(): {
        unitId: string;
        subUnitId: string;
        shapeId: string;
        cxnIndex: number;
    };
    /**
     * Set whether this connection site is highlighted
     */
    setHighlighted(highlighted: boolean): void;
    /**
     * Check if this connection site is highlighted
     */
    isHighlighted(): boolean;
    setShapeProps(props: Partial<ISheetBasicShapeConnectionSiteObjectProps>): void;
    protected _draw(ctx: CanvasRenderingContext2D): void;
}
