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
import type { MouseEventHandler, ReactNode, RefObject } from 'react';
import type { Observable } from 'rxjs';
interface IAbsolutePosition {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export type RectPopupDirection = 'left' | 'left-center' | 'left-bottom' | 'left-top' | 'right' | 'right-center' | 'right-bottom' | 'right-top' | 'top' | 'top-center' | 'top-left' | 'top-right' | 'bottom' | 'bottom-center' | 'bottom-left' | 'bottom-right' | 'vertical' | 'vertical-left' | 'vertical-right' | 'vertical-center' | 'horizontal' | 'horizontal-top' | 'horizontal-bottom' | 'horizontal-center';
export interface IRectPopupProps {
    children?: ReactNode;
    /**
     * the anchor element bounding rect
     */
    anchorRect$: Observable<IAbsolutePosition>;
    excludeRects?: RefObject<IAbsolutePosition[] | null | undefined | void>;
    direction?: RectPopupDirection;
    hidden?: boolean;
    onClickOutside?: (e: MouseEvent) => void;
    excludeOutside?: HTMLElement[];
    onContextMenu?: () => void;
    onPointerEnter?: MouseEventHandler<HTMLElement>;
    onPointerLeave?: MouseEventHandler<HTMLElement>;
    onClick?: MouseEventHandler<HTMLElement>;
    portal?: boolean;
    mask?: boolean;
    zIndex?: number;
    maskZIndex?: number;
    onMaskClick?: () => void;
    noPushMinimumGap?: boolean;
    autoRelayout?: boolean;
    boundaryElement?: Element;
    boundaryInsets?: {
        left?: number;
        top?: number;
    };
}
export interface IPopupLayoutInfo extends Pick<IRectPopupProps, 'boundaryInsets' | 'direction'> {
    position: IAbsolutePosition;
    width: number;
    height: number;
    containerLeft?: number;
    containerTop?: number;
    containerWidth: number;
    containerHeight: number;
    noPushMinimumGap?: boolean;
}
declare function RectPopup(props: IRectPopupProps): import("react").JSX.Element | null;
declare namespace RectPopup {
    var calcPopupPosition: (layout: IPopupLayoutInfo) => {
        top: number;
        left: number;
    };
    var useContext: () => RefObject<IAbsolutePosition | undefined>;
    var useDirection: () => RectPopupDirection;
}
export { RectPopup };
