import { CollaborationSessionService } from '@univerjs-pro/collaboration-client';
import { Disposable, ILogService, Injector } from '@univerjs/core';
import { HTTPService } from '@univerjs/network';
export declare class FrontendLogController extends Disposable {
    private readonly _injector;
    private readonly _httpService;
    private readonly _logService;
    private readonly _collaborationSessionService;
    private _memberID;
    constructor(_injector: Injector, _httpService: HTTPService, _logService: ILogService, _collaborationSessionService: CollaborationSessionService);
    private _init;
    private _initUserListener;
    private _initWindowErrorListener;
    private _initUnhandledRejectionListener;
    private _monkeyPatchLogService;
    private _uploadLog;
}
