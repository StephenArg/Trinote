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
import type { IRange, IUnitRange, Nullable } from '@univerjs/core';
import type { IDirtyUnitSheetNameMap, IFeatureDirtyRangeType, IRuntimeUnitDataType, IUnitExcludedCell } from '../../basics/common';
import type { IFormulaDirtyData } from '../../services/current-data.service';
import type { IAllRuntimeData } from '../../services/runtime.service';
import type { AstRootNode, FunctionNode } from '../ast-node';
export declare enum FDtreeStateType {
    DEFAULT = 0,
    ADDED = 1,
    SKIP = 2
}
export declare enum FormulaDependencyTreeType {
    NORMAL_FORMULA = 0,
    OTHER_FORMULA = 1,
    FEATURE_FORMULA = 2
}
declare class FormulaDependencyTreeCalculator {
    private _state;
    type: FormulaDependencyTreeType;
    resetState(): void;
    setAdded(): void;
    isAdded(): boolean;
    setSkip(): void;
    isSkip(): boolean;
    treeId: number;
    children: Set<number>;
    parents: Set<number>;
    pushChildren(tree: FormulaDependencyTreeCalculator): void;
    hasChildren(treeId: number): boolean;
    private _pushParent;
}
type GetDirtyDataType = Nullable<(dirtyData: IFormulaDirtyData, runtimeData: IAllRuntimeData) => {
    runtimeCellData: IRuntimeUnitDataType;
    dirtyRanges: IFeatureDirtyRangeType;
}>;
export type IFormulaDependencyTree = FormulaDependencyTree | FormulaDependencyTreeVirtual;
export declare class FormulaDependencyTreeVirtual extends FormulaDependencyTreeCalculator {
    refTree: Nullable<FormulaDependencyTree>;
    refOffsetX: number;
    refOffsetY: number;
    isCache: boolean;
    isDirty: boolean;
    addressFunctionNodes: FunctionNode[];
    get isVirtual(): boolean;
    get row(): number;
    get column(): number;
    get rowCount(): number;
    get columnCount(): number;
    get unitId(): string;
    get subUnitId(): string;
    get formula(): string;
    get nodeData(): {
        node: Nullable<AstRootNode>;
        refOffsetX: number;
        refOffsetY: number;
    };
    get node(): Nullable<AstRootNode>;
    dispose(): void;
    get rangeList(): {
        unitId: string;
        sheetId: string;
        range: IRange;
    }[];
    toRTreeItem(): IUnitRange[];
    inRangeData(range: IRange): boolean;
    dependencySheetName(dirtyUnitSheetNameMap?: IDirtyUnitSheetNameMap): boolean;
    isExcludeRange(unitExcludedCell: Nullable<IUnitExcludedCell>): boolean;
    getDirtyData: GetDirtyDataType;
    featureId: Nullable<string>;
    get formulaId(): Nullable<string>;
}
/**
 * A dependency tree, capable of calculating mutual dependencies,
 * is used to determine the order of formula calculations.
 */
export declare class FormulaDependencyTree extends FormulaDependencyTreeCalculator {
    isCache: boolean;
    featureId: Nullable<string>;
    featureDirtyRanges: IUnitRange[];
    refOffsetX: number;
    refOffsetY: number;
    formulaId: Nullable<string>;
    subUnitId: string;
    unitId: string;
    rangeList: IUnitRange[];
    formula: string;
    row: number;
    column: number;
    rowCount: number;
    columnCount: number;
    isDirty: boolean;
    node: Nullable<AstRootNode>;
    addressFunctionNodes: FunctionNode[];
    constructor(treeId: number);
    get isVirtual(): boolean;
    get nodeData(): {
        node: Nullable<AstRootNode>;
        refOffsetX: number;
        refOffsetY: number;
    };
    toJson(): {
        formula: string;
        refOffsetX: number;
        refOffsetY: number;
    };
    getDirtyData: GetDirtyDataType;
    dispose(): void;
    inRangeData(range: IRange): boolean;
    dependencySheetName(dirtyUnitSheetNameMap?: IDirtyUnitSheetNameMap): boolean;
    isExcludeRange(unitExcludedCell: Nullable<IUnitExcludedCell>): boolean;
    /**
     * Add the range corresponding to the current ast node.
     * @param range
     */
    pushRangeList(ranges: IUnitRange[]): void;
    shouldBePushRangeList(): boolean;
    toRTreeItem(): IUnitRange[];
}
interface IFormulaDependencyTreeJsonBase {
    treeId: number;
    formula: string;
    row: number;
    column: number;
    unitId: string;
    subUnitId: string;
    refOffsetX: number;
    refOffsetY: number;
    rangeList: IUnitRange[];
    refTreeId: number | undefined;
    formulaId: Nullable<string>;
    featureId: Nullable<string>;
    type: Nullable<FormulaDependencyTreeType>;
}
export interface IFormulaDependencyTreeJson extends IFormulaDependencyTreeJsonBase {
    children: number[];
    parents: number[];
}
export interface IFormulaDependencyTreeFullJson extends IFormulaDependencyTreeJsonBase {
    children: IFormulaDependencyTreeJson[];
    parents: IFormulaDependencyTreeJson[];
}
export interface IFormulaDependentsAndInRangeResults {
    dependents: IFormulaDependencyTreeJson[];
    inRanges: IFormulaDependencyTreeJson[];
}
export declare class FormulaDependencyTreeModel {
    children: Set<FormulaDependencyTreeModel>;
    parents: Set<FormulaDependencyTreeModel>;
    treeId: number;
    formula: string;
    refOffsetX: number;
    refOffsetY: number;
    row: number;
    column: number;
    unitId: string;
    subUnitId: string;
    rangeList: IUnitRange[];
    refTreeId: number | undefined;
    formulaId: Nullable<string>;
    featureId: Nullable<string>;
    type: Nullable<FormulaDependencyTreeType>;
    constructor(tree: IFormulaDependencyTree);
    toJson(): IFormulaDependencyTreeJson;
    toFullJson(): IFormulaDependencyTreeFullJson;
    addParent(parent: FormulaDependencyTreeModel): void;
    addChild(child: FormulaDependencyTreeModel): void;
}
export {};
