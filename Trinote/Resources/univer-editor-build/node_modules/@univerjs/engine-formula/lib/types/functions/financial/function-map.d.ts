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
import { Accrint } from './accrint';
import { FUNCTION_NAMES_FINANCIAL } from './function-names';
import { Npv } from './npv';
import { Oddfprice } from './oddfprice';
import { Oddfyield } from './oddfyield';
import { Oddlprice } from './oddlprice';
import { Oddlyield } from './oddlyield';
import { Price } from './price';
export declare const functionFinancial: ((FUNCTION_NAMES_FINANCIAL | typeof Accrint)[] | (FUNCTION_NAMES_FINANCIAL | typeof Npv)[] | (FUNCTION_NAMES_FINANCIAL | typeof Oddfprice)[] | (FUNCTION_NAMES_FINANCIAL | typeof Oddfyield)[] | (FUNCTION_NAMES_FINANCIAL | typeof Oddlprice)[] | (FUNCTION_NAMES_FINANCIAL | typeof Oddlyield)[] | (FUNCTION_NAMES_FINANCIAL | typeof Price)[])[];
