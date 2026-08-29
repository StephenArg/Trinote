import type { IObjectArrayPrimitiveType, Nullable } from '@univerjs/core';
export type IntervalValue = number | [number, number];
export type PackedNumberMap = Record<string, IntervalValue[] | number>;
/**
 * Compression function (Map -> PackedNumberMap)
 */
export declare function packNumberMap(originalData: IObjectArrayPrimitiveType<Nullable<number>>): PackedNumberMap;
/**
 * Unpack function (PackedNumberMap -> Map)
 */
export declare function unpackNumberMap(compactData: PackedNumberMap): IObjectArrayPrimitiveType<number>;
