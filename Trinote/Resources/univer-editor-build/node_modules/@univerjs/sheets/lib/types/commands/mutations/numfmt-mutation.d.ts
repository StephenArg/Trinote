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
import type { IAccessor, ICommand, IMutationInfo, IRange } from '@univerjs/core';
export declare const factorySetNumfmtUndoMutation: (accessor: IAccessor, option: ISetNumfmtMutationParams) => IMutationInfo<ISetNumfmtMutationParams | IRemoveNumfmtMutationParams>[];
export interface ISetNumfmtMutationParams {
    values: {
        [id: string]: {
            ranges: IRange[];
        };
    };
    refMap: {
        [id: string]: {
            pattern: string;
        };
    };
    unitId: string;
    subUnitId: string;
}
export declare const SetNumfmtMutation: ICommand<ISetNumfmtMutationParams>;
export interface IRemoveNumfmtMutationParams {
    ranges: IRange[];
    unitId: string;
    subUnitId: string;
}
export declare const RemoveNumfmtMutation: ICommand<IRemoveNumfmtMutationParams>;
export declare const factoryRemoveNumfmtUndoMutation: (accessor: IAccessor, option: IRemoveNumfmtMutationParams) => {
    id: string;
    params: ISetNumfmtMutationParams;
}[];
export type ISetCellsNumfmt = Array<{
    pattern: string;
    row: number;
    col: number;
}>;
export declare const transformCellsToRange: (unitId: string, subUnitId: string, cells: ISetCellsNumfmt) => ISetNumfmtMutationParams;
