import type { CSSProperties, ReactElement, Ref, SVGAttributes } from 'react';
export interface IIconProps extends SVGAttributes<SVGSVGElement> {
    /** Preserve scalable stroke widths relative to a 16×16 baseline. */
    preserveStrokeWidth?: boolean;
    extend?: IExtendProps;
}
export type IconProps = IIconProps;
export interface IIconFulfilledProps extends IIconProps {
    icon: IIconElement;
    id: string;
}
export type IconFulfilledProps = IIconFulfilledProps;
export interface IExtendProps {
    colorChannel1?: string;
}
export interface IAttrs {
    [key: string]: any;
}
export type Attrs = IAttrs;
export interface IIconElement {
    tag: string;
    attrs: IAttrs;
    style?: CSSProperties;
    children?: IIconElement[];
    defIds?: string[];
}
export type IconElement = IIconElement;
export declare function IconBase({ ref, ...props }: {
    ref: Ref<SVGElement>;
} & IIconFulfilledProps): ReactElement<unknown, string | import("react").JSXElementConstructor<any>>;
export declare namespace IconBase {
    var displayName: string;
}
