import type { IOutlineMutationError } from '../common/type';
import { Disposable } from '@univerjs/core';
export declare class SheetsOutlineErrorService extends Disposable {
    private readonly _error$;
    readonly error$: import("rxjs").Observable<IOutlineMutationError>;
    emit(error: IOutlineMutationError): void;
    dispose(): void;
}
