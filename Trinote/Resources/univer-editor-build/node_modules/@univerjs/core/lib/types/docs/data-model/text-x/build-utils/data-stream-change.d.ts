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
import type { IDocumentBody } from '../../../../types/interfaces';
export interface IDataStreamChange {
    start: number;
    deleteLength: number;
    insertLength: number;
}
/**
 * Finds one contiguous dataStream change. Pure structural insertions and deletions
 * are anchored by their stable ids before falling back to string comparison.
 * This prevents an adjacent identical sentinel from being mistaken for an
 * unchanged prefix and keeps the structure metadata aligned with the TextX body.
 */
export declare function getSingleDataStreamChange(previousBody: IDocumentBody | undefined, nextBody: IDocumentBody | undefined): IDataStreamChange | null;
