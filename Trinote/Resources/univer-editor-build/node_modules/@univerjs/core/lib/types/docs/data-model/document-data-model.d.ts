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
import type { Nullable } from '../../shared';
import type { IDocumentBody, IDocumentData, IDocumentRenderConfig, IDocumentStyle, IDrawings, IListData } from '../../types/interfaces/i-document-data';
import type { IPaddingData } from '../../types/interfaces/i-style-data';
import type { JSONXActions } from './json-x/json-x';
import { BehaviorSubject } from 'rxjs';
import { UnitModel, UniverInstanceType } from '../../common/unit';
import { SliceBodyType } from './text-x/utils';
export declare const DEFAULT_DOC: {
    id: string;
    documentStyle: {};
};
interface IDrawingUpdateConfig {
    left: number;
    top: number;
    height: number;
    width: number;
}
declare class DocumentDataModelSimple extends UnitModel<IDocumentData, UniverInstanceType.UNIVER_DOC> {
    type: UniverInstanceType.UNIVER_DOC;
    getUnitId(): string;
    protected readonly _name$: BehaviorSubject<string>;
    name$: import("rxjs").Observable<string>;
    protected snapshot: IDocumentData;
    constructor(snapshot: Partial<IDocumentData>);
    getRev(): number;
    incrementRev(): void;
    setRev(rev: number): void;
    setName(name: string): void;
    get drawings(): IDrawings | undefined;
    get documentStyle(): IDocumentStyle;
    get lists(): import("../..").ILists | undefined;
    get zoomRatio(): number;
    resetDrawing(drawings: IDrawings, drawingsOrder: string[]): void;
    getBody(): IDocumentBody | undefined;
    getSnapshot(): IDocumentData;
    getBulletPresetList(): Record<string, IListData>;
    updateDocumentId(unitId: string): void;
    updateDocumentRenderConfig(config: IDocumentRenderConfig): void;
    getDocumentStyle(): IDocumentStyle;
    updateDocumentStyle(config: IDocumentStyle): void;
    updateDocumentDataMargin(data: IPaddingData): void;
    updateDocumentDataPageSize(width?: number, height?: number): void;
    updateDrawing(id: string, config: IDrawingUpdateConfig): void;
    setZoomRatio(zoomRatio?: number): void;
    setDisabled(disabled: boolean): void;
    getDisabled(): boolean | undefined;
    getTitle(): string | undefined;
}
export declare class DocumentDataModel extends DocumentDataModelSimple {
    private _unitId;
    headerModelMap: Map<string, DocumentDataModel>;
    footerModelMap: Map<string, DocumentDataModel>;
    change$: BehaviorSubject<number>;
    constructor(snapshot: Partial<IDocumentData>);
    dispose(): void;
    getDrawings(): IDrawings | undefined;
    getDrawingsOrder(): string[] | undefined;
    getCustomRanges(): import("../..").ICustomRange<Record<string, any>>[] | undefined;
    getCustomDecorations(): import("../..").ICustomDecoration[] | undefined;
    getSettings(): import("../..").IDocumentSettings | undefined;
    reset(snapshot: Partial<IDocumentData>): void;
    getSelfOrHeaderFooterModel(segmentId?: string): DocumentDataModel;
    getUnitId(): string;
    apply(actions: JSONXActions): IDocumentData | undefined;
    sliceBody(startOffset: number, endOffset: number, type?: SliceBodyType): Nullable<IDocumentBody>;
    private _initializeHeaderFooterModel;
    updateDocumentId(unitId: string): void;
    getPlainText(): string;
}
export {};
