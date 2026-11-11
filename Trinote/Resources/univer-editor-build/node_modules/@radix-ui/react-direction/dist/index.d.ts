import * as React from 'react';

declare const Direction: {
    readonly LTR: "ltr";
    readonly RTL: "rtl";
};
type Direction = (typeof Direction)[keyof typeof Direction];
interface DirectionProviderProps {
    children?: React.ReactNode | undefined;
    dir: Direction;
}
declare const DirectionProvider: React.FC<DirectionProviderProps>;
declare function useDirection(localDir?: Direction): Direction;

export { DirectionProvider, DirectionProvider as Provider, useDirection };
