import type { ILineType, IShapeRelation } from '@univerjs-pro/engine-shape';
import type { ICommand } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
export interface IUpdateConnectorRelationCommandParams extends ISheetCommandSharedParams {
    /** The connector shape ID */
    connectorShapeId: string;
    /** New width of the connector */
    width: number;
    /** New height of the connector */
    height: number;
    /** New left position of the connector */
    left: number;
    /** New top position of the connector */
    top: number;
    /** Flip X state */
    flipX: boolean;
    /** Flip Y state */
    flipY: boolean;
    /** Old adjust values for undo */
    oldAdjustValues: Record<string, number>;
    /** New adjust values to set (if provided, uses these instead of clearing) */
    newAdjustValues?: Record<string, number>;
    /** New line type to set (if connector type changed during routing) */
    newLineType?: ILineType;
    oldLineType?: ILineType;
    /** Rotation in degrees (0, 90, 180, 270) for flip + rotation scenarios */
    rotation?: number;
    /** Old relation for undo */
    oldRelation?: IShapeRelation;
    /** New relation to set */
    newRelation?: IShapeRelation;
}
/**
 * Command to update a connector's relation (connection to shapes).
 *
 * This command:
 * 1. Updates the connector's transform (position, size, flip)
 * 2. Clears the adjust values (for automatic routing)
 * 3. Updates the relation property to connect to target shapes
 */
export declare const UpdateConnectorRelationCommand: ICommand;
