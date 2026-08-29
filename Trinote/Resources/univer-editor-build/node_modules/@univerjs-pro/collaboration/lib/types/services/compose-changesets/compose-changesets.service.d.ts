import type { IChangeset as IProtocolChangeset } from '@univerjs/protocol';
import type { IChangeset } from '../../models/changeset';
export declare class ComposeChangesetsService {
    composeDocChangesets(changesets: IProtocolChangeset[]): IChangeset;
}
