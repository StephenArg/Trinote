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
import type { IPopup } from '@univerjs/ui';
import type { IBaseDropdownProps } from '../type';
export interface IListDropdownProps {
    multiple?: boolean;
    onEdit?: () => void;
    onChange?: (value: string[]) => boolean | Promise<boolean>;
    options: {
        label: string;
        value: string;
        color?: string;
    }[];
    defaultValue?: string;
    showEdit?: boolean;
    showSearch?: boolean;
}
export declare function ListDropDown(props: {
    popup: IPopup<IListDropdownProps & IBaseDropdownProps>;
}): import("react/jsx-runtime").JSX.Element | null;
export declare namespace ListDropDown {
    var componentKey: string;
}
