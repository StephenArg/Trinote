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
import type { TextXAction } from './action-types';
import { TextXActionType } from './action-types';
export declare class ActionIterator {
    private _actions;
    private _index;
    private _offset;
    constructor(_actions: TextXAction[]);
    hasNext(): boolean;
    next(length?: number): TextXAction;
    peek(): TextXAction;
    peekLength(): number;
    peekType(): TextXActionType;
    rest(): TextXAction[];
}
