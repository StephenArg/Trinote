import { FWorksheet } from '@univerjs/sheets/facade';
import { FPivotTable } from './f-pivot-table';
/**
 * @ignore
 */
export interface IFWorksheetPivotMixin {
    /**
     * @description Get the pivot table id by the cell in current sheet.
     * @param {number} row The checked row.
     * @param {number} col The checked column.
     * @returns {FPivotTable|undefined} The pivot table instance or undefined.
     *
     * @example
     * ```typescript
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const pivotTable = fWorksheet.getPivotTableByCell(1, 1);
     * if(pivotTable) {
     *   pivotTable.addField(1, univerAPI.Enum.PivotTableFiledAreaEnum.Row, 0);
     * }
     * ```
     */
    getPivotTableByCell(row: number, col: number): FPivotTable | undefined;
}
export declare class FWorksheetPivotMixin extends FWorksheet implements IFWorksheetPivotMixin {
    getPivotTableByCell(row: number, col: number): FPivotTable | undefined;
}
declare module '@univerjs/sheets/facade' {
    interface FWorksheet extends IFWorksheetPivotMixin {
    }
}
