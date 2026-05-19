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
import type { ITreeNodeProps } from './Tree';
export declare const findNodePathFromTree: (tree: ITreeNodeProps[], key: string) => string[];
export declare const createCacheWithFindNodePathFromTree: (tree: ITreeNodeProps[], defaultCache?: Map<string, string[]>) => {
    findNodePathFromTreeWithCache: (key: string) => string[];
    reset: (newTree?: ITreeNodeProps[]) => void;
};
export declare const findSubTreeFromPath: (tree: ITreeNodeProps[], path: string[]) => ITreeNodeProps[];
export declare const findNodeFromPath: (tree: ITreeNodeProps[], _path: string[]) => ITreeNodeProps | undefined;
export declare const mergeTreeSelected: (treeData: ITreeNodeProps[], treeSelected: string[], path: string[]) => string[];
export declare const isIntermediated: (treeSelected: Set<string>, node: ITreeNodeProps) => boolean;
export declare const filterLeafNode: (tree: ITreeNodeProps[], keyList: string[]) => ITreeNodeProps[];
