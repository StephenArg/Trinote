import * as React from 'react';
import { Primitive } from '@radix-ui/react-primitive';

type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface FocusScopeProps extends PrimitiveDivProps {
    /**
     * When `true`, tabbing from last item will focus first tabbable
     * and shift+tab from first item will focus last tababble.
     * @defaultValue false
     */
    loop?: boolean | undefined;
    /**
     * When `true`, focus cannot escape the focus scope via keyboard,
     * pointer, or a programmatic focus.
     * @defaultValue false
     */
    trapped?: boolean | undefined;
    /**
     * A list of nodes that should be treated as part of the focus scope even
     * though they don't live within the scope's DOM subtree (eg. portalled
     * content of a nested, non-modal layer). When the scope is `trapped`, focus
     * is allowed to move into these branches without being reclaimed.
     *
     * See: https://github.com/radix-ui/primitives/issues/3423
     */
    branches?: HTMLElement[] | undefined;
    /**
     * Event handler called when auto-focusing on mount.
     * Can be prevented.
     */
    onMountAutoFocus?: {
        bivarianceHack(event: Event): void;
    }['bivarianceHack'] | undefined;
    /**
     * Event handler called when auto-focusing on unmount.
     * Can be prevented.
     */
    onUnmountAutoFocus?: {
        bivarianceHack(event: Event): void;
    }['bivarianceHack'] | undefined;
}
declare const FocusScope: React.ForwardRefExoticComponent<FocusScopeProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Lets portalled content that is a React descendant of a (modal) layer — but rendered outside of
 * that layer's DOM subtree — register itself as a "branch" of the layer's focus scope.
 *
 * A modal container (eg. `Dialog`) creates a registry via `useFocusScopeBranchRegistry`, renders a
 * `FocusScopeBranchProvider` around its children, and passes the collected `nodes` to its trapped
 * `FocusScope` (so focus isn't reclaimed from the branch) and, if applicable, to its `RemoveScroll`
 * `shards` (so the branch remains scrollable). Nested layers (eg. a non-modal `Popover`) register
 * their content node with `useFocusScopeBranch`.
 *
 * See: https://github.com/radix-ui/primitives/issues/3423
 */
interface FocusScopeBranchRegistry {
    add: (node: HTMLElement) => void;
    remove: (node: HTMLElement) => void;
}
interface FocusScopeBranchProviderProps {
    /**
     * The registry nested layers should register themselves with. When nullish the provider is
     * transparent, letting nested layers register against the next registry up the tree instead. This
     * is the case for layers that don't trap focus or lock scroll, which have nothing to host.
     */
    registry: FocusScopeBranchRegistry | null | undefined;
    children?: React.ReactNode | undefined;
}
declare function FocusScopeBranchProvider({ registry, children }: FocusScopeBranchProviderProps): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.JSX.Element | null | undefined;
declare function useFocusScopeBranchRegistry(): {
    readonly nodes: HTMLElement[];
    readonly registry: FocusScopeBranchRegistry;
};
/**
 * Registers `node` as a branch of the nearest ancestor `FocusScopeBranchProvider`. No-ops when
 * there is no ancestor registry (eg. the layer isn't nested inside a modal layer).
 */
declare function useFocusScopeBranch(node: HTMLElement | null): void;

export { FocusScope, FocusScopeBranchProvider, type FocusScopeBranchProviderProps, type FocusScopeBranchRegistry, type FocusScopeProps, FocusScope as Root, useFocusScopeBranch, useFocusScopeBranchRegistry };
