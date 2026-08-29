import type { ICommand } from '@univerjs/core';
import { ShapeTypeEnum } from '@univerjs-pro/engine-shape';
interface IEnhanceParams {
    /**
     * whether to show arrow at the end of the line, only work when the shape is a connector
     */
    endArrow?: boolean;
    /**
     * whether to show arrow at the start of the line, only work when the shape is a connector
     */
    startArrow?: boolean;
    /**
     * text box is horizontal text, only work when the shape type is rect
     */
    horizontal?: boolean;
    /**
     * text box is vertical text, only work when the shape type is rect
     */
    vertical?: boolean;
}
export interface IMenuInsertShapeCommandParams {
    value: ShapeTypeEnum;
    enhanceParams?: IEnhanceParams;
}
export declare const MenuInsertShapeCommand: ICommand;
export {};
