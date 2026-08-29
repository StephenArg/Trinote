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
import type { IAccessor, IDisposable } from '../../common/di';
import { Injector } from '../../common/di';
import { Disposable } from '../../shared/lifecycle';
import { IConfigService } from '../config/config.service';
import { IContextService } from '../context/context.service';
import { ILogService } from '../log/log.service';
/**
 * The config key for enabling command execution logging.
 * Set via `logCommandExecution` in `IUniverConfig` when calling `new Univer()`.
 * @default true
 */
export declare const COMMAND_LOG_EXECUTION_CONFIG_KEY = "command.logExecution";
/**
 * The type of a command.
 */
export declare enum CommandType {
    /**
     * Responsible for creating, orchestrating, and executing MUTATION or OPERATION according to specific business
     * logic. For example, a delete row COMMAND will generate a delete row MUTATION, an insert row MUTATION for undo,
     * and a set cell content MUTATION.
     */
    COMMAND = 0,
    /**
     * OPERATION is the change made to data that is not saved to snapshot, without conflict resolution,
     * such as modifying scroll position, modifying sidebar state, etc.
     */
    OPERATION = 1,
    /**
     * MUTATION is the change made to the data saved to snapshot, such as inserting rows and columns,
     * modifying cell content, modifying filter ranges, etc. If you want to add collaborative editing capabilities to
     * Univer, it is the smallest unit of conflict resolution.
     */
    MUTATION = 2
}
/**
 * In Univer, all data modifications need to be executed through commands. The command-based approach can better track
 * changes in values, implement functions such as undo, redo, and collaborative editing, handle complex associated
 * logic between functions, etc.
 *
 * All commands should implements this interface or related {@link IMutation} or {@link IOperation} interface, and
 * should be registered in the {@link ICommandService}.
 */
export interface ICommand<P extends object = object, R = boolean> {
    /**
     * Identifier of the command. It should be unique in the application unless it is a {@link IMultiCommand}.
     * Its pattern should be like `<namespace>.<type>.<command-name>`.
     *
     * @example { id: 'sheet.command.set-selection-frozen' }
     */
    readonly id: string;
    /**
     * The type of the command.
     */
    readonly type: CommandType;
    /**
     * The handler of the command.
     * @param accessor The accessor to the dependency injection container.
     * @param params Params of the command. Params should be serializable.
     * @param options Options of the command.
     * @returns The result of the command. By default it should be a boolean value which indicates the command is
     * executed successfully or not.
     */
    handler(accessor: IAccessor, params?: P, options?: IExecutionOptions): Promise<R> | R;
}
/**
 * A command that may have multiple implementations. Each implementation should have different `priority`
 * and `preconditions` callback to determine which implementation should be executed.
 */
export interface IMultiCommand<P extends object = object, R = boolean> extends ICommand<P, R> {
    /** The name of the multi command. It should be unique in the application. */
    name: string;
    /** @ignore */
    multi: true;
    /** Priority of this implementation. Implementation with higher priority will be checked first. */
    priority: number;
    /**
     * A callback function that tells `ICommandService` if this implementation should be executed.
     * @param contextService The context service.
     * @returns If this implementation should be executed, return `true`, otherwise return `false`.
     */
    preconditions?: (contextService: IContextService) => boolean;
}
export interface IMutationCommonParams {
    /**
     * It is used to indicate which {@link CommandType.COMMAND} triggers the mutation.
     */
    trigger?: string;
    /**
     * Mark this mutation as a split chunk from a large mutation.
     * When collaboration layer encounters this flag, it will send this mutation
     * in a separate changeset to avoid oversized payloads.
     *
     * This is typically set by operations that split large data (e.g., copy worksheet,
     * paste large ranges) into smaller chunks for better network transmission.
     */
    __splitChunk__?: boolean;
}
/**
 * {@link CommandType.MUTATION} should implement this interface.
 */
export interface IMutation<P extends object, R = boolean> extends ICommand<P, R> {
    type: CommandType.MUTATION;
    /**
     * The handler of the mutation.
     * @param accessor The accessor to the dependency injection container.
     * @param params Params of the mutation. Params should be serializable.
     * @returns The result of the mutation. By default it should be a boolean value which indicates the mutation is
     * executed successfully or not.
     */
    handler(accessor: IAccessor, params: P): R;
}
/**
 * {@link CommandType.OPERATION} should implement this interface.
 */
export interface IOperation<P extends object = object, R = boolean> extends ICommand<P, R> {
    type: CommandType.OPERATION;
    /**
     * The handler of the operation.
     * @param accessor The accessor to the dependency injection container.
     * @param params Params of the operation. Params should be serializable.
     * @returns The result of the operation. By default it should be a boolean value which indicates the operation is
     * executed successfully or not.
     */
    handler(accessor: IAccessor, params: P): R;
}
/**
 * This object represents an execution of a command.
 */
