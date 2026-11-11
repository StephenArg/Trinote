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
import type { IObjectPermissionButtonProps } from './ObjectPermissionButton';
import { UnitObject } from '@univerjs/protocol';
export declare const OBJECT_PERMISSION_PANEL = "ui.object-permission-panel";
export interface IObjectPermissionPanelProps {
    unitId: string;
    expandable?: UnitObject;
    /** A lazy iterator avoids materializing all records in large Bases. */
    getTargets: () => Iterable<IObjectPermissionButtonProps>;
}
export declare function openObjectPermissionPanel(accessor: IAccessor, props: IObjectPermissionPanelProps & {
    target: IObjectPermissionTarget;
}): boolean;
export declare function ObjectPermissionPanelButton(props: IObjectPermissionPanelProps & {
    target: IObjectPermissionTarget;
}): import("react").JSX.Element | null;
export declare function ObjectPermissionPanel({ unitId, getTargets, expandable }: IObjectPermissionPanelProps): import("react").JSX.Element;
