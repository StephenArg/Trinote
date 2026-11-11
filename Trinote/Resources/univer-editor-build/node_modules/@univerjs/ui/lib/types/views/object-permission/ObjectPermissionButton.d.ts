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
import type { IAccessor, IObjectPermissionTarget } from '@univerjs/core';
import { UnitAction } from '@univerjs/protocol';
export interface IObjectPermissionButtonProps {
    target: IObjectPermissionTarget;
    name: string;
    commandId: string;
    actions?: readonly UnitAction[];
    /** Confirm the original object still exists before saving. */
    exists?: () => boolean;
}
export declare const OBJECT_PERMISSION_DIALOG = "ui.object-permission-dialog";
/** Mount outside transient toolbars and context menus, retaining the original target until close. */
export declare function openObjectPermissionDialog(accessor: IAccessor, props: IObjectPermissionButtonProps): boolean;
/** Available only for explicitly capable Authz providers. The target remains fixed while the dialog is open. */
export declare function ObjectPermissionButton(props: IObjectPermissionButtonProps): import("react").JSX.Element | null;
export declare function ObjectPermissionDialog({ target, name, commandId, actions, exists, onClose, hosted }: IObjectPermissionButtonProps & {
    onClose: () => void;
    hosted?: boolean;
}): import("react").JSX.Element;
