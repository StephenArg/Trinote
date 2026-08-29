declare class ColorUtilWithCache {
    private _cache;
    private _clamp;
    private _parseHex;
    private _parseRgbString;
    private _parseColorString;
    private _formatColor;
    private _adjust;
    getColorString(fill: string | undefined, baseColor: string, opacity?: number): string;
}
export declare const getColorUtilWithCacheInstance: () => ColorUtilWithCache;
export {};
