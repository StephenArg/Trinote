import type { IDimensionOutline, ISheetsOutlineResource } from '../common/type';
import { Disposable } from '@univerjs/core';
export declare class SheetsOutlineModel extends Disposable {
    private readonly _outlines;
    private readonly _change$;
    readonly change$: import("rxjs").Observable<{
        unitId: string;
        subUnitId?: string;
    }>;
    getOutlines(unitId: string, subUnitId: string): IDimensionOutline[];
    getUnitOutlines(unitId: string): Map<string, IDimensionOutline[]>;
    setOutlines(unitId: string, subUnitId: string, outlines: IDimensionOutline[]): void;
    removeUnit(unitId: string): void;
    serialize(unitId: string): ISheetsOutlineResource;
    deserialize(unitId: string, resource: ISheetsOutlineResource): void;
    dispose(): void;
    private _ensureUnitOutlines;
}
