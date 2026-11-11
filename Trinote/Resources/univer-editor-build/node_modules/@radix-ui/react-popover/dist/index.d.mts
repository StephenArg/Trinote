import * as _radix_ui_react_context from '@radix-ui/react-context';
import * as React from 'react';
import { DismissableLayer } from '@radix-ui/react-dismissable-layer';
import { FocusScope, FocusScopeBranchRegistry } from '@radix-ui/react-focus-scope';
import * as PopperPrimitive from '@radix-ui/react-popper';
import { Portal } from '@radix-ui/react-portal';
import { Primitive } from '@radix-ui/react-primitive';

declare const createPopoverScope: _radix_ui_react_context.CreateScope;
interface PopoverProps {
    children?: React.ReactNode | undefined;
    open?: boolean | undefined;
    defaultOpen?: boolean | undefined;
    onOpenChange?: {
        bivarianceHack(open: boolean): void;
    }['bivarianceHack'] | undefined;
    modal?: boolean | undefined;
}
declare const Popover: React.FC<PopoverProps>;
type PopperAnchorProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Anchor>;
interface PopoverAnchorProps extends PopperAnchorProps {
}
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface PopoverTriggerProps extends PrimitiveButtonProps {
}
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type PortalProps = React.ComponentPropsWithoutRef<typeof Portal>;
interface PopoverPortalProps {
    children?: React.ReactNode | undefined;
    /**
     * Specify a container element to portal the content into.
     */
    container?: PortalProps['container'] | undefined;
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true | undefined;
}
declare const PopoverPortal: React.FC<PopoverPortalProps>;
interface PopoverContentProps extends PopoverContentTypeProps {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true | undefined;
}
declare const PopoverContent: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
interface PopoverContentTypeProps extends Omit<PopoverContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents' | 'branchRegistry' | 'branchNodes'> {
}
type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusScope>;
type DismissableLayerProps = React.ComponentPropsWithoutRef<typeof DismissableLayer>;
type PopperContentProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Content>;
interface PopoverContentImplProps extends Omit<PopperContentProps, 'onPlaced'>, Omit<DismissableLayerProps, 'onDismiss'> {
    /**
     * Whether focus should be trapped within the `Popover`
     * (default: false)
     */
    trapFocus?: FocusScopeProps['trapped'] | undefined;
    /**
     * Event handler called when auto-focusing on open.
     * Can be prevented.
     */
    onOpenAutoFocus?: FocusScopeProps['onMountAutoFocus'] | undefined;
    /**
     * Event handler called when auto-focusing on close.
     * Can be prevented.
     */
    onCloseAutoFocus?: FocusScopeProps['onUnmountAutoFocus'] | undefined;
    /**
     * Branch nodes registered by nested, portalled layers. Passed to the trapped
     * `FocusScope` so focus isn't reclaimed from them. Only provided by the modal
     * variant.
     * @internal
     */
    branchNodes?: HTMLElement[] | undefined;
    /**
     * Registry that nested, portalled layers use to register themselves as branches of this modal
     * `Popover`. Only provided by the modal variant.
     * @internal
     */
    branchRegistry?: FocusScopeBranchRegistry | undefined;
}
type PrimitiveHeading2Props = React.ComponentPropsWithoutRef<typeof Primitive.h2>;
interface PopoverTitleProps extends PrimitiveHeading2Props {
}
declare const PopoverTitle: React.ForwardRefExoticComponent<PopoverTitleProps & React.RefAttributes<HTMLHeadingElement>>;
type PrimitiveParagraphProps = React.ComponentPropsWithoutRef<typeof Primitive.p>;
interface PopoverDescriptionProps extends PrimitiveParagraphProps {
}
declare const PopoverDescription: React.ForwardRefExoticComponent<PopoverDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
interface PopoverCloseProps extends PrimitiveButtonProps {
}
declare const PopoverClose: React.ForwardRefExoticComponent<PopoverCloseProps & React.RefAttributes<HTMLButtonElement>>;
type PopperArrowProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Arrow>;
interface PopoverArrowProps extends PopperArrowProps {
}
declare const PopoverArrow: React.ForwardRefExoticComponent<PopoverArrowProps & React.RefAttributes<SVGSVGElement>>;

export { PopoverAnchor as Anchor, PopoverArrow as Arrow, PopoverClose as Close, PopoverContent as Content, PopoverDescription as Description, Popover, PopoverAnchor, type PopoverAnchorProps, PopoverArrow, type PopoverArrowProps, PopoverClose, type PopoverCloseProps, PopoverContent, type PopoverContentProps, PopoverDescription, type PopoverDescriptionProps, PopoverPortal, type PopoverPortalProps, type PopoverProps, PopoverTitle, type PopoverTitleProps, PopoverTrigger, type PopoverTriggerProps, PopoverPortal as Portal, Popover as Root, PopoverTitle as Title, PopoverTrigger as Trigger, createPopoverScope };
