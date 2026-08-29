import type { ILogService, UniverInstanceType } from '@univerjs/core';
export declare function mapDocumentTypeToUniverInstanceType(documentType: UniverInstanceType): UniverInstanceType;
/**
 * This name is not appropriate. It is actually gRPC metadata context container.
 */
export interface ILogContext {
    metadata?: Record<string, string>;
}
/**
 * Convert the string to a Uint8Array and then to a base64 string directly
 * @param str
 * @returns
 */
export declare function b64EncodeUnicode(str: string): string;
/**
 * Covert the base64 string to a Uint8Array and then to a string directly
 * @param str
 * @returns
 */
export declare function b64DecodeUnicode(str: string): string;
export { v4 as uuidv4 } from 'uuid';
/**
 * Limit the number of concurrent tasks to avoid OOM
 */
export declare function limitConcurrencyTasks<T>({ tasks, handleTaskResult, limit, options, onError, }: {
    tasks: Array<() => Promise<T>>;
    handleTaskResult?: (result: T) => void;
    limit?: number;
    options?: {
        retryCount: number;
        retryDelay: number;
    };
    onError?: (error: unknown) => void;
}): Promise<void>;
/**
 * Assess and log the duration of an asynchronous operation.
 */
export declare function measureAsyncOperation<T>(operationName: string, operation: () => Promise<T>, logService: ILogService, warnThresholdMs?: number, startAdditionalInfo?: string): Promise<T>;
/**
 * Assess and log the duration of an synchronous operation.
 */
export declare function measureSyncOperation<T>(operationName: string, operation: () => T, logService: ILogService, warnThresholdMs?: number, startAdditionalInfo?: string): T;
/**
 * Yield to the event loop to allow other pending tasks to execute.
 */
export declare function yieldToEventLoop(): Promise<void>;
