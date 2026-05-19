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
import type { ReactElement } from 'react';
import './index.css';
export interface IPopupProps {
    children: ReactElement;
    /**
     * whether popup is visible
     * @default false
     */
    visible?: boolean;
    /**
     * the offset of popup
     * @default [0, 0]
     */
    offset?: [number, number];
    /**
     * allow popup content to overflow parent bounds.
     * @default false
     */
    overflowVisible?: boolean;
    /**
     * vertical placement relative to `offset[1]`
     * @default 'below'
     */
    placementY?: 'below' | 'above';
}
export declare function Popup(props: IPopupProps): import("react").ReactPortal;
