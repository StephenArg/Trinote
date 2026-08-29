import type { Workbook } from '@univerjs/core';
import type { IRenderContext } from '@univerjs/engine-render';
import { SheetsShapeService } from '@univerjs-pro/sheets-shape';
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { IDrawingManagerService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetBasicShapeConnectionPointController } from './sheet-basic-shape-connection.controller';
import { SheetShapeAdjustController } from './sheet-shape-adjust.controller';
export declare class SheetShapeConnectorController extends Disposable {
    private readonly _context;
    private readonly _commandService;
    private readonly _renderManagerService;
    private readonly _drawingManagerService;
    private readonly _univerInstanceService;
    private readonly _sheetsShapeService;
    private readonly _sheetShapeAdjustController;
    private readonly _sheetBasicShapeConnectionPointController;
    private _activeShapeId;
    private _unitId;
    private _subUnitId;
    private _connectorObjects;
    /**
     * The base drawing rect at the start of a drag operation.
     * Used for coordinate transformations during connector resize.
     */
    private _baseDrawingRect;
    private _activeShapeModel;
    private _isConnecting;
    private _isDrawingShapePointDown;
    private _hasReset;
    private _cxtHandlerPointerMove;
    private _cxtHandlerPointerUp;
    /** Current connection target (if any) during drag */
    private _currentConnectionTarget;
    constructor(_context: IRenderContext<Workbook>, _commandService: ICommandService, _renderManagerService: IRenderManagerService, _drawingManagerService: IDrawingManagerService, _univerInstanceService: IUniverInstanceService, _sheetsShapeService: SheetsShapeService, _sheetShapeAdjustController: SheetShapeAdjustController, _sheetBasicShapeConnectionPointController: SheetBasicShapeConnectionPointController);
    private _initialize;
    /**
     * Get the current drawing rect from the drawing manager.
     */
    private _getDrawingRect;
    private _addShapeConnectorHandlerObjects;
    /**
     * Add a connector handler object at the given world coordinates.
     * The worldPoint is already in world coordinates (flip applied).
     */
    private _addShapeConnectorHandlerObject;
    private _getScrollInfo;
    private _getZoomRatio;
    /**
     * Handle the pointer up event during connector dragging.
     * Finalizes the connection and executes the appropriate command.
     */
    private _handleConnectorPointerUp;
    /**
     * Handle pointer up when the fixed endpoint is free (not connected).
     */
    private _handleFreeEndpointPointerUp;
    private _handleConnectedEndpointPointerUp;
    /**
     * Execute the command to update connector relation when connecting to a shape.
     */
    private _executeConnectionCommand;
    /**
     * Execute the command to update connector transform without connection.
     */
    private _executeResizeCommand;
    /**
     * Execute the command to update connector with route layout when connecting to a new shape.
     * This handles the case where the fixed endpoint is already connected and we're connecting the moving endpoint.
     */
    private _executeConnectedRouteConnectionCommand;
    /**
     * Execute the command to update connector with route layout without new connection.
     * This handles the case where the fixed endpoint is connected but we're just resizing.
     */
    private _executeConnectedRouteResizeCommand;
    private _attachConnectorObjectEvent;
    /**
     * Handle connector line shape update when a basic shape is moved.
     * - If the connector has only one end connected to the moving shape, move the connector with the shape.
     * - If the connector has both ends connected, re-route the connector line.
     */
    private _handleBasicShapeUpdateConnectorLineShape;
    private _rerouteConnectorLine;
    /**
     * Move a connector line when only one end is connected to a moving shape.
     * The connector follows the shape movement.
     */
    private _moveConnectorWithShape;
    private _clearShapeConnectorHandlerObjects;
    private _registerDrawingMoveHandler;
    private _registerDrawingFocusChangeHandler;
    private _handleConnectedEndpointMove;
    /**
     * Handle connector endpoint move when the fixed endpoint is a free point (not connected).
     * Uses ConnectorCoordinateTransform for layout calculation.
     */
    private _handleFreeEndpointMove;
    /**
     * Get the IConnectPointInfo for a connected shape based on the relation item.
     * This retrieves the world coordinates, angle, and bounds of the connection point.
     */
    private _getConnectPointInfo;
    /**
     * Calculate the angle for a free endpoint based on the relative position to the connected point.
     * Returns the angle that points away from the connected point.
     * 0 = right, 90 = down, 180 = left, 270 = up
     */
    private _calculateFreeEndpointAngle;
    private _reset;
    dispose(): void;
}
