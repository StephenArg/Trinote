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
import type { AstRootNode } from '../engine/ast-node';
import type { FormulaDependencyTree, IFormulaDependencyTree } from '../engine/dependency/dependency-tree';
import { Disposable, ObjectMatrix, RTree } from '@univerjs/core';
export interface IDependencyManagerService {
    dispose(): void;
    reset(): void;
    addOtherFormulaDependency(unitId: string, sheetId: string, formulaId: string, dependencyTree: IFormulaDependencyTree): void;
    addOtherFormulaDependencyMainData(formulaId: string): void;
    removeOtherFormulaDependency(unitId: string, sheetId: string, formulaId: string[]): void;
    hasOtherFormulaDataMainData(formulaId: string): boolean;
    clearOtherFormulaDependency(unitId: string, sheetId?: string): void;
    getOtherFormulaDependency(unitId: string, sheetId: string, formulaId: string): Nullable<ObjectMatrix<number>>;
    addFeatureFormulaDependency(unitId: string, sheetId: string, featureId: string, dependencyTree: FormulaDependencyTree): void;
    removeFeatureFormulaDependency(unitId: string, sheetId: string, featureIds: string[]): void;
    getFeatureFormulaDependency(unitId: string, sheetId: string, featureId: string): Nullable<number>;
    clearFeatureFormulaDependency(unitId: string, sheetId?: string): void;
    addFormulaDependency(unitId: string, sheetId: string, row: number, column: number, dependencyTree: IFormulaDependencyTree): void;
    removeFormulaDependency(unitId: string, sheetId: string, row: number, column: number): void;
    getFormulaDependency(unitId: string, sheetId: string, row: number, column: number): Nullable<number>;
    clearFormulaDependency(unitId: string, sheetId?: string): void;
    removeFormulaDependencyByDefinedName(unitId: string, definedName: string): void;
    addFormulaDependencyByDefinedName(tree: IFormulaDependencyTree, node: Nullable<AstRootNode>): void;
    addDependencyRTreeCache(tree: IFormulaDependencyTree): void;
    searchDependency(search: IUnitRange[], exceptTreeIds?: Set<number>): Set<number>;
    getLastTreeId(): number;
    getTreeById(treeId: number): Nullable<IFormulaDependencyTree>;
    getAllTree(): IFormulaDependencyTree[];
    buildDependencyTree(shouldBeBuildTrees: IFormulaDependencyTree[], dependencyTrees?: IFormulaDependencyTree[]): IFormulaDependencyTree[];
    updateDependencyTreeDirtyState(treeId: number, isDirty: boolean): void;
    openKdTree(): void;
    closeKdTree(): void;
}
export declare class DependencyManagerBaseService extends Disposable implements IDependencyManagerService {
    buildDependencyTree(shouldBeBuildTrees: IFormulaDependencyTree[], dependencyTrees?: IFormulaDependencyTree[]): IFormulaDependencyTree[];
    getTreeById(treeId: number): Nullable<IFormulaDependencyTree>;
    getAllTree(): IFormulaDependencyTree[];
    protected _otherFormulaData: Map<string, Map<string, Map<string, ObjectMatrix<number>>>>;
    protected _featureFormulaData: Map<string, Map<string, Map<string, Nullable<number>>>>;
    protected _formulaData: Map<string, Map<string, ObjectMatrix<number>>>;
    protected _definedNameMap: Map<string, Map<string, Set<number>>>;
    protected _otherFormulaDataMainData: Set<string>;
    protected _dependencyRTreeCache: RTree;
    private _dependencyTreeIdLast;
    reset(): void;
    addOtherFormulaDependency(unitId: string, sheetId: string, formulaId: string, dependencyTree: IFormulaDependencyTree): void;
    removeOtherFormulaDependency(unitId: string, sheetId: string, formulaId: string[]): void;
    clearOtherFormulaDependency(unitId: string, sheetId?: string): void;
    addFeatureFormulaDependency(unitId: string, sheetId: string, featureId: string, dependencyTree: FormulaDependencyTree): void;
    removeFeatureFormulaDependency(unitId: string, sheetId: string, featureIds: string[]): void;
    clearFeatureFormulaDependency(unitId: string, sheetId?: string): void;
    addFormulaDependency(unitId: string, sheetId: string, row: number, column: number, dependencyTree: IFormulaDependencyTree): void;
    removeFormulaDependency(unitId: string, sheetId: string, row: number, column: number): void;
    clearFormulaDependency(unitId: string, sheetId?: string): void;
    removeFormulaDependencyByDefinedName(unitId: string, definedName: string): void;
    searchDependency(search: IUnitRange[], exceptTreeIds?: Set<number>): Set<number>;
    protected _restDependencyTreeId(): void;
    getOtherFormulaDependency(unitId: string, sheetId: string, formulaId: string): ObjectMatrix<number> | undefined;
    addOtherFormulaDependencyMainData(formulaId: string): void;
    hasOtherFormulaDataMainData(formulaId: string): boolean;
    protected _removeDependencyRTreeCacheById(unitId: string, sheetId: string): void;
    getFeatureFormulaDependency(unitId: string, sheetId: string, featureId: string): Nullable<number>;
    getFormulaDependency(unitId: string, sheetId: string, row: number, column: number): Nullable<number>;
    addDependencyRTreeCache(tree: IFormulaDependencyTree): void;
    getLastTreeId(): number;
    protected _addAllTreeMap(tree: IFormulaDependencyTree): void;
    protected _addDefinedName(unitId: string, definedName: string, treeId: number): void;
    addFormulaDependencyByDefinedName(tree: IFormulaDependencyTree, node: Nullable<AstRootNode>): void;
    updateDependencyTreeDirtyState(treeId: number, isDirty: boolean): void;
    openKdTree(): void;
    closeKdTree(): void;
}
/**
 * Passively marked as dirty, register the reference and execution actions of the feature plugin.
 * After execution, a dirty area and calculated data will be returned,
 * causing the formula to be marked dirty again,
 * thereby completing the calculation of the entire dependency tree.
 */
