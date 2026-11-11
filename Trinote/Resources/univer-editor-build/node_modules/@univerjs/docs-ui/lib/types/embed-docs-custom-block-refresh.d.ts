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
export declare function collectDocsTableLikeEmbedChildUnitIds(drawings: Record<string, unknown> | undefined, resolveChildUnitId?: (data: Record<string, unknown>) => string | undefined): Set<string>;
export declare function getCommandUnitId(commandParams: unknown): string | undefined;
export declare function shouldRefreshDocsCustomBlockSizeForCommand(params: {
    commandId?: string;
    childUnitIds: Set<string>;
    commandParams: unknown;
    hostUnitId: string;
}): boolean;
export interface IDocsCustomBlockSizeRefreshScheduler {
    dispose: () => void;
    schedule: () => void;
}
export declare function createDocsCustomBlockSizeRefreshScheduler(refresh: () => void): IDocsCustomBlockSizeRefreshScheduler;
