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
import type { Nullable } from '@univerjs/core';
import { DataStreamTreeNodeType } from '@univerjs/core';
export declare class DataStreamTreeNode {
    nodeType: DataStreamTreeNodeType;
    content?: string | undefined;
    children: DataStreamTreeNode[];
    parent: Nullable<DataStreamTreeNode>;
    startIndex: number;
    endIndex: number;
    blocks: number[];
    constructor(nodeType: DataStreamTreeNodeType, content?: string | undefined);
    static create(nodeType: DataStreamTreeNodeType, content?: string): DataStreamTreeNode;
    dispose(): void;
    getProps(): {
        children: DataStreamTreeNode[];
        parent: Nullable<DataStreamTreeNode>;
        startIndex: number;
        endIndex: number;
        nodeType: DataStreamTreeNodeType;
        content: string | undefined;
    };
    addBlocks(blocks: number[]): void;
    setIndexRange(startIndex: number, endIndex: number): void;
    insertText(text: string, insertIndex: number): void;
    exclude(index: number): boolean;
    plus(len: number): void;
    selfPlus(len: number, index?: number): void;
    split(index: number): {
        firstNode: DataStreamTreeNode;
        lastNode: DataStreamTreeNode;
    } | undefined;
    getPositionInParent(): number;
    remove(): void;
    minus(startIndex: number, endIndex: number): void;
    merge(node: DataStreamTreeNode): void;
    private _addIndexForBlock;
    private _resetBlocks;
}
