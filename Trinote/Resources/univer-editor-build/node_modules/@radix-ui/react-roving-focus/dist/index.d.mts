import * as _radix_ui_react_context from '@radix-ui/react-context';
import * as React from 'react';
import { Primitive } from '@radix-ui/react-primitive';

declare const createRovingFocusGroupScope: _radix_ui_react_context.CreateScope;
declare const Orientation: {
    readonly Vertical: "vertical";
    readonly Horizontal: "horizontal";
};
type Orientation = (typeof Orientation)[keyof typeof Orientation];
declare const Direction: {
    readonly LTR: "ltr";
    readonly RTL: "rtl";
};
type Direction = (typeof Direction)[keyof typeof Direction];
interface RovingFocusGroupOptions {
    /**
     * The orientation of the group.
     * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
     */
    orientation?: Orientation | undefined;
    /**
     * The direction of navigation between items.
     */
    dir?: Direction | undefined;
    /**
     * Whether keyboard navigation should loop around
     * @defaultValue false
     */
    loop?: boolean | undefined;
}
interface RovingFocusGroupProps extends RovingFocusGroupImplProps {
}
declare const RovingFocusGroup: React.ForwardRefExoticComponent<RovingFocusGroupProps & React.RefAttributes<HTMLDivElement>>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface RovingFocusGroupImplProps extends Omit<PrimitiveDivProps, 'dir'>, RovingFocusGroupOptions {
    currentTabStopId?: string | null | undefined;
    defaultCurrentTabStopId?: string | undefined;
    onCurrentTabStopIdChange?: {
        bivarianceHack(tabStopId: string | null): void;
    }['bivarianceHack'] | undefined;
    onEntryFocus?: {
        bivarianceHack(event: Event): void;
    }['bivarianceHack'] | undefined;
    preventScrollOnEntryFocus?: boolean | undefined;
}
type PrimitiveSpanProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;
interface RovingFocusItemProps extends Omit<PrimitiveSpanProps, 'children'> {
    tabStopId?: string | undefined;
    focusable?: boolean | undefined;
    active?: boolean | undefined;
    children?: React.ReactNode | ((props: {
        hasTabStop: boolean;
        isCurrentTabStop: boolean;
    }) => React.ReactNode) | undefined;
}
declare const RovingFocusGroupItem: React.ForwardRefExoticComponent<RovingFocusItemProps & React.RefAttributes<HTMLSpanElement>>;

export { RovingFocusGroupItem as Item, RovingFocusGroup as Root, RovingFocusGroup, RovingFocusGroupItem, type RovingFocusGroupProps, type RovingFocusItemProps, createRovingFocusGroupScope };
