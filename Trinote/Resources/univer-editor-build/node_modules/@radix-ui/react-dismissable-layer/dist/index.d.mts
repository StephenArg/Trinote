import * as React from 'react';
import { Primitive } from '@radix-ui/react-primitive';

type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface DismissableLayerProps extends PrimitiveDivProps {
    /**
     * When `true`, hover/focus/click interactions will be disabled on elements outside
     * the `DismissableLayer`. Users will need to click twice on outside elements to
     * interact with them: once to close the `DismissableLayer`, and again to trigger the element.
     */
    disableOutsidePointerEvents?: boolean | undefined;
    /**
     * When `true`, a `'pointerdown'` event outside of the layered element will
     * wait for the interaction's click event before dispatching, allowing
     * third-party code to stop propagation of later events and cancel dismissal.
     */
    deferPointerDownOutside?: boolean | undefined;
    /**
     * Event handler called when the escape key is down.
     * Can be prevented.
     */
    onEscapeKeyDown?: {
        bivarianceHack(event: KeyboardEvent): void;
    }['bivarianceHack'] | undefined;
    /**
     * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
     * Can be prevented.
     */
    onPointerDownOutside?: {
        bivarianceHack(event: PointerDownOutsideEvent): void;
    }['bivarianceHack'] | undefined;
    /**
     * Event handler called when the focus moves outside of the `DismissableLayer`.
     * Can be prevented.
     */
    onFocusOutside?: {
        bivarianceHack(event: FocusOutsideEvent): void;
    }['bivarianceHack'] | undefined;
    /**
     * Event handler called when an interaction happens outside the `DismissableLayer`.
     * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
     * Can be prevented.
     */
    onInteractOutside?: {
        bivarianceHack(event: PointerDownOutsideEvent | FocusOutsideEvent): void;
    }['bivarianceHack'] | undefined;
    /**
     * Handler called when the `DismissableLayer` should be dismissed
     */
    onDismiss?: (() => void) | undefined;
}
declare const DismissableLayer: React.ForwardRefExoticComponent<DismissableLayerProps & React.RefAttributes<HTMLDivElement>>;
type DismissableLayerBranchElement = React.ComponentRef<typeof Primitive.div>;
interface DismissableLayerBranchProps extends PrimitiveDivProps {
}
declare const DismissableLayerBranch: React.ForwardRefExoticComponent<DismissableLayerBranchProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Registers a node as a "dismiss surface" for the enclosing DismissableLayer
 */
declare function useDismissableLayerSurface(): React.RefCallback<DismissableLayerBranchElement>;
type PointerDownOutsideEvent = CustomEvent<{
    originalEvent: PointerEvent;
}>;
type FocusOutsideEvent = CustomEvent<{
    originalEvent: FocusEvent;
}>;

export { DismissableLayerBranch as Branch, DismissableLayer, DismissableLayerBranch, type DismissableLayerProps, DismissableLayer as Root, useDismissableLayerSurface };
