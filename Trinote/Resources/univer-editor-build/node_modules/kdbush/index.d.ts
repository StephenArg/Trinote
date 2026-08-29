export default class KDBush {
    /**
     * Creates an index from raw `ArrayBuffer` data.
     * @param {ArrayBufferLike} data
     */
    static from(data: ArrayBufferLike): KDBush;
    /**
     * Creates an index that will hold a given number of items.
     * @param {number} numItems
     * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
     * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
     * @param {ArrayBufferConstructor | SharedArrayBufferConstructor} [ArrayBufferType=ArrayBuffer] The array buffer type used for storage (`ArrayBuffer` by default).
     * @param {ArrayBufferLike} [data] (For internal use only)
     */
    constructor(numItems: number, nodeSize?: number, ArrayType?: TypedArrayConstructor, ArrayBufferType?: ArrayBufferConstructor | SharedArrayBufferConstructor, data?: ArrayBufferLike);
    numItems: number;
    nodeSize: number;
    ArrayType: TypedArrayConstructor;
    IndexArrayType: Uint16ArrayConstructor | Uint32ArrayConstructor;
    data: ArrayBufferLike;
    ids: Uint16Array<ArrayBuffer> | Uint32Array<ArrayBuffer>;
    coords: Int8Array<ArrayBuffer> | Uint8Array<ArrayBuffer> | Uint8ClampedArray<ArrayBuffer> | Int16Array<ArrayBuffer> | Uint16Array<ArrayBuffer> | Int32Array<ArrayBuffer> | Uint32Array<ArrayBuffer> | Float32Array<ArrayBuffer> | Float64Array<ArrayBuffer>;
    _pos: number;
    _finished: boolean;
    /**
     * Add a point to the index.
     * @param {number} x
     * @param {number} y
     * @returns {number} An incremental index associated with the added item (starting from `0`).
     */
    add(x: number, y: number): number;
    /**
     * Perform indexing of the added points.
     */
    finish(): this;
    /**
     * Search the index for items within a given bounding box.
     * @param {number} minX
     * @param {number} minY
     * @param {number} maxX
     * @param {number} maxY
     * @returns {number[]} An array of indices correponding to the found items.
     */
    range(minX: number, minY: number, maxX: number, maxY: number): number[];
    /**
     * Search the index for items within a given radius.
     * @param {number} qx
     * @param {number} qy
     * @param {number} r Query radius.
     * @returns {number[]} An array of indices correponding to the found items.
     */
    within(qx: number, qy: number, r: number): number[];
    /**
     * Search the index for items within a given radius, writing matching ids into `out`
     * via indexed assignment (`out[i] = id`). Accepts any indexed-writable container —
     * a typed array sized to the expected upper bound (allocation-free, fast) or a plain
     * `Array` (which will grow as needed). Returns the number of matches written.
     * @param {number} qx
     * @param {number} qy
     * @param {number} r Query radius.
     * @param {number[] | TypedArray} out Container to write matching ids into.
     * @returns {number} The number of matches written to `out`.
     */
    withinInto(qx: number, qy: number, r: number, out: number[] | TypedArray): number;
}
export type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
