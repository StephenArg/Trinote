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
import type { Dependency, DependencyIdentifier, DependencyItem } from '../../common/di';
export type NullableDependencyPair<T> = [DependencyIdentifier<T>, DependencyItem<T> | null];
/**
 * Overrides the dependencies defined in the plugin. Only dependencies that are identified by `IdentifierDecorator` can be overridden.
 * If you override a dependency with `null`, the original dependency will be removed.
 */
export type DependencyOverride = NullableDependencyPair<any>[];
export declare function mergeOverrideWithDependencies(dependencies: Dependency[], override?: DependencyOverride): Dependency[];
