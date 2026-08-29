import type { CellId, IDecodedCell } from './types';
/**
 * Encodes unit / sheet / row / column coordinates into compact numeric keys.
 *
 * `CellId` is encoded as:
 * `sheetKey * maxRows * maxCols + row * maxCols + col`.
 */
export declare class CellCodec {
    readonly maxRows: number;
    readonly maxCols: number;
    readonly sheetSize: number;
    private readonly _sheetKeyById;
    private readonly _sheetIdByKey;
    constructor(maxRows: number, maxCols: number);
    reset(): void;
    encodeCell(unitId: string, sheetId: string, row: number, col: number): CellId;
    decodeCell(cell: CellId): IDecodedCell;
    encodeSheet(unitId: string, sheetId: string): number;
    decodeSheetKey(sheetKey: number): {
        unitId: string;
        sheetId: string;
    };
    encodeRow(unitId: string, sheetId: string, row: number): number;
    encodeRowBySheetKey(sheetKey: number, row: number): number;
    decodeRowKey(key: number): {
        sheetKey: number;
        unitId: string;
        sheetId: string;
        row: number;
    };
    encodeCol(unitId: string, sheetId: string, col: number): number;
    encodeColBySheetKey(sheetKey: number, col: number): number;
    decodeColKey(key: number): {
        sheetKey: number;
        unitId: string;
        sheetId: string;
        col: number;
    };
}
