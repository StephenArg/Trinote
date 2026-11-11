import * as _radix_ui_react_context from '@radix-ui/react-context';
import * as React from 'react';
import { DismissableLayer } from '@radix-ui/react-dismissable-layer';
import { FocusScope } from '@radix-ui/react-focus-scope';
import * as PopperPrimitive from '@radix-ui/react-popper';
import { Portal } from '@radix-ui/react-portal';
import { Primitive } from '@radix-ui/react-primitive';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';

declare const Direction: {
    readonly LTR: "ltr";
    readonly RTL: "rtl";
};
type Direction = (typeof Direction)[keyof typeof Direction];
declare const createMenuScope: _radix_ui_react_context.CreateScope;
interface MenuProps {
    children?: React.ReactNode | undefined;
    open?: boolean | undefined;
    onOpenChange?: {
        bivarianceHack(open: boolean): void;
    }['bivarianceHack'] | undefined;
    dir?: Direction | undefined;
    modal?: boolean | undefined;
}
declare const Menu: React.FC<MenuProps>;
type PopperAnchorProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Anchor>;
interface MenuAnchorProps extends PopperAnchorProps {
}
declare const MenuAnchor: React.ForwardRefExoticComponent<MenuAnchorProps & React.RefAttributes<HTMLDivElement>>;
type PortalProps = React.ComponentPropsWithoutRef<typeof Portal>;
interface MenuPortalProps {
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
declare const MenuPortal: React.FC<MenuPortalProps>;
/**
 * We purposefully don't union MenuRootContent and MenuSubContent props here because
 * they have conflicting prop types. We agreed that we would allow MenuSubContent to
 * accept props that it would just ignore.
 */
interface MenuContentProps extends MenuRootContentTypeProps {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true | undefined;
}
declare const MenuContent: React.ForwardRefExoticComponent<MenuContentProps & React.RefAttributes<HTMLDivElement>>;
interface MenuRootContentTypeProps extends Omit<MenuContentImplProps, keyof MenuContentImplPrivateProps> {
}
type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusScope>;
type DismissableLayerProps = React.ComponentPropsWithoutRef<typeof DismissableLayer>;
type RovingFocusGroupProps = React.ComponentPropsWithoutRef<typeof RovingFocusGroup.Root>;
type PopperContentProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Content>;
type MenuContentImplPrivateProps = {
    onOpenAutoFocus?: FocusScopeProps['onMountAutoFocus'] | undefined;
    onDismiss?: DismissableLayerProps['onDismiss'] | undefined;
    disableOutsidePointerEvents?: DismissableLayerProps['disableOutsidePointerEvents'] | undefined;
    /**
     * Whether scrolling outside the `MenuContent` should be prevented
     * (default: `false`)
     */
    disableOutsideScroll?: boolean | undefined;
    /**
     * Whether focus should be trapped within the `MenuContent`
     * (default: false)
     */
    trapFocus?: FocusScopeProps['trapped'] | undefined;
};
interface MenuContentImplProps extends MenuContentImplPrivateProps, Omit<PopperContentProps, 'dir' | 'onPlaced'> {
    /**
     * Event handler called when auto-focusing on close.
     * Can be prevented.
     */
    onCloseAutoFocus?: FocusScopeProps['onUnmountAutoFocus'] | undefined;
    /**
     * Whether keyboard navigation should loop around
     * @defaultValue false
     */
    loop?: RovingFocusGroupProps['loop'] | undefined;
    onEntryFocus?: RovingFocusGroupProps['onEntryFocus'] | undefined;
    onEscapeKeyDown?: DismissableLayerProps['onEscapeKeyDown'] | undefined;
    onPointerDownOutside?: DismissableLayerProps['onPointerDownOutside'] | undefined;
    onFocusOutside?: DismissableLayerProps['onFocusOutside'] | undefined;
    onInteractOutside?: DismissableLayerProps['onInteractOutside'] | undefined;
}
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface MenuGroupProps extends PrimitiveDivProps {
}
declare const MenuGroup: React.ForwardRefExoticComponent<MenuGroupProps & React.RefAttributes<HTMLDivElement>>;
interface MenuLabelProps extends PrimitiveDivProps {
}
declare const MenuLabel: React.ForwardRefExoticComponent<MenuLabelProps & React.RefAttributes<HTMLDivElement>>;
interface MenuItemProps extends Omit<MenuItemImplProps, 'onSelect'> {
    onSelect?: {
        bivarianceHack(event: Event): void;
    }['bivarianceHack'] | undefined;
}
declare const MenuItem: React.ForwardRefExoticComponent<MenuItemProps & React.RefAttributes<HTMLDivElement>>;
interface MenuItemImplProps extends PrimitiveDivProps {
    disabled?: boolean | undefined;
    textValue?: string | undefined;
}
type CheckedState = boolean | 'indeterminate';
interface MenuCheckboxItemProps extends MenuItemProps {
    checked?: CheckedState | undefined;
    onCheckedChange?: {
        bivarianceHack(checked: boolean): void;
    }['bivarianceHack'] | undefined;
}
declare const MenuCheckboxItem: React.ForwardRefExoticComponent<MenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>>;
interface MenuRadioGroupProps extends MenuGroupProps {
    value?: string | undefined;
    onValueChange?: {
        bivarianceHack(value: string): void;
    }['bivarianceHack'] | undefined;
}
declare const MenuRadioGroup: React.ForwardRefExoticComponent<MenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
interface MenuRadioItemProps extends MenuItemProps {
    value: string;
}
declare const MenuRadioItem: React.ForwardRefExoticComponent<MenuRadioItemProps & React.RefAttributes<HTMLDivElement>>;
type PrimitiveSpanProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;
interface MenuItemIndicatorProps extends PrimitiveSpanProps {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true | undefined;
}
declare const MenuItemIndicator: React.ForwardRefExoticComponent<MenuItemIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
interface MenuSeparatorProps extends PrimitiveDivProps {
}
declare const MenuSeparator: React.ForwardRefExoticComponent<MenuSeparatorProps & React.RefAttributes<HTMLDivElement>>;
type PopperArrowProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Arrow>;
interface MenuArrowProps extends PopperArrowProps {
}
declare const MenuArrow: React.ForwardRefExoticComponent<MenuArrowProps & React.RefAttributes<SVGSVGElement>>;
interface MenuSubProps {
    children?: React.ReactNode | undefined;
    open?: boolean | undefined;
    onOpenChange?: {
        bivarianceHack(open: boolean): void;
    }['bivarianceHack'] | undefined;
}
declare const MenuSub: React.FC<MenuSubProps>;
interface MenuSubTriggerProps extends MenuItemImplProps {
}
declare const MenuSubTrigger: React.ForwardRefExoticComponent<MenuSubTriggerProps & React.RefAttributes<HTMLDivElement>>;
type AlignSubContent = Exclude<(typeof PopperPrimitive.ALIGN_OPTIONS)[number], 'center'>;
interface MenuSubContentProps extends Omit<MenuContentImplProps, keyof MenuContentImplPrivateProps | 'onCloseAutoFocus' | 'onEntryFocus' | 'side' | 'align'> {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true | undefined;
    /**
     * Controls the direction the subcontent appears from its anchor menu item
     * Default: start
     */
    align?: AlignSubContent | undefined;
}
declare const MenuSubContent: React.ForwardRefExoticComponent<MenuSubContentProps & React.RefAttributes<HTMLDivElement>>;

export { MenuAnchor as Anchor, MenuArrow as Arrow, MenuCheckboxItem as CheckboxItem, MenuContent as Content, MenuGroup as Group, MenuItem as Item, MenuItemIndicator as ItemIndicator, MenuLabel as Label, Menu, MenuAnchor, type MenuAnchorProps, MenuArrow, type MenuArrowProps, MenuCheckboxItem, type MenuCheckboxItemProps, MenuContent, type MenuContentProps, MenuGroup, type MenuGroupProps, MenuItem, MenuItemIndicator, type MenuItemIndicatorProps, type MenuItemProps, MenuLabel, type MenuLabelProps, MenuPortal, type MenuPortalProps, type MenuProps, MenuRadioGroup, type MenuRadioGroupProps, MenuRadioItem, type MenuRadioItemProps, MenuSeparator, type MenuSeparatorProps, MenuSub, MenuSubContent, type MenuSubContentProps, type MenuSubProps, MenuSubTrigger, type MenuSubTriggerProps, MenuPortal as Portal, MenuRadioGroup as RadioGroup, MenuRadioItem as RadioItem, Menu as Root, MenuSeparator as Separator, MenuSub as Sub, MenuSubContent as SubContent, MenuSubTrigger as SubTrigger, createMenuScope };
