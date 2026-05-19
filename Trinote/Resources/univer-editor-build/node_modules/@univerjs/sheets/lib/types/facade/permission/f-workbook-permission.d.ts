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
import type { ICollaborator, ICollaboratorUser, WorkbookMode, WorkbookPermissionSnapshot } from './permission-types';
import { IAuthzIoService, Injector, IPermissionService } from '@univerjs/core';
import { FBase } from '@univerjs/core/facade';
import { UnitRole, WorkbookPermissionPoint } from './permission-types';
/**
 * Implementation class for WorkbookPermission
 * Provides workbook-level permission control
 *
 * @hideconstructor
 */
export declare class FWorkbookPermission extends FBase {
    private readonly _unitId;
    private readonly _injector;
    protected readonly _permissionService: IPermissionService;
    private readonly _authzIoService;
    constructor(_unitId: string, _injector: Injector, _permissionService: IPermissionService, _authzIoService: IAuthzIoService);
    /**
     * Set permission mode for the workbook.
     * @param {WorkbookMode} mode The permission mode to set ('owner' | 'editor' | 'viewer' | 'commenter').
     * @returns {Promise<void>} A promise that resolves when the mode is set.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * await fWorkbook.getWorkbookPermission().setMode('editor');
     * ```
     */
    setMode(mode: WorkbookMode): Promise<void>;
    /**
     * Get permission configuration for a specific mode
     * @private
     */
    private _getModePermissions;
    /**
     * Set the workbook to read-only mode (viewer mode).
     * @returns {Promise<void>} A promise that resolves when the mode is set.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * await fWorkbook.getWorkbookPermission().setReadOnly();
     * ```
     */
    setReadOnly(): Promise<void>;
    /**
     * Set the workbook to editable mode (editor mode).
     * @returns {Promise<void>} A promise that resolves when the mode is set.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * await fWorkbook.getWorkbookPermission().setEditable();
     * ```
     */
    setEditable(): Promise<void>;
    /**
     * Set a specific permission point.
     * @param {WorkbookPermissionPoint} point The permission point to set.
     * @param {boolean} value The value to set (true = allowed, false = denied).
     * @returns {Promise<void>} A promise that resolves when the point is set.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const permission = fWorkbook.getWorkbookPermission();
     * await permission.setPoint(univerAPI.Enum.WorkbookPermissionPoint.Print, false);
     * ```
     */
    setPoint(point: WorkbookPermissionPoint, value: boolean): Promise<void>;
    /**
     * Check if the workbook is editable.
     * @returns {boolean} true if the workbook can be edited, false otherwise.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * if (fWorkbook.getWorkbookPermission().canEdit()) {
     *   console.log('Workbook is editable');
     * }
     * ```
     */
    canEdit(): boolean;
    /**
     * Get the value of a specific permission point.
     * @param {WorkbookPermissionPoint} point The permission point to query.
     * @returns {boolean} true if allowed, false if denied.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const permission = fWorkbook.getWorkbookPermission();
     * const canPrint = permission.getPoint(univerAPI.Enum.WorkbookPermissionPoint.Print);
     * console.log(canPrint);
     * ```
     */
    getPoint(point: WorkbookPermissionPoint): boolean;
    /**
     * Get a snapshot of all permission points.
     * @returns {WorkbookPermissionSnapshot} An object containing all permission point values.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const snapshot = fWorkbook.getWorkbookPermission().getSnapshot();
     * console.log(snapshot);
     * ```
     */
    getSnapshot(): WorkbookPermissionSnapshot;
    /**
     * Set multiple collaborators at once (replaces existing collaborators).
     * @param {Array<{ user: IUser; role: UnitRole }>} collaborators Array of collaborators with user information and role.
     * @returns {Promise<void>} A promise that resolves when the collaborators are set.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const permission = fWorkbook.getWorkbookPermission();
     * await permission.setCollaborators([
     *   {
     *     user: { userID: 'user1', name: 'John Doe', avatar: 'https://...' },
     *     role: univerAPI.Enum.UnitRole.Editor
     *   },
     *   {
     *     user: { userID: 'user2', name: 'Jane Smith', avatar: '' },
     *     role: univerAPI.Enum.UnitRole.Reader
     *   }
     * ]);
     * ```
     */
    setCollaborators(collaborators: Array<{
        user: ICollaboratorUser;
        role: UnitRole;
    }>): Promise<void>;
    /**
     * Add a single collaborator.
     * @param {IUser} user The user information (userID, name, avatar).
     * @param {UnitRole} role The role to assign.
     * @returns {Promise<void>} A promise that resolves when the collaborator is added.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const permission = fWorkbook.getWorkbookPermission();
     * await permission.addCollaborator(
     *   { userID: 'user1', name: 'John Doe', avatar: 'https://...' },
     *   univerAPI.Enum.UnitRole.Editor
     * );
     * ```
     */
    addCollaborator(user: ICollaboratorUser, role: UnitRole): Promise<void>;
    /**
     * Update an existing collaborator's role and information.
     * @param {IUser} user The updated user information (userID, name, avatar).
     * @param {UnitRole} role The new role to assign.
     * @returns {Promise<void>} A promise that resolves when the collaborator is updated.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const permission = fWorkbook.getWorkbookPermission();
     * await permission.updateCollaborator(
     *   { userID: 'user1', name: 'John Doe Updated', avatar: 'https://...' },
     *   univerAPI.Enum.UnitRole.Reader
     * );
     * ```
     */
    updateCollaborator(user: ICollaboratorUser, role: UnitRole): Promise<void>;
    /**
     * Remove a collaborator from the workbook.
     * @param {string} userId The user ID to remove.
     * @returns {Promise<void>} A promise that resolves when the collaborator is removed.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const permission = fWorkbook.getWorkbookPermission();
     * await permission.removeCollaborator('user1');
     * ```
     */
    removeCollaborator(userId: string): Promise<void>;
    /**
     * Remove multiple collaborators at once.
     * @param {string[]} userIds Array of user IDs to remove.
     * @returns {Promise<void>} A promise that resolves when the collaborators are removed.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const permission = fWorkbook.getWorkbookPermission();
     * await permission.removeCollaborators(['user1', 'user2']);
     * ```
     */
    removeCollaborators(userIds: string[]): Promise<void>;
    /**
     * List all collaborators of the workbook.
     * @returns {Promise<ICollaborator[]>} Array of collaborators with their roles.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const permission = fWorkbook.getWorkbookPermission();
     * const collaborators = await permission.listCollaborators();
     * console.log(collaborators);
     * ```
     */
    listCollaborators(): Promise<ICollaborator[]>;
}
