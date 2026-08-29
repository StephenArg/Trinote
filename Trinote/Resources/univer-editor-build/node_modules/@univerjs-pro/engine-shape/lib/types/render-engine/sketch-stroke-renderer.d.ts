import { ShapeSketchTypeEnum } from '../shape-enum';
/**
 * Resolved (numeric) path command after gd evaluation and scaling.
 * Used by SketchStrokeRenderer to draw sketch-style strokes.
 */
export type IResolvedPathCommand = {
    cmd: 'M';
    x: number;
    y: number;
} | {
    cmd: 'L';
    x: number;
    y: number;
} | {
    cmd: 'C';
    cp1x: number;
    cp1y: number;
    cp2x: number;
    cp2y: number;
    x: number;
    y: number;
} | {
    cmd: 'Q';
    cpx: number;
    cpy: number;
    x: number;
    y: number;
} | {
    cmd: 'A';
    centerX: number;
    centerY: number;
    wR: number;
    hR: number;
    startAngle: number;
    endAngle: number;
    anticlockwise: boolean;
} | {
    cmd: 'z';
};
/**
 * Renders shape stroke with a hand-drawn / sketch visual effect.
 *
 * All sketch-related rendering logic lives here. The caller is responsible
 * for setting strokeStyle, lineWidth, lineDash, lineJoin, lineCap on the
 * canvas context *before* calling render().
 */
export declare class SketchStrokeRenderer {
    /**
     * Build and stroke a sketch-style path on `ctx`.
     *
     * @param ctx       Canvas rendering context (strokeStyle etc. should already be configured)
     * @param commands  The resolved (numeric) path commands that describe the original shape outline
     * @param sketchType  Which sketch mode to apply
     * @param seed      Integer seed for the seeded RNG – same seed produces identical output
     */
    static render(ctx: CanvasRenderingContext2D, commands: IResolvedPathCommand[], sketchType: ShapeSketchTypeEnum, seed: number): void;
    private static _renderPass;
    /**
     * Draw a sketchy straight line from (x0,y0) to (x1,y1).
     *
     * The line is split into sub-segments.  Each interior split point is
     * displaced perpendicularly by a seeded-random amount.  The resulting
     * noisy chain is smoothed with a chain of quadratic bezier curves so the
     * output looks like a natural hand-drawn stroke rather than a polygon.
     */
    private static _sketchLine;
    /**
     * Draw a sketchy cubic bezier by perturbing the control points.
     */
    private static _sketchCubic;
    /**
     * Draw a sketchy quadratic bezier by perturbing the control point.
     */
    private static _sketchQuadratic;
    /**
     * Draw a sketchy ellipse arc by applying slight noise to the center and radii.
     */
    private static _sketchArc;
}
