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
export declare const EMBED_INTERACTION_BOUNDARY_OWNER_ATTRIBUTE = "data-embed-interaction-boundary-owner";
export declare const EMBED_CHILD_UNIT_ID_ATTRIBUTE = "data-embed-child-unit-id";
export declare function getEmbedBoundaryOwner(target: EventTarget | null): string | undefined;
export declare function isEmbedBoundaryTarget(target: EventTarget | null): boolean;
export declare function getEmbedChildUnitId(target: EventTarget | null): string | undefined;
export declare function keepInteractionInsideSameEmbedBoundary(event: {
    currentTarget: EventTarget | null;
    target: EventTarget | null;
    preventDefault: () => void;
}): void;
