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
import type { LocaleService } from '@univerjs/core';
import type { IInputProps } from '@univerjs/design';
import type { IFindReplaceService } from '../../services/find-replace.service';
export interface ISearchInputProps extends Pick<IInputProps, 'onFocus' | 'onBlur' | 'className' | 'onChange'> {
    findCompleted: boolean;
    localeService: LocaleService;
    findReplaceService: IFindReplaceService;
    matchesPosition: number;
    matchesCount: number;
    initialFindString: string;
}
export declare function SearchInput(props: ISearchInputProps): import("react/jsx-runtime").JSX.Element;
