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
import type { HTMLAttributes } from 'react';
declare const Dialog: import("react").FC<import("@radix-ui/react-dialog").DialogProps>;
declare const DialogTrigger: import("react").ForwardRefExoticComponent<import("@radix-ui/react-dialog").DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: import("react").FC<import("@radix-ui/react-dialog").DialogPortalProps>;
declare const DialogClose: import("react").ForwardRefExoticComponent<import("@radix-ui/react-dialog").DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: import("react").ForwardRefExoticComponent<Omit<import("@radix-ui/react-dialog").DialogOverlayProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
interface IDialogContentProps {
    closable?: boolean;
    onClickClose?: () => void;
}
declare const DialogContent: import("react").ForwardRefExoticComponent<Omit<import("@radix-ui/react-dialog").DialogContentProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & IDialogContentProps & import("react").RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DialogTitle: import("react").ForwardRefExoticComponent<Omit<import("@radix-ui/react-dialog").DialogTitleProps & import("react").RefAttributes<HTMLHeadingElement>, "ref"> & import("react").RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: import("react").ForwardRefExoticComponent<Omit<import("@radix-ui/react-dialog").DialogDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>, "ref"> & import("react").RefAttributes<HTMLParagraphElement>>;
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, };
