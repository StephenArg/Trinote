import type { IAccessor } from '@univerjs/core';
import type { Observable } from 'rxjs';
export declare function hasDimensionOutlineViewPermission(accessor: IAccessor, unitId: string, subUnitId: string): boolean;
export declare function getDimensionOutlineViewPermission$(accessor: IAccessor, unitId: string, subUnitId: string): Observable<boolean>;
