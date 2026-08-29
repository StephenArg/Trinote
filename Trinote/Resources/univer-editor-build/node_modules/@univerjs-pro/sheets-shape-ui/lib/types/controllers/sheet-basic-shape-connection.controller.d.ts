import type { IShapePoint, IShapeRelationItem } from '@univerjs-pro/engine-shape';
import type { Workbook } from '@univerjs/core';
import type { IRenderContext, Scene } from '@univerjs/engine-render';
import { SheetsShapeService } from '@univerjs-pro/sheets-shape';
import { Disposable } from '@univerjs/core';
import { IDrawingManagerService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
/**
 * Information about a potential connection target
 */
export interface IConnectionTarget {
    /** The target shape's ID */
    shapeId: string;
    /** The connection site index */
    cxnIndex: number;
    /** Unit ID */
    unitId: string;
    /** Sub-unit ID */
    subUnitId: string;
    /** World coordinates of the connection site */
    worldPoint: IShapePoint;
    /** Connection site angle in degrees (0 = right, 90 = down, 180 = left, 270 = up) */
    angle: number;
}
/**
 * Controller for managing connection sites on shapes.
 *
 * This controller is responsible for:
 * 1. Detecting when a connector endpoint enters a shape's bounds
 * 2. Displaying connection sites for that shape
 * 3. Highlighting the nearest connection site when the endpoint is close enough
 * 4. Providing connection information when the endpoint is released on a connection site
 */
export declare class SheetBasicShapeConnectionPointController extends Disposable {
    private readonly _context;
    private readonly _renderManagerService;
    private readonly _drawingManagerService;
    private readonly _sheetsShapeService;
    /** Currently displayed connection site objects */
    private _connectionSiteObjects;
    /** The shape ID whose connection sites are currently being shown */
    private _activeTargetShapeId;
    /** The currently highlighted connection site (if any) */
    private _highlightedSiteIndex;
    /** Current scene reference */
    private _currentScene;
    /** Current unit/subUnit context */
    private _unitId;
    private _subUnitId;
    /** The connector shape ID that is being dragged (to exclude from target detection) */
    private _draggingConnectorId;
    constructor(_context: IRenderContext<Workbook>, _renderManagerService: IRenderManagerService, _drawingManagerService: IDrawingManagerService, _sheetsShapeService: SheetsShapeService);
    /**
     * Called when connector endpoint dragging starts.
     * Sets up the context for connection site detection.
     */
    startConnectionDetection(scene: Scene, unitId: string, subUnitId: string, draggingConnectorId: string): void;
    /**
     * Called during connector endpoint dragging.
     * Detects if the endpoint enters a shape's bounds and shows connection sites.
     *
     * @param worldPoint The current world coordinates of the dragging endpoint
     * @returns The nearest connection target if within hit radius, null otherwise
     */
    updateConnectionDetection(worldPoint: IShapePoint): IConnectionTarget | null;
    /**
     * Called when connector endpoint dragging ends.
     * Cleans up connection site display.
     */
    endConnectionDetection(): void;
    /**
     * Get the connection relation item for the current highlighted connection site.
     * This should be called when the connector endpoint is released.
     */
    getConnectionRelation(): IShapeRelationItem | null;
    /**
     * Find a non-connector shape at the given world point.
     */
    private _findShapeAtPoint;
    /**
     * Show connection sites for the given shape.
     */
    private _showConnectionSites;
    /**
     * Find the nearest connection site to the given world point.
     * Highlights the nearest site if within hit radius.
     */
    private _findNearestConnectionSite;
    /**
     * Get the angle for a connection site, adjusted for shape's flip state.
     * @param shapeId The shape ID
     * @param cxnIndex The connection site index
     * @returns The angle in degrees (0 = right, 90 = down, 180 = left, 270 = up)
     */
    private _getConnectionSiteAngle;
    /**
     * Clear all displayed connection sites.
     */
    private _clearConnectionSites;
    dispose(): void;
}
