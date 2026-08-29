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
import type { FRange } from '../f-range';
import type { FWorksheet } from '../f-worksheet';
import type { IRangeProtectionOptions, IWorksheetPermissionConfig, IWorksheetProtectionOptions, WorksheetMode, WorksheetPermissionSnapshot } from './permission-types';
import { IAuthzIoService, ICommandService, Injector, IPermissionService } from '@univerjs/core';
import { FBase } from '@univerjs/core/facade';
import { RangeProtectionRuleModel, WorksheetProtectionPointModel, WorksheetProtectionRuleModel } from '@univerjs/sheets';
import { FRangeProtectionRule } from './f-range-protection-rule';
import { WorksheetPermissionPoint } from './permission-types';
/**
 * Implementation class for WorksheetPermission
 * Provides worksheet-level permission control
 *
 * @hideconstructor
 */
export declare class FWorksheetPermission extends FBase {
    private readonly _worksheet;
    private readonly _injector;
    private readonly _permissionService;
    private readonly _authzIoService;
    private readonly _commandService;
    private readonly _rangeProtectionRuleModel;
    private readonly _worksheetProtectionPointModel;
    private readonly _worksheetProtectionRuleModel;
    private readonly _unitId;
    private readonly _subUnitId;
    constructor(_worksheet: FWorksheet, _injector: Injector, _permissionService: IPermissionService, _authzIoService: IAuthzIoService, _commandService: ICommandService, _rangeProtectionRuleModel: RangeProtectionRuleModel, _worksheetProtectionPointModel: WorksheetProtectionPointModel, _worksheetProtectionRuleModel: WorksheetProtectionRuleModel);
    /**
     * Check if worksheet is currently protected.
     * @returns {boolean} true if protected, false otherwise.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * if (fWorksheet.getWorksheetPermission().isProtected()) {
     *   console.log('Worksheet is protected');
     * }
     * ```
     */
    isProtected(): boolean;
    /**
     * Create worksheet protection with collaborators support.
     * This must be called before setting permission points for collaboration to work.
     * @param {IWorksheetProtectionOptions} options Protection options including allowed users.
     * @returns {Promise<string>} The permissionId for the created protection.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const permission = fWorksheet.getWorksheetPermission();
     *
     * // Create worksheet protection with collaborators
     * const permissionId = await permission.protect({
     *   allowedUsers: ['user1', 'user2'],
     *   name: 'My Worksheet Protection'
     * });
     *
     * // Now set permission points
     * await permission?.setMode('readOnly');
     * ```
     */
    protect(options?: IWorksheetProtectionOptions): Promise<string>;
    /**
     * Remove worksheet protection.
     * This deletes the protection rule and resets all permission points to allowed.
     * @returns {Promise<void>} A promise that resolves when protection is removed.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * await fWorksheet.getWorksheetPermission().unprotect();
     * ```
     */
    unprotect(): Promise<boolean>;
    /**
     * Set permission mode for the worksheet.
     * Automatically creates worksheet protection if not already protected.
     * @param {WorksheetMode} mode The permission mode to set ('editable' | 'readOnly' | 'filterOnly' | 'commentOnly').
     * @returns {Promise<void>} A promise that resolves when the mode is set.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * await fWorksheet.getWorksheetPermission().setMode('readOnly');
     * ```
     */
    setMode(mode: WorksheetMode): Promise<void>;
    /**
     * Get permission configuration for a specific mode
     * @private
     */
    private _getModePermissions;
    /**
     * Set the worksheet to read-only mode.
     * @returns {Promise<void>} A promise that resolves when the mode is set.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * await fWorksheet.getWorksheetPermission().setReadOnly();
     * ```
     */
    setReadOnly(): Promise<void>;
    /**
     * Set the worksheet to editable mode.
     * @returns {Promise<void>} A promise that resolves when the mode is set.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * await fWorksheet.getWorksheetPermission().setEditable();
     * ```
     */
    setEditable(): Promise<void>;
    /**
     * Set a specific permission point for the worksheet.
     * Automatically creates worksheet protection if not already protected.
     * @param {WorksheetPermissionPoint} point The permission point to set.
     * @param {boolean} value The value to set (true = allowed, false = denied).
     * @returns {Promise<void>} A promise that resolves when the point is set.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const permission = fWorksheet.getWorksheetPermission();
     * await permission.setPoint(univerAPI.Enum.WorksheetPermissionPoint.InsertRow, false);
     * ```
     */
    setPoint(point: WorksheetPermissionPoint, value: boolean): Promise<void>;
    /**
     * Check if the worksheet is editable.
     * @returns {boolean} true if the worksheet can be edited, false otherwise.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * if (fWorksheet.getWorksheetPermission().canEdit()) {
     *   console.log('Worksheet is editable');
     * }
     * ```
     */
    canEdit(): boolean;
    /**
     * Check if a specific cell can be edited.
     * @param {number} row Row index.
     * @param {number} col Column index.
     * @returns {boolean} true if the cell can be edited, false otherwise.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * // Check if cell C3 can be edited
     * const fRange = fWorksheet.getRange('C3');
     * const canEdit = fWorksheet.getWorksheetPermission().canEditCell(fRange.getRow(), fRange.getColumn());
     * console.log(canEdit);
     * ```
     */
    canEditCell(row: number, col: number): boolean;
    /**
     * Check if the worksheet is viewable.
     * @returns {boolean} true if the worksheet can be viewed, false otherwise.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * if (fWorksheet.getWorksheetPermission().canView()) {
     *   console.log('Worksheet is viewable');
     * }
     */
    canView(): boolean;
    /**
     * Check if a specific cell can be viewed.
     * @param {number} row Row index.
     * @param {number} col Column index.
     * @returns {boolean} true if the cell can be viewed, false otherwise.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * // Check if cell C3 can be viewed
     * const fRange = fWorksheet.getRange('C3');
     * const canView = fWorksheet.getWorksheetPermission().canViewCell(fRange.getRow(), fRange.getColumn());
     * console.log(canView);
     * ```
     */
    canViewCell(row: number, col: number): boolean;
    /**
     * Get the value of a specific permission point.
     * @param {WorksheetPermissionPoint} point The permission point to query.
     * @returns {boolean} true if allowed, false if denied.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const permission = fWorksheet.getWorksheetPermission();
     * const canInsertRow = permission.getPoint(univerAPI.Enum.WorksheetPermissionPoint.InsertRow);
     * console.log(canInsertRow);
     * ```
     */
    getPoint(point: WorksheetPermissionPoint): boolean;
    /**
     * Get a snapshot of all permission points.
     * @returns {WorksheetPermissionSnapshot} An object containing all permission point values.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const snapshot = fWorksheet.getWorksheetPermission().getSnapshot();
     * console.log(snapshot);
     * ```
     */
    getSnapshot(): WorksheetPermissionSnapshot;
    /**
     * Apply a permission configuration to the worksheet.
     * @param {IWorksheetPermissionConfig} config The configuration to apply.
     * @returns {Promise<void>} A promise that resolves when the configuration is applied.
     * @example
     * ```ts
     * const worksheet = univerAPI.getActiveWorkbook()?.getSheetByName('Sheet1');
     * if (!worksheet) return;
     * const permission = worksheet?.getWorksheetPermission();
     * await permission?.applyConfig({
     *   mode: 'readOnly',
     *   points: {
     *     [univerAPI.Enum.WorksheetPermissionPoint.View]: true,
     *     [univerAPI.Enum.WorksheetPermissionPoint.Edit]: false
     *   }
     * });
     * ```
     */
    applyConfig(config: IWorksheetPermissionConfig): Promise<void>;
    /**
     * Protect multiple ranges at once (batch operation).
     * @param {Array<{ ranges: FRange[]; options?: IRangeProtectionOptions }>} configs Array of protection configurations.
     * @returns {Promise<FRangeProtectionRule[]>} Array of created protection rules.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const rules = await fWorksheet.getWorksheetPermission().protectRanges([
     *   {
     *     ranges: [fWorksheet.getRange('A1:B2')],
     *     options: { name: 'Protected Area 1', allowedUsers: ['user1', 'user2'], allowViewByOthers: true }
     *   },
     *   {
     *     ranges: [fWorksheet.getRange('C3:D4')],
     *     options: { name: 'Protected Area 2', allowViewByOthers: false }
     *   }
     * ]);
     * console.log(rules);
     * ```
     */
    protectRanges(configs: Array<{
        ranges: FRange[];
        options?: IRangeProtectionOptions;
    }>): Promise<FRangeProtectionRule[]>;
    /**
     * Remove multiple protection rules at once.
     * @param {string[]} ruleIds Array of rule IDs to remove.
     * @returns {Promise<void>} A promise that resolves when the rules are removed.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const worksheetPermission = fWorksheet.getWorksheetPermission();
     * const rules = await worksheetPermission.listRangeProtectionRules();
     * // Unprotect the first rule as an example
     * if (rules.length > 0) {
     *   const result = await worksheetPermission.unprotectRules([rules[0].id]);
     *   console.log(result);
     * }
     * ```
     */
    unprotectRules(ruleIds: string[]): Promise<boolean>;
    /**
     * List all range protection rules for the worksheet.
     * @returns {Promise<FRangeProtectionRule[]>} Array of protection rules.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const rules = await fWorksheet.getWorksheetPermission().listRangeProtectionRules();
     * console.log(rules);
     * ```
     */
    listRangeProtectionRules(options?: {
        ignoreCollaborators?: boolean;
    }): Promise<FRangeProtectionRule[]>;
    /**
     * Debug cell permission information.
     * @param {number} row Row index.
     * @param {number} col Column index.
     * @returns {FRangeProtectionRule | undefined} Debug information about which rules affect this cell, or null if no rules apply.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * // Get debug info for cell C3
     * const fRange = fWorksheet.getRange('C3');
     * const debugInfo = await fWorksheet.getWorksheetPermission().debugCellPermission(fRange.getRow(), fRange.getColumn());
     * console.log(debugInfo);
     * ```
     */
    debugCellPermission(row: number, col: number): Promise<FRangeProtectionRule | undefined>;
}
