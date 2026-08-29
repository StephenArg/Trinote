import type { IShapeData, ShapeTypeEnum } from '@univerjs-pro/engine-shape';
import type { IDrawingParam, ISrcRect, Nullable } from '@univerjs/core';
import type { ISheetShape } from '@univerjs/sheets-drawing';
export type ISheetShapeDrawingParam = ISheetShape & {
    data: {
        shapeType: ShapeTypeEnum;
        shapeData?: IShapeData;
        disablePopup?: boolean;
        fill?: boolean;
        rotateEnabled?: boolean;
        resizeEnabled?: boolean;
        borderEnabled?: boolean;
    };
};
export interface IDrawingShapeData extends IDrawingParam {
    /**
     * 20.1.8.55 srcRect (Source Rectangle)
     */
    srcRect?: Nullable<ISrcRect>;
    /**
     * 20.1.9.18 prstGeom (Preset geometry)
     */
    prstGeom?: Nullable<string>;
}
