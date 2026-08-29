import type { UnitModel } from '@univerjs/core';
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { Disposable, IConfigService } from '@univerjs/core';
export declare class WaterMarkController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _configService;
    private _valid;
    private _count;
    constructor(_context: IRenderContext<UnitModel>, _configService: IConfigService);
    private _initRender;
}
