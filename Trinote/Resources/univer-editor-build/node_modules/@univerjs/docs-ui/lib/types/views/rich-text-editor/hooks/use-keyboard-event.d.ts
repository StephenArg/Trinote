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
import type { KeyCode, MetaKeys } from '@univerjs/ui';
import type { Editor } from '../../../services/editor/editor';
export interface IKeyboardEventConfig {
    keyCodes: {
        keyCode: KeyCode;
        metaKey?: MetaKeys;
    }[];
    handler: (keyCode: KeyCode, metaKey?: MetaKeys) => void;
}
export declare function useKeyboardEvent(isNeed: boolean, config?: IKeyboardEventConfig, editor?: Editor): void;
