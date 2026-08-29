import type { ICollaborationSocket, ICollaborationSocketService } from '@univerjs-pro/collaboration-client';
import type { Nullable } from '@univerjs/core';
import { ISnapshotServerService } from '@univerjs-pro/collaboration';
import { CollaborationSocketService } from '@univerjs-pro/collaboration-client';
import { IConfigService, ILogService, Injector } from '@univerjs/core';
import { HTTPService } from '@univerjs/network';
export declare class BrowserCollaborationSocketService extends CollaborationSocketService implements ICollaborationSocketService {
    constructor(_injector: Injector, _httpService: HTTPService, _configService: IConfigService, _logService: ILogService, _snapshotServerService: ISnapshotServerService);
    createSocket(rawUrl: string): Promise<Nullable<ICollaborationSocket>>;
    protected _createSocketURL(url: string, ticket: string): string;
    protected _getSessionTicket(): Promise<string>;
}
