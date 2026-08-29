import type { IPresetShapeConfig, IShapeGdContextKeyPoint } from '../shape-type';
import { LineShapeRenderModel } from '../render-engine/line-shape-render-model';
export declare class CurvedConnector2Shape extends LineShapeRenderModel {
    readonly name: string;
    readonly presetShapeConfig: IPresetShapeConfig;
    getConnectorLinePoints(): IShapeGdContextKeyPoint[];
}
