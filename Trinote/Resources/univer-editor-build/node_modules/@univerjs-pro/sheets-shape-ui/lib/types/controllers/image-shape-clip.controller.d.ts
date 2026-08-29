import { ShapeTypeEnum } from '@univerjs-pro/engine-shape';
import { Disposable } from '@univerjs/core';
import { IDrawingManagerService } from '@univerjs/drawing';
import { DrawingImageClipService } from '@univerjs/drawing-ui';
export declare class ImageShapeClipController extends Disposable {
    private readonly _clipService;
    private readonly _drawingManagerService;
    constructor(_clipService: DrawingImageClipService, _drawingManagerService: IDrawingManagerService);
    /**
     * Register the shape clip delegate with DrawingImageClipService.
     * This enables shape-based clipping for images when a prstGeom is set.
     */
    private _registerImageShapeClipDelegate;
    clipByShape(unitId: string, subUnitId: string, imageId: string, shapeType: ShapeTypeEnum, adjustValues?: Record<string, number>): void;
}
