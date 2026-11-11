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
import type { IMenuCommandParams } from '../../../services/menu/menu';
export declare const FEATURE_SEARCH_COMPONENT = "FeatureSearch";
export declare const FEATURE_SEARCH_DIALOG_ID = "FEATURE_SEARCH_DIALOG";
export interface IFeatureSearchItem {
    key: string;
    title: string;
    parentTitle?: string;
    description: string;
    path: string;
    commandId: string;
    params?: IMenuCommandParams;
    getParams: () => IMenuCommandParams | undefined;
}
export declare function FeatureSearch(): import("react").JSX.Element;