export interface ICommandInfo<T extends object = object> {
    /**
     * Id of the command being executed.
     */
    id: string;
    /**
     * Type of the command.
     */
    type?: CommandType;
    /**
     * Parameters of this execution.
     */
    params?: T;
}
/** This object represents an execution of a {@link CommandType.MUTATION} */
export interface IMutationInfo<T extends object = object> {
    id: string;
    type?: CommandType.MUTATION;
    params: T;
}
/** This object represents an execution of a {@link CommandType.OPERATION} */
export interface IOperationInfo<T extends object = object> {
    id: string;
    type?: CommandType.OPERATION;
    params: T;
}
export interface IExecutionOptions {
    /** This mutation should only be executed on the local machine, and should not be synced to replicas. */
    onlyLocal?: boolean;
    /** This command is from collaboration peers. */
    fromCollab?: boolean;
    /** This command is from snapshot load. */
    fromChangeset?: boolean;
    /**
     * This mutation should be synced to changeset but not executed locally.
     * The actual execution will be handled asynchronously via onlyLocal.
     */
    syncOnly?: boolean;
    [key: PropertyKey]: string | number | boolean | undefined;
}
export type CommandListener = (commandInfo: Readonly<ICommandInfo>, options?: IExecutionOptions) => void;
/**
 * The identifier of the command service.
 */
export declare const ICommandService: import("@wendellhu/redi").IdentifierDecorator<ICommandService>;
/**
 * The service to register and execute commands.
 */
export interface ICommandService {
    disposed(): boolean;
    /**
     * Check if a command is already registered at the current command service.
     * @param commandId The id of the command.
     * @returns If the command is registered, return `true`, otherwise return `false`.
     */
    hasCommand(commandId: string): boolean;
    /**
     * Register a command to the command service.
     * @param command The command to register.
     */
    registerCommand(command: ICommand<object, unknown>): IDisposable;
    /**
     * Unregister a command from the command service.
     * @param commandId The id of the command to unregister.
     */
    unregisterCommand(commandId: string): void;
    /**
     * Register a command as a multi command.
     * @param command The command to register as a multi command.
     */
    registerMultipleCommand(command: ICommand<object, unknown>): IDisposable;
    /**
     * Execute a command with the given id and parameters.
     * @param id Identifier of the command.
     * @param params Parameters of this execution.
     * @param options Options of this execution.
     * @returns The result of the execution. It is a boolean value by default which indicates the command is executed.
     */
    executeCommand<P extends object = object, R = boolean>(id: string, params?: P, options?: IExecutionOptions): Promise<R>;
    /**
     * Execute a command with the given id and parameters synchronously.
     * @param id Identifier of the command.
     * @param params Parameters of this execution.
     * @param options Options of this execution.
     * @returns The result of the execution. It is a boolean value by default which indicates the command is executed.
     */
    syncExecuteCommand<P extends object = object, R = boolean>(id: string, params?: P, options?: IExecutionOptions): R;
    /**
     * Register a callback function that will be executed after a command is executed.
     * Note: This will NOT be called for commands with syncOnly option.
     * @param listener
     */
    onCommandExecuted(listener: CommandListener): IDisposable;
    /**
     * Register a callback function that will be executed before a command is executed.
     * @param listener
     */
    beforeCommandExecuted(listener: CommandListener): IDisposable;
    /**
     * Register a callback function specifically for collaboration sync.
     * This will only be called for mutations (not commands/operations) that need to be synced,
     * including syncOnly mutations.
     * @param listener
     */
    onMutationExecutedForCollab(listener: CommandListener): IDisposable;
}
declare class CommandRegistry {
    private readonly _commands;
    private readonly _commandTypes;
    registerCommand(command: ICommand): IDisposable;
    unregisterCommand(commandId: string): void;
    hasCommand(id: string): boolean;
    getCommand(id: string): [ICommand] | null;
    getCommandType(id: string): CommandType | undefined;
}
export declare const NilCommand: ICommand;
export declare class CommandService extends Disposable implements ICommandService {
    private readonly _injector;
    private readonly _logService;
    private readonly _configService;
    protected readonly _commandRegistry: CommandRegistry;
    private readonly _beforeCommandExecutionListeners;
    private readonly _commandExecutedListeners;
    private readonly _collabMutationListeners;
    private _multiCommandDisposables;
    private _commandExecutingLevel;
    private _commandExecutionStack;
    constructor(_injector: Injector, _logService: ILogService, _configService: IConfigService);
    dispose(): void;
    disposed(): boolean;
    private _warnCommandSkippedAfterDisposed;
    hasCommand(commandId: string): boolean;
    registerCommand(command: ICommand): IDisposable;
    unregisterCommand(commandId: string): void;
    registerMultipleCommand(command: ICommand): IDisposable;
    beforeCommandExecuted(listener: CommandListener): IDisposable;
    onCommandExecuted(listener: (commandInfo: ICommandInfo) => void): IDisposable;
    onMutationExecutedForCollab(listener: CommandListener): IDisposable;
    executeCommand<P extends object = object, R = boolean>(id: string, params?: P, options?: IExecutionOptions): Promise<R>;
    syncExecuteCommand<P extends object = object, R = boolean>(id: string, params?: P | undefined, options?: IExecutionOptions): R;
    private _pushCommandExecutionStack;
    private _registerMultiCommand;
    private _execute;
    private _syncExecute;
}
export declare function sequenceExecute(tasks: ICommandInfo[], commandService: ICommandService, options?: IExecutionOptions): import("../..").ISequenceExecuteResult;
export declare function sequenceExecuteAsync(tasks: ICommandInfo[], commandService: ICommandService, options?: IExecutionOptions): Promise<import("../..").ISequenceExecuteResult>;
export {};
