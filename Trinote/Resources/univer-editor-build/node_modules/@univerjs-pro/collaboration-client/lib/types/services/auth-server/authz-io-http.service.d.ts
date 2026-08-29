import type { IAuthzIoService } from '@univerjs/core';
import type { IActionInfo, IAllowedRequest, IBatchAllowedResponse, ICollaborator, ICreateCollaboratorRequest, ICreateRequest, IDeleteCollaboratorRequest, IListCollaboratorRequest, IListPermPointRequest, IListPermPointResponse, IListRolesRequest, IPutCollaboratorsRequest, IUnitRoleKV, IUpdateCollaboratorRequest, IUpdatePermPointRequest, UnitAction } from '@univerjs/protocol';
import { Disposable, IConfigService } from '@univerjs/core';
import { HTTPService } from '@univerjs/network';
export declare class AuthzIoHttpService extends Disposable implements IAuthzIoService {
    private _HTTPService;
    private _configService;
    /**
     * Whether the document owner inherits permissions for all protected ranges.
     * If true, the document owner cannot be selected when specifying user edits for a protected range, and the document owner will have edit permissions for all protected ranges by default.
     */
    private _cfgEnableObjInherit;
    constructor(_HTTPService: HTTPService, _configService: IConfigService);
    private _initMergeInterceptor;
    private _getAPIPrefixPath;
    create(config: ICreateRequest): Promise<string>;
    list(config: IListPermPointRequest): Promise<IListPermPointResponse['objects']>;
    update(config: IUpdatePermPointRequest): Promise<void>;
    allowed(config: IAllowedRequest): Promise<IActionInfo[]>;
    batchAllowed(config: IAllowedRequest[]): Promise<IBatchAllowedResponse['objectActions']>;
    listRoles(config: IListRolesRequest): Promise<{
        roles: IUnitRoleKV[];
        actions: UnitAction[];
    }>;
    deleteCollaborator(config: IDeleteCollaboratorRequest): Promise<void>;
    updateCollaborator(config: IUpdateCollaboratorRequest): Promise<void>;
    createCollaborator(config: ICreateCollaboratorRequest): Promise<void>;
    listCollaborators(config: IListCollaboratorRequest): Promise<ICollaborator[]>;
    putCollaborators(config: IPutCollaboratorsRequest): Promise<void>;
    setCfgEnableObjInherit(enabled: boolean): void;
    getCfgEnableObjInherit(): boolean;
}
