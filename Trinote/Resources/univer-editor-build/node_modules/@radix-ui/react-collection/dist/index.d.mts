import * as _radix_ui_react_context from '@radix-ui/react-context';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

type SlotProps$1 = React.ComponentPropsWithoutRef<typeof Slot>;
interface CollectionProps extends SlotProps$1 {
    scope: any;
}
declare function createCollection$1<ItemElement extends HTMLElement, ItemData = {}>(name: string): readonly [{
    readonly Provider: React.FC<{
        children?: React.ReactNode | undefined;
        scope: any;
    }>;
    readonly Slot: React.ForwardRefExoticComponent<CollectionProps & React.RefAttributes<HTMLElement>>;
    readonly ItemSlot: React.ForwardRefExoticComponent<React.PropsWithoutRef<ItemData & {
        children: React.ReactNode;
        scope: any;
    }> & React.RefAttributes<ItemElement>>;
}, (scope: any) => () => ({
    ref: React.RefObject<ItemElement | null>;
} & ItemData)[], _radix_ui_react_context.CreateScope];

declare class OrderedDict<K, V> extends Map<K, V> {
    #private;
    constructor(iterable?: Iterable<readonly [K, V]> | null | undefined);
    set(key: K, value: V): this;
    /**
     * Sets a key-value pair so that it ends up at the given index.
     * - Existing keys are moved
     * - Negative indices count from the end of the resulting dictionary, so
     *   inserting at -1 makes the item the last one, -2 the second to last, etc.
     * - Out-of-range indices are clamped
     */
    insert(index: number, key: K, value: V): this;
    with(index: number, key: K, value: V): OrderedDict<K, V>;
    before(key: K): [K, V] | undefined;
    /**
     * Sets a new key-value pair at the position before the given key.
     */
    setBefore(key: K, newKey: K, value: V): this;
    after(key: K): [K, V] | undefined;
    /**
     * Sets a new key-value pair at the position after the given key.
     */
    setAfter(key: K, newKey: K, value: V): this;
    first(): [K, V] | undefined;
    last(): [K, V] | undefined;
    clear(): void;
    delete(key: K): boolean;
    deleteAt(index: number): boolean;
    at(index: number): V | undefined;
    entryAt(index: number): [K, V] | undefined;
    indexOf(key: K): number;
    keyAt(index: number): K | undefined;
    from(key: K, offset: number): V | undefined;
    keyFrom(key: K, offset: number): K | undefined;
    find(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => boolean, thisArg?: any): [K, V] | undefined;
    findIndex(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => boolean, thisArg?: any): number;
    filter<KK extends K, VV extends V>(predicate: (entry: [K, V], index: number, dict: OrderedDict<K, V>) => entry is [KK, VV], thisArg?: any): OrderedDict<KK, VV>;
    filter(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => unknown, thisArg?: any): OrderedDict<K, V>;
    map<U>(callbackfn: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => U, thisArg?: any): OrderedDict<K, U>;
    reduce(callbackfn: (previousValue: [K, V], currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => [K, V]): [K, V];
    reduce(callbackfn: (previousValue: [K, V], currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => [K, V], initialValue: [K, V]): [K, V];
    reduce<U>(callbackfn: (previousValue: U, currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => U, initialValue: U): U;
    reduceRight(callbackfn: (previousValue: [K, V], currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => [K, V]): [K, V];
    reduceRight(callbackfn: (previousValue: [K, V], currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => [K, V], initialValue: [K, V]): [K, V];
    reduceRight<U>(callbackfn: (previousValue: U, currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => U, initialValue: U): U;
    /**
     * Sorts the dictionary in place. This method mutates the dictionary and
     * returns a reference to the same object
     *
     * @param compareFn Function used to determine the order of the elements. It
     * is expected to return a negative value if the first argument is less than
     * the second argument, zero if they're equal, and a positive value otherwise.
     */
    sort(compareFn: (a: [K, V], b: [K, V]) => number): OrderedDict<K, V>;
    /**
     * Returns a copy of the dictionary with its elements sorted.
     *
     * @param compareFn Function used to determine the order of the elements. It
     * is expected to return a negative value if the first argument is less than
     * the second argument, zero if they're equal, and a positive value otherwise.
     */
    toSorted(compareFn: (a: [K, V], b: [K, V]) => number): OrderedDict<K, V>;
    toReversed(): OrderedDict<K, V>;
    toSpliced(start: number, deleteCount?: number): OrderedDict<K, V>;
    toSpliced(start: number, deleteCount: number, ...items: [K, V][]): OrderedDict<K, V>;
    slice(start?: number, end?: number): OrderedDict<K, V>;
    every(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => unknown, thisArg?: any): boolean;
    some(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => unknown, thisArg?: any): boolean;
}
type ReadOnlyOrderedDict<K, V> = Omit<OrderedDict<K, V>, 'set' | 'insert' | 'setBefore' | 'setAfter' | 'clear' | 'delete' | 'deleteAt' | 'sort'>;

type SlotProps = React.ComponentPropsWithoutRef<typeof Slot>;
interface CollectionSlotProps extends SlotProps {
    scope: any;
}
interface BaseItemData {
    id?: string | undefined;
}
type ItemDataWithElement<ItemData extends BaseItemData, ItemElement extends HTMLElement> = ItemData & {
    element: ItemElement;
};
type BaseCollectionDict<ItemElement extends HTMLElement, ItemData extends BaseItemData> = OrderedDict<ItemElement, ItemDataWithElement<ItemData, ItemElement>>;
type CollectionDict<ItemElement extends HTMLElement, ItemData> = ReadOnlyOrderedDict<ItemElement, ItemDataWithElement<ItemData & BaseItemData, ItemElement>>;
/**
 * Creates a collection that tracks its items in document order and exposes them
 * during render via `useCollection`.
 *
 * Item data passed to `ItemSlot` (every prop other than `scope` and `children`)
 * must be referentially stable across renders. It is compared shallowly, and any
 * change re-registers the item and replaces the item map. Memoize objects,
 * arrays and callbacks with `useMemo` / `useCallback`, or define them outside of
 * render.
 */
declare function createCollection<ItemElement extends HTMLElement, ItemData extends {} = {}>(name: string): readonly [{
    readonly Provider: React.FC<{
        children?: React.ReactNode | undefined;
        scope: any;
        state?: [ItemMap: BaseCollectionDict<ItemElement, ItemData & BaseItemData>, SetItemMap: React.Dispatch<React.SetStateAction<BaseCollectionDict<ItemElement, ItemData & BaseItemData>>>] | undefined;
    }>;
    readonly Slot: React.ForwardRefExoticComponent<CollectionSlotProps & React.RefAttributes<HTMLElement>>;
    readonly ItemSlot: React.ForwardRefExoticComponent<React.PropsWithoutRef<ItemData & BaseItemData & {
        children: React.ReactNode;
        scope: any;
    }> & React.RefAttributes<ItemElement>>;
}, {
    createCollectionScope: _radix_ui_react_context.CreateScope;
    useCollection: (scope: any) => CollectionDict<ItemElement, ItemData & BaseItemData>;
    useGetCollection: (scope: any) => () => CollectionDict<ItemElement, ItemData & BaseItemData>;
    useInitCollection: () => [BaseCollectionDict<ItemElement, ItemData & BaseItemData>, React.Dispatch<React.SetStateAction<BaseCollectionDict<ItemElement, ItemData & BaseItemData>>>];
}];

export { type CollectionProps, createCollection$1 as createCollection, type CollectionDict as unstable_CollectionDict, type CollectionSlotProps as unstable_CollectionSlotProps, createCollection as unstable_createCollection };
