import type { IConnectorLayoutResult, IDrawingRect, IShapePoint } from '../shape-type';
/**
 * ConnectorCoordinateTransform
 *
 * This utility class handles coordinate transformations for connector shapes.
 * It provides a unified way to convert between three coordinate systems:
 *
 * 1. **World Coordinates**: Absolute position on the canvas/scene.
 *    - Origin is at the top-left of the canvas.
 *    - These are the coordinates used for hit testing, pointer events, etc.
 *
 * 2. **Drawing Rect Coordinates**: Relative to the drawing's top-left corner.
 *    - The drawing rect has left, top, width, height, flipX, flipY.
 *    - When flipX=true, the X axis is reversed (right becomes left).
 *    - When flipY=true, the Y axis is reversed (bottom becomes top).
 *
 * 3. **Local Coordinates**: Normalized internal coordinates for the shape.
 *    - Always in range [0, width] x [0, height].
 *    - Flip is already "baked in" - the shape renders as if no flip exists.
 *    - Start point is always at (0,0) or near it in local space.
 *
 * The key insight is:
 * - The shape model stores points in LOCAL coordinates (flip-agnostic).
 * - The drawing service stores the bounding RECT in WORLD coordinates with flip flags.
 * - When we drag endpoints, we work in WORLD coordinates and must properly
 *   compute both the new LOCAL points and the new WORLD rect (with flip).
 *
 * This class eliminates scattered flip calculations by providing clean APIs.
 */
export declare class ConnectorCoordinateTransform {
    private _drawingRect;
    constructor(drawingRect: IDrawingRect);
    /**
     * Get the current drawing rect.
     */
    get drawingRect(): IDrawingRect;
    /**
     * Update the drawing rect.
     */
    setDrawingRect(rect: IDrawingRect): void;
    /**
     * Convert a world coordinate to local coordinate.
     *
     * Local coordinates are always normalized (0 to width/height),
     * with flip transformations applied.
     *
     * @param worldPoint Point in world coordinates
     * @returns Point in local coordinates
     */
    worldToLocal(worldPoint: IShapePoint): IShapePoint;
    /**
     * Convert a local coordinate to world coordinate.
     *
     * @param localPoint Point in local coordinates (0 to width/height)
     * @returns Point in world coordinates
     */
    localToWorld(localPoint: IShapePoint): IShapePoint;
    /**
     * Given the current start/end points in WORLD coordinates,
     * compute the new drawing rect and local points.
     *
     * This is the core method for connector resize operations.
     * It determines:
     * 1. The new bounding rect (left, top, width, height)
     * 2. Whether flip is needed (flipX, flipY)
     * 3. The normalized local points (0 to width/height)
     *
     * Key insight: In Excel-like behavior, the "start" point is always
     * considered the anchor in local coordinates. If end.x < start.x,
     * we flip horizontally so that in local space, end.x > start.x.
     *
     * @param startWorld Start point in world coordinates
     * @param endWorld End point in world coordinates
     * @returns The layout result with local points and world rect
     */
    static computeConnectorLayout(startWorld: IShapePoint, endWorld: IShapePoint): IConnectorLayoutResult;
    /**
     * Given a bent connector (3+ segment line), compute the layout.
     *
     * This generates intermediate points for an L-shaped or Z-shaped connector.
     *
     * @param startWorld Start point in world coordinates
     * @param endWorld End point in world coordinates
     * @param bendType 'horizontal-first' or 'vertical-first' or 'auto'
     * @returns The layout result with all points and world rect
     */
    static computeBentConnectorLayout(startWorld: IShapePoint, endWorld: IShapePoint, bendType?: 'horizontal-first' | 'vertical-first' | 'auto'): IConnectorLayoutResult;
    static getBentTypeFromPoints(points: IShapePoint[], isCurved?: boolean): 'horizontal-first' | 'vertical-first';
    /**
     * When dragging one endpoint of an existing connector,
     * compute the new layout while keeping the other endpoint fixed.
     *
     * @param fixedWorld The endpoint that stays fixed (in world coordinates)
     * @param movingWorld The endpoint being dragged (in world coordinates)
     * @param isMovingStart Whether the moving point is the start (true) or end (false)
     * @param bendType Bend type for bent connectors
     * @returns The new layout
     */
    static computeConnectorResizeLayout(fixedWorld: IShapePoint, movingWorld: IShapePoint, isMovingStart: boolean, bendType?: 'horizontal-first' | 'vertical-first' | 'auto'): IConnectorLayoutResult;
    static computeStraightConnectorLayout(startWorld: IShapePoint, endWorld: IShapePoint): IConnectorLayoutResult;
    /**
     * Convert the local points to world coordinates for display.
     * Useful for rendering connector handler points.
     *
     * @param localPoints Array of points in local coordinates
     * @returns Array of points in world coordinates
     */
    localPointsToWorld(localPoints: IShapePoint[]): IShapePoint[];
    /**
     * Get the start point in world coordinates.
     * The start is always at local (0, 0).
     */
    getStartPointWorld(): IShapePoint;
    /**
     * Get the end point in world coordinates.
     * The end is always at local (width, height).
     */
    getEndPointWorld(): IShapePoint;
}