export declare class DependencyManagerService extends DependencyManagerBaseService implements IDependencyManagerService {
    protected _allTreeMap: Map<number, Map<string, Map<string, IRange>>>;
    protected _dependencyRTreeCache: RTree;
    reset(): void;
    addOtherFormulaDependency(unitId: string, sheetId: string, formulaId: string, dependencyTree: IFormulaDependencyTree): void;
    removeOtherFormulaDependency(unitId: string, sheetId: string, formulaIds: string[]): void;
    clearOtherFormulaDependency(unitId: string, sheetId?: string): void;
    addFeatureFormulaDependency(unitId: string, sheetId: string, featureId: string, dependencyTree: FormulaDependencyTree): void;
    removeFeatureFormulaDependency(unitId: string, sheetId: string, featureIds: string[]): void;
    clearFeatureFormulaDependency(unitId: string, sheetId?: string): void;
    addFormulaDependency(unitId: string, sheetId: string, row: number, column: number, dependencyTree: IFormulaDependencyTree): void;
    removeFormulaDependency(unitId: string, sheetId: string, row: number, column: number): void;
    clearFormulaDependency(unitId: string, sheetId?: string): void;
    private _removeDependencyRTreeCache;
    removeFormulaDependencyByDefinedName(unitId: string, definedName: string): void;
    openKdTree(): void;
    closeKdTree(): void;
    protected _removeAllTreeMap(treeId: Nullable<number>): void;
    protected _addAllTreeMap(tree: IFormulaDependencyTree): void;
    dispose(): void;
    buildDependencyTree(shouldBeBuildTrees: IFormulaDependencyTree[], dependencyTrees?: IFormulaDependencyTree[]): IFormulaDependencyTree[];
    /**
     * Build the dependency relationship between the trees.
     * @param allTrees  all FormulaDependencyTree
     * @param shouldBeBuildTrees  FormulaDependencyTree[] | FormulaDependencyTreeCache
     */
    private _buildDependencyTree;
    /**
     * Build the reverse dependency relationship between the trees.
     * @param allTrees
     * @param dependencyTrees
     */
    private _buildReverseDependency;
}
export declare const IDependencyManagerService: import("@wendellhu/redi").IdentifierDecorator<IDependencyManagerService>;
