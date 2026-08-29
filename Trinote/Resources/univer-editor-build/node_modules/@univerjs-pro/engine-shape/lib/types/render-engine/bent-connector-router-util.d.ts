import type { IBentConnectorResult, IShapePoint, IShapeRect } from '../shape-type';
import { ShapeDirectionEnum } from '../shape-enum';
/**
 * Route a free-free bent connector line (Excel-like behavior).
 *
 * 根据 Excel 的行为，对首尾都为自由点的 bent 连接线进行布点计算。
 * 该方法不涉及自动 routing、障碍规避或连接点约束，
 * 仅依据 start / end 构成的矩形关系生成折线路径。
 *
 * Core rules / 核心规则：
 *
 * 1. Start point and end point define a local bounding rectangle.
 *    If the width (end.x - start.x) is negative, the width is stored
 *    as an absolute value and flipH is set to true.
 *    The same rule applies to height (flipV) in the vertical direction.
 *
 *    起点和终点共同定义一个局部矩形。
 *    如果 end.x - start.x < 0，则使用 width = abs(width)，
 *    同时记录 flipH = true。
 *    垂直方向同理，记录 flipV。
 *
 * 2. The absolute width and height determine the bend orientation.
 *    If |width| >= |height|, points are generated in
 *    horizontal-first then vertical order (H → V).
 *    Otherwise, points are generated in vertical-first
 *    then horizontal order (V → H).
 *
 *    通过宽高绝对值决定折线方向：
 *    - |width| >= |height|：先横后竖
 *    - |width| <  |height|：先竖后横
 *
 * 3. The returned points are always generated in a normalized
 *    (non-flipped) coordinate space. The actual visual direction
 *    is determined by flipH / flipV.
 *
 *    返回的点始终基于“未翻转”的规范坐标系生成，
 *    实际方向由 flipH / flipV 决定。
 */
export declare function freeRouteBentConnectorLinePoints(startPoint: IShapePoint, endPoint: IShapePoint): IBentConnectorResult;
/**
 * Simplified route connector for normalized inputs.
 * Assumes: logicalStart.x <= logicalEnd.x (start is to the left or same x as end)
 * This reduces the number of cases we need to handle.
 *
 * startDir: direction we're going OUT from start (0=right, 90=down, 180=left, 270=up)
 * endDir: direction we need to ENTER end from (0=right means line approaches from right)
 */
export declare function routeByDirectionsNormalized(points: IShapePoint[], exitPoint: IShapePoint, approachPoint: IShapePoint, startDir: ShapeDirectionEnum, endDir: ShapeDirectionEnum, startBounds: IShapeRect, endBounds: IShapeRect): void;
