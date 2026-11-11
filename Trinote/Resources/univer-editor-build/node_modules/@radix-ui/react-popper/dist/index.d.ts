import * as _radix_ui_react_context from '@radix-ui/react-context';
import * as React from 'react';
import * as ArrowPrimitive from '@radix-ui/react-arrow';
import { Primitive } from '@radix-ui/react-primitive';
import { Measurable } from '@radix-ui/rect';

declare const SIDE_OPTIONS: readonly ["top", "right", "bottom", "left"];
declare const ALIGN_OPTIONS: readonly ["start", "center", "end"];
type Side = (typeof SIDE_OPTIONS)[number];
type Align = (typeof ALIGN_OPTIONS)[number];
declare const Sticky: {
    readonly Partial: "partial";
    readonly Always: "always";
};
type Sticky = (typeof Sticky)[keyof typeof Sticky];
declare const UpdatePositionStrategy: {
    readonly Optimized: "optimized";
    readonly Always: "always";
};
type UpdatePositionStrategy = (typeof UpdatePositionStrategy)[keyof typeof UpdatePositionStrategy];
declare const createPopperScope: _radix_ui_react_context.CreateScope;
interface PopperProps {
    children?: React.ReactNode | undefined;
}
declare const Popper: React.FC<PopperProps>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface PopperAnchorProps extends PrimitiveDivProps {
    virtualRef?: React.RefObject<Measurable | null> | undefined;
}
declare const PopperAnchor: React.ForwardRefExoticComponent<PopperAnchorProps & React.RefAttributes<HTMLDivElement>>;
type Boundary = Element | null;
interface PopperContentProps extends PrimitiveDivProps {
    side?: Side | undefined;
    sideOffset?: number | undefined;
    align?: Align | undefined;
    alignOffset?: number | undefined;
    arrowPadding?: number | undefined;
    avoidCollisions?: boolean | undefined;
    collisionBoundary?: Boundary | Boundary[] | undefined;
    collisionPadding?: number | Partial<Record<Side, number>> | undefined;
    sticky?: Sticky | undefined;
    hideWhenDetached?: boolean | undefined;
    updatePositionStrategy?: UpdatePositionStrategy | undefined;
    onPlaced?: (() => void) | undefined;
}
declare const PopperContent: React.ForwardRefExoticComponent<PopperContentProps & React.RefAttributes<HTMLDivElement>>;
type ArrowProps = React.ComponentPropsWithoutRef<typeof ArrowPrimitive.Root>;
interface PopperArrowProps extends ArrowProps {
}
declare const PopperArrow: React.ForwardRefExoticComponent<PopperArrowProps & React.RefAttributes<SVGSVGElement>>;

export { ALIGN_OPTIONS, PopperAnchor as Anchor, PopperArrow as Arrow, PopperContent as Content, Popper, PopperAnchor, type PopperAnchorProps, PopperArrow, type PopperArrowProps, PopperContent, type PopperContentProps, type PopperProps, Popper as Root, SIDE_OPTIONS, createPopperScope };
