/**
 * Copyright 2023-present DreamNum Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { IActionInfo, IAllowedRequest, IBatchAllowedResponse, ICollaborator, ICreateRequest, IListPermPointRequest, IPermissionPoint, IPutCollaboratorsRequest, IUnitRoleKV, IUpdatePermPointRequest, UnitAction } from '@univerjs/protocol';
import type { IAuthzIoService } from './type';
import { IResourceManagerService } from '../resource-manager/type';
import { UserManagerService } from '../user-manager/user-manager.service';
/**
 * Do not use the mock implementation in a production environment as it is a minimal version.
 */
export declare class AuthzIoLocalService implements IAuthzIoService {
    private _resourceManagerService;
    private _userManagerService;
    private _permissionMap;
    private _permissionOverrides;
    /**
     * Whether the document owner inherits permissions for all protected ranges.
     * If true, the document owner cannot be selected when specifying user edits for a protected range, and the document owner will have edit permissions for all protected ranges by default.
     */
    private _cfgEnableObjInherit;
    constructor(_resourceManagerService: IResourceManagerService, _userManagerService: UserManagerService);
    private _initDefaultUser;
    private _getRole;
    private _initSnapshot;
    create(config: ICreateRequest): Promise<string>;
    allowed(config: IAllowedRequest): Promise<IActionInfo[]>;
    batchAllowed(configs: IAllowedRequest[]): Promise<IBatchAllowedResponse['objectActions']>;
    list(config: IListPermPointRequest): Promise<IPermissionPoint[]>;
    listCollaborators(): Promise<ICollaborator[]>;
    listRoles(): Promise<{
        roles: IUnitRoleKV[];
        actions: UnitAction[];
    }>;
    deleteCollaborator(): Promise<void>;
    update(config: IUpdatePermPointRequest): Promise<void>;
    /**
     * Set an explicit permission override for a specific action on an object.
     * This override takes precedence over strategies.
     * @param objectID - The permission object ID
     * @param action - The action number
     * @param allowed - Whether the action is allowed
     */
    setPermissionOverride(objectID: string, action: number, allowed: boolean): void;
    /**
     * Clear a specific permission override.
     * @param objectID - The permission object ID
     * @param action - The action number
     */
    clearPermissionOverride(objectID: string, action: number): void;
    /**
     * Clear all permission overrides for an object.
     * @param objectID - The permission object ID
     */
    clearAllOverrides(objectID: string): void;
    updateCollaborator(): Promise<void>;
    createCollaborator(): Promise<void>;
    putCollaborators(config: IPutCollaboratorsRequest): Promise<void>;
    setCfgEnableObjInherit(enabled: boolean): void;
    getCfgEnableObjInherit(): boolean;
}
