import type { IListMentionParam, IListMentionResponse, IMentionIOService } from '@univerjs/core';
import { IConfigService } from '@univerjs/core';
import { HTTPService } from '@univerjs/network';
export declare class MentionIoHttpService implements IMentionIOService {
    private readonly _configService;
    private readonly _HTTPService;
    constructor(_configService: IConfigService, _HTTPService: HTTPService);
    private _getAPIPrefixPath;
    list(params: IListMentionParam): Promise<IListMentionResponse>;
}
