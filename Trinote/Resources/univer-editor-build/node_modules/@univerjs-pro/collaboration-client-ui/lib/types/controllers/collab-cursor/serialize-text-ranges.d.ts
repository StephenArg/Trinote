import type { ITextRangeWithStyle } from '@univerjs/engine-render';
export declare function serializeDocTextRanges(ranges: ITextRangeWithStyle[]): string;
export declare function deserializeDocTextRanges(serializedTextRanges: string): ITextRangeWithStyle[];
