import type { IBasicShapeData, IGdContext, IPresetShapeConfig, IShapeContextOptions } from '../shape-type';
export declare class BaseShapeContext {
    private _gdRecord;
    getGdRecord(): Partial<IGdContext>;
    reset(): void;
    private _transformAgValueToNumber;
    private _calcAdValueByOperator;
    buildGdRecord(options: IShapeContextOptions, presetShapeConfig: IPresetShapeConfig, shapeDataConfig?: IBasicShapeData): void;
}
