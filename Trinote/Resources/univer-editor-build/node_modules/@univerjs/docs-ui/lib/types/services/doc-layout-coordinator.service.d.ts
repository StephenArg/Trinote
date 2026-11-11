/**
 * Copyright 2023-present DreamNum Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { DocLayoutExecutorService, IDocLayoutPageResult, IDocLayoutStartOptions, IDocLayoutStepResult } from '@univerjs/docs';
import type { DocumentLayoutReason, DocumentSkeleton, IDocumentLayoutProgress, IDocumentLayoutProtectedRange } from '@univerjs/engine-render';
import { Disposable } from '@univerjs/core';
export interface IDocLayoutCoordinatorCallbacks {
    onProgress: (progress: IDocumentLayoutProgress, publication?: IDocLayoutStepResult['publication']) => void;
    onComplete?: (progress: IDocumentLayoutProgress) => void;
    onForegroundReady?: (progress: IDocumentLayoutProgress) => void;
}
export type DocumentLayoutSchedulingSkeleton = Pick<DocumentSkeleton, 'startIncrementalLayout' | 'stepIncrementalLayout' | 'cancelIncrementalLayout'> & Partial<Pick<DocumentSkeleton, 'publishIncrementalLayoutBacklog'>>;
type DocumentLayoutSchedulingOptions = NonNullable<Parameters<DocumentSkeleton['startIncrementalLayout']>[0]> & {
    deferForeground?: boolean;
    reason: DocumentLayoutReason;
    foregroundWindowSize?: number;
    foregroundBudgetMs?: number;
    foregroundEndOffset?: number;
};
type DocLayoutSchedulingExecutor = Pick<DocLayoutExecutorService, 'startLayout' | 'stepLayout' | 'publishBacklog' | 'getLayoutPage' | 'cancelLayout' | 'disposeLayoutMount'>;
type ExternalLayoutPresentation = Pick<DocumentSkeleton, 'beginExternalLayout' | 'cancelExternalLayout'>;
export type DocLayoutVisualFrameScheduler = (callback: () => void) => () => void;
/**
 * Cooperative presentation scheduler for interactive document layout.
 *
 * The coordinator owns only timing and cancellation. The selected executor owns
 * layout state; both executors publish the same generation/step contract.
 */
export declare class DocLayoutCoordinatorService extends Disposable {
    private readonly _scheduleVisualFrame;
    private readonly _mountId;
    private _mountEpoch;
    private _viewportEpoch;
    private _workerMount;
    private _scheduledLayout;
    private _animationFrameId;
    private _idleCallbackId;
    private _fallbackTimerId;
    private _pendingWorkerPresentation;
    private _workerPresentationPaused;
    constructor(_scheduleVisualFrame?: DocLayoutVisualFrameScheduler);
    schedule(skeleton: DocumentLayoutSchedulingSkeleton, options: DocumentLayoutSchedulingOptions, callbacks: IDocLayoutCoordinatorCallbacks): number;
    scheduleWorker(unitId: string, skeleton: ExternalLayoutPresentation, executorService: DocLayoutSchedulingExecutor, options: IDocLayoutStartOptions, protectedRange: IDocumentLayoutProtectedRange | undefined, callbacks: IDocLayoutCoordinatorCallbacks, onError: (error: unknown) => void, preserveCompletedLayout?: boolean): void;
    getWorkerPage(pageIndex: number): Promise<IDocLayoutPageResult | null>;
    deferBackgroundWork(): void;
    setWorkerPresentationPaused(paused: boolean): void;
    hasScheduledLayout(): boolean;
    cancel(): void;
    dispose(): void;
    private _scheduleForeground;
    private _scheduleBackground;
    private _runSlice;
    private _runMainThreadSlice;
    private _publishMainThreadBacklog;
    private _finishForegroundWindow;
    private _completeForegroundWindow;
    private _runWorkerSlice;
    private _startWorkerLayout;
    private _publishWorkerBacklog;
    private _assertWorkerResultRevisions;
    private _publishWorkerResult;
    private _getWorkerIdentity;
    private _getWorkerGeneration;
    private _assertWorkerResultIdentity;
    private _cancelCallbacks;
}
export {};
