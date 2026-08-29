import type { Nullable } from '@univerjs/core';
import type { ITextRangeWithStyle } from '@univerjs/engine-render';
import type { IUpdateCursor } from '@univerjs/protocol';
import { RxDisposable } from '@univerjs/core';
export interface ICollabEditingCursor {
    unitID: string;
    memberID: string;
    textRanges: ITextRangeWithStyle[];
}
export declare class DocSyncEditingCollabCursorService extends RxDisposable {
    private readonly _collabCursorState$;
    readonly collabCursorState$: import("rxjs").Observable<Nullable<IUpdateCursor>>;
    syncEditingCollabCursor(collabCursor: ICollabEditingCursor): void;
}
