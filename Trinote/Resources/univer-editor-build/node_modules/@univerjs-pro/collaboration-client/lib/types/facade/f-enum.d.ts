import { CollaborationStatus } from '@univerjs-pro/collaboration-client';
/**
 * @ignore
 */
export interface IFCollaborationClientEnumMixin {
    /**
     * Get CollaborationStatus enum. {@link CollaborationStatus}
     */
    CollaborationStatus: typeof CollaborationStatus;
}
/**
 * @ignore
 */
declare module '@univerjs/core/facade' {
    interface FEnum extends IFCollaborationClientEnumMixin {
    }
}
