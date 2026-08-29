import type { CollaborationStatus } from '@univerjs-pro/collaboration-client';
import type { IEventBase } from '@univerjs/core/facade';
/**
 * Event triggered when collaboration status changes for a unit
 */
export interface ICollaborationStatusChangedEventParams extends IEventBase {
    /**
     * The unit ID whose collaboration status changed
     */
    unitId: string;
    /**
     * The new collaboration status
     */
    status: CollaborationStatus;
}
/**
 * Collaboration event name mixin interface
 * @ignore
 */
export interface IFCollaborationEventNameMixin {
    /**
     * Event triggered when collaboration status changes
     * @see {@link ICollaborationStatusChangedEventParams}
     * @example
     * ```typescript
     * univerAPI.addEvent(univerAPI.Event.CollaborationStatusChanged, (event) => {
     *   const { unitId, status } = event;
     *   console.log(`Unit ${unitId} status changed to:`, status);
     *
     *   if (status === univerAPI.Enum.CollaborationStatus.SYNCED) {
     *     console.log('All changes are synced!');
     *   }
     * });
     * ```
     */
    readonly CollaborationStatusChanged: 'CollaborationStatusChanged';
}
/**
 * Collaboration event parameter configuration
 * @ignore
 */
export interface ICollaborationEventParamConfig {
    CollaborationStatusChanged: ICollaborationStatusChangedEventParams;
}
declare module '@univerjs/core/facade' {
    interface FEventName extends IFCollaborationEventNameMixin {
    }
    interface IEventParamConfig extends ICollaborationEventParamConfig {
    }
}
