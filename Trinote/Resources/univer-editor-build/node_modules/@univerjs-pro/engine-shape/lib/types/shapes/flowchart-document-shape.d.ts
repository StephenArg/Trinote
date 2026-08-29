import type { IPresetShapeConfig } from '../shape-type';
import { BaseShapeRenderModel } from '../render-engine/shape-render-model';
export declare class FlowchartDocumentShape extends BaseShapeRenderModel {
    readonly name: string;
    readonly presetShapeConfig: IPresetShapeConfig;
}
