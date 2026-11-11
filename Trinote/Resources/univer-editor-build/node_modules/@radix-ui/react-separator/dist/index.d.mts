import * as React from 'react';
import { Primitive } from '@radix-ui/react-primitive';

declare const Orientation: {
    readonly Horizontal: "horizontal";
    readonly Vertical: "vertical";
};
type Orientation = (typeof Orientation)[keyof typeof Orientation];
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface SeparatorProps extends PrimitiveDivProps {
    /**
     * Either `vertical` or `horizontal`. Defaults to `horizontal`.
     */
    orientation?: Orientation | undefined;
    /**
     * Whether or not the component is purely decorative. When true, accessibility-related attributes
     * are updated so that the rendered element is removed from the accessibility tree.
     */
    decorative?: boolean | undefined;
}
declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;

export { Separator as Root, Separator, type SeparatorProps };
