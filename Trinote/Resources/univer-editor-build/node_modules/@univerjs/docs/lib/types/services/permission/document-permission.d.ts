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
import type { IPermissionService } from '@univerjs/core';
import { UnitAction } from '@univerjs/protocol';
import { DocumentCommentPermission } from './permission-point/document/comment';
import { DocumentCopyPermission } from './permission-point/document/copy';
import { DocumentEditablePermission } from './permission-point/document/editable';
import { DocumentExportPermission } from './permission-point/document/export';
import { DocumentPrintPermission } from './permission-point/document/print';
import { DocumentEntityEditPermission } from './permission-point/entity/edit';
import { DocumentParagraphEditPermission } from './permission-point/paragraph/edit';
import { DocumentSectionEditPermission } from './permission-point/section/edit';
export declare const DOCUMENT_UNIT_PERMISSION_ACTIONS: readonly [UnitAction.Edit, UnitAction.Copy, UnitAction.Print, UnitAction.Export, UnitAction.Comment];
export type DocumentUnitPermissionAction = typeof DOCUMENT_UNIT_PERMISSION_ACTIONS[number];
export declare function getDocumentSectionPermissionObjectId(segmentId: string, sectionId: string): string;
export declare function getDocumentParagraphPermissionObjectId(segmentId: string, paragraphId: string): string;
export declare function getDocumentEntityPermissionObjectId(segmentId: string, entityType: string, entityId: string): string;
export declare function createDocumentPermissionPoint(unitId: string, objectId: string, action: UnitAction): DocumentCommentPermission | DocumentCopyPermission | DocumentEditablePermission | DocumentExportPermission | DocumentPrintPermission | DocumentEntityEditPermission | DocumentParagraphEditPermission | DocumentSectionEditPermission;
export declare function getDocumentPermissionValue(permissionService: IPermissionService, unitId: string, objectId: string, action: UnitAction): boolean;
export declare function setDocumentPermissionValue(permissionService: IPermissionService, unitId: string, objectId: string, action: UnitAction, value: boolean): void;
export declare function clearDocumentPermissionValuesForUnit(permissionService: IPermissionService, unitId: string): void;
export declare function canEditDocumentTargets(permissionService: IPermissionService, unitId: string, objectIds: Iterable<string>): boolean;
