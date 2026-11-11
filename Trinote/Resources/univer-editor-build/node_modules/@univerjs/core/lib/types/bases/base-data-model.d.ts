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
import type { Observable } from 'rxjs';
import type { IBaseSnapshot } from './typedef';
import { UnitModel, UniverInstanceType } from '../common/unit';
export declare class BaseDataModel extends UnitModel<IBaseSnapshot, UniverInstanceType.UNIVER_BASE> {
    readonly type: UniverInstanceType.UNIVER_BASE;
    private readonly _name$;
    readonly name$: Observable<string>;
    private _snapshot;
    constructor(snapshot?: Partial<IBaseSnapshot>);
    getUnitId(): string;
    setName(name: string): void;
    getSnapshot(): IBaseSnapshot;
    /** Check if a table name already exists, ignoring case. */
    checkTableName(name: string): boolean;
    /** Generate a table name that does not conflict with existing tables. */
    uniqueTableName(name: string): string;
    setSnapshot(snapshot: IBaseSnapshot): void;
    getRev(): number;
    incrementRev(): void;
    setRev(rev: number): void;
    dispose(): void;
}
