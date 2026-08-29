import type { IConnectorRouteLayoutResult, IConnectPointInfo, ILineType, IShapePoint, IShapeRect } from '../shape-type';
export declare const BENT_CONNECTOR_HANDLE_OFFSET = 40;
export declare function routeConnectorLineShape(startInfo: IConnectPointInfo, endInfo: IConnectPointInfo, lineType: ILineType): IShapePoint[];
/**
 * Rotate a point around a center point by a given angle.
 * Positive angle = counter-clockwise rotation.
 * Used to de-rotate points before calculating adjust values.
 */
export declare function rotatePointAroundCenter(point: IShapePoint, center: IShapePoint, angleInDegrees: number): IShapePoint;
/**
 * In excel, the basic shape with rotate bound use major axis switch, xis-aligned bound will bu used.
 * 在excel中，基本形状的旋转边界使用主轴切换，将使用轴对齐边界。也就是说，一个shape旋转了44度的时候，接近他的是0度，因此他的bound也是0度的bound
 * 如果旋转到了45度，则接近他的就是90度，因此他的bound就是90度的bound
 * [-45°, 45°) -> 0° 横向
 * [45°, 135°) -> 90° 纵向
 * [135°, 225°) -> 180° 横向
 * [225°, 315°) -> 270° 纵向
 * @param bound The original axis-aligned bound
 * @param angle The rotation angle in degrees
 * @return {IShapeRect} The axis-aligned bound after rotation
 */
export declare function getBasicShapeRotateBound(bound: IShapeRect, angle: number): IShapeRect;
export declare function computeStraightConnectorRouteLayout(routedPoints: IShapePoint[], originalLineType: ILineType): IConnectorRouteLayoutResult;
export declare function computeConnectorRouteLayout(routedPoints: IShapePoint[], originalLineType: ILineType): IConnectorRouteLayoutResult;
/**
 * Route a bent connector line between two connected shapes.
 *
 * This algorithm generates a polyline path that:
 * 1. Exits the start shape in the direction specified by startInfo.angle
 * 2. Routes around shapes to avoid overlap
 * 3. Enters the end shape from the direction specified by endInfo.angle
 *
 * Optimization: To reduce complexity, we normalize the input so that the
 * "logical start" is always at the top-left relative to the "logical end".
 * If needed, we swap the inputs and reverse the result at the end.
 *
 * The algorithm considers all 16 combinations of the 4 cardinal directions:
 * - 0° = right, 90° = down, 180° = left, 270° = up
 *
 * @param startInfo - Connection point info for the start shape
 * @param endInfo - Connection point info for the end shape
 * @returns Array of points forming the bent connector path
 */
export declare function routeBentConnectorLineShape(startInfo: IConnectPointInfo, endInfo: IConnectPointInfo): IShapePoint[];
