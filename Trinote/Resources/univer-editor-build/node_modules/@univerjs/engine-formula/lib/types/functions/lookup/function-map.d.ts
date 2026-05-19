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
import { Choose } from './choose';
import { FUNCTION_NAMES_LOOKUP } from './function-names';
import { Hstack } from './hstack';
import { Indirect } from './indirect';
import { Lookup } from './lookup';
import { Match } from './match';
export declare const functionLookup: ((FUNCTION_NAMES_LOOKUP | typeof Choose)[] | (FUNCTION_NAMES_LOOKUP | typeof Hstack)[] | (FUNCTION_NAMES_LOOKUP | typeof Indirect)[] | (FUNCTION_NAMES_LOOKUP | typeof Lookup)[] | (FUNCTION_NAMES_LOOKUP | typeof Match)[])[];
