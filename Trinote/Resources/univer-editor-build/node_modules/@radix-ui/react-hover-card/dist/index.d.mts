import * as _radix_ui_react_context from '@radix-ui/react-context';
import * as React from 'react';
import * as PopperPrimitive from '@radix-ui/react-popper';
import { Portal } from '@radix-ui/react-portal';
import { Primitive } from '@radix-ui/react-primitive';
import { DismissableLayer } from '@radix-ui/react-dismissable-layer';

declare const createHoverCardScope: _radix_ui_react_context.CreateScope;
interface HoverCardProps {
    children?: React.ReactNode | undefined;
    open?: boolean | undefined;
    defaultOpen?: boolean | undefined;
    onOpenChange?: {
        bivarianceHack(open: boolean): void;
    }['bivarianceHack'] | undefined;
    openDelay?: number | undefined;
    closeDelay?: number | undefined;
}
declare const HoverCard: React.FC<HoverCardProps>;
type PrimitiveLinkProps = React.ComponentPropsWithoutRef<typeof Primitive.a>;
interface HoverCardTriggerProps extends PrimitiveLinkProps {
}
declare const HoverCardTrigger: React.ForwardRefExoticComponent<HoverCardTriggerProps & React.RefAttributes<HTMLAnchorElement>>;
type PortalProps = React.ComponentPropsWithoutRef<typeof Portal>;
interface HoverCardPortalProps {
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
declare const HoverCardPortal: React.FC<HoverCardPortalProps>;
interface HoverCardContentProps extends HoverCardContentImplProps {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true | undefined;
}
declare const HoverCardContent: React.ForwardRefExoticComponent<HoverCardContentProps & React.RefAttributes<HTMLDivElement>>;
type DismissableLayerProps = React.ComponentPropsWithoutRef<typeof DismissableLayer>;
type PopperContentProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Content>;
interface HoverCardContentImplProps extends Omit<PopperContentProps, 'onPlaced'> {
    /**
     * Event handler called when the escape key is down.
     * Can be prevented.
     */
    onEscapeKeyDown?: DismissableLayerProps['onEscapeKeyDown'] | undefined;
    /**
     * Event handler called when the a `pointerdown` event happens outside of the `HoverCard`.
     * Can be prevented.
     */
    onPointerDownOutside?: DismissableLayerProps['onPointerDownOutside'] | undefined;
    /**
     * Event handler called when the focus moves outside of the `HoverCard`.
     * Can be prevented.
     */
    onFocusOutside?: DismissableLayerProps['onFocusOutside'] | undefined;
    /**
     * Event handler called when an interaction happens outside the `HoverCard`.
     * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
     * Can be prevented.
     */
    onInteractOutside?: DismissableLayerProps['onInteractOutside'] | undefined;
}
type PopperArrowProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Arrow>;
interface HoverCardArrowProps extends PopperArrowProps {
}
declare const HoverCardArrow: React.ForwardRefExoticComponent<HoverCardArrowProps & React.RefAttributes<SVGSVGElement>>;

export { HoverCardArrow as Arrow, HoverCardContent as Content, HoverCard, HoverCardArrow, type HoverCardArrowProps, HoverCardContent, type HoverCardContentProps, HoverCardPortal, type HoverCardPortalProps, type HoverCardProps, HoverCardTrigger, type HoverCardTriggerProps, HoverCardPortal as Portal, HoverCard as Root, HoverCardTrigger as Trigger, createHoverCardScope };
