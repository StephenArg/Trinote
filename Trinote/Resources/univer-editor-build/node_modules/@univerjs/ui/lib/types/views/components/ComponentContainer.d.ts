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
import type { Injector } from '@univerjs/core';
import type { ComponentType, ReactNode } from 'react';
import type { ComponentRenderer } from '../../services/parts/parts.service';
export interface IComponentContainerProps {
    components?: Set<ComponentType>;
    fallback?: ReactNode;
    sharedProps?: Record<string, unknown>;
}
export declare function ComponentContainer(props: IComponentContainerProps): ReactNode;
/**
 * Get a set of render functions to render components of a part.
 *
 * @param part The part name.
 * @param injector The injector to get the service. It is optional. However, you should not change this prop in a given
 * component.
 */
export declare function useComponentsOfPart(part: string, injector?: Injector): Set<ComponentRenderer>;
