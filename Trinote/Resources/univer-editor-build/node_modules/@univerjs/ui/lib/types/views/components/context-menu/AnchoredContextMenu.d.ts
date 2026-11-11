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
import type { ILayoutService } from '../../../services/layout/layout.service';
import type { IValueOption } from '../../../services/menu/menu';
import type { IMenuManagerService } from '../../../services/menu/menu-manager.service';
export interface IContextMenuAnchorRect {
    left: number;
    top: number;
    bottom: number;
}
export interface IAnchoredContextMenuProps {
    hostId: string;
    visible: boolean;
    anchorRect: IContextMenuAnchorRect | null;
    menuType: string;
    anchorVertical?: 'top' | 'bottom';
    autoFocus?: boolean;
    menuOffset?: number;
    menuManagerService?: IMenuManagerService;
    layoutService?: ILayoutService;
    onRequestClose: () => void;
    onOptionSelect?: (option: IValueOption) => void;
}
export declare function AnchoredContextMenu(props: IAnchoredContextMenuProps): import("react").JSX.Element;
