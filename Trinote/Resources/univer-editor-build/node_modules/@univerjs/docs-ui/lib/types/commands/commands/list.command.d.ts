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
import type { ICommand, IParagraph, IParagraphRange, ISectionBreak } from '@univerjs/core';
import type { ITextRangeWithStyle } from '@univerjs/engine-render';
import { PresetListType } from '@univerjs/core';
interface IListOperationCommandParams {
    listType: PresetListType;
    docRange?: ITextRangeWithStyle[];
}
export declare const ListOperationCommand: ICommand<IListOperationCommandParams>;
interface IChangeListTypeCommandParams {
    listType: PresetListType;
    docRange?: ITextRangeWithStyle[];
}
export declare const ChangeListTypeCommand: ICommand<IChangeListTypeCommandParams>;
export declare enum ChangeListNestingLevelType {
    increase = 1,
    decrease = -1
}
interface IChangeListNestingLevelCommandParams {
    type: ChangeListNestingLevelType;
}
export declare const ChangeListNestingLevelCommand: ICommand<IChangeListNestingLevelCommandParams>;
interface IBulletListCommandParams {
    value?: PresetListType;
    docRange?: ITextRangeWithStyle[];
}
export declare const BulletListCommand: ICommand<IBulletListCommandParams>;
export declare const CheckListCommand: ICommand<IBulletListCommandParams>;
export interface IToggleCheckListCommandParams {
    index: number;
    segmentId?: string;
    textRanges?: ITextRangeWithStyle[];
}
export declare const ToggleCheckListCommand: ICommand<IToggleCheckListCommandParams>;
interface IOrderListCommandParams {
    value?: PresetListType;
    docRange?: ITextRangeWithStyle[];
}
export declare const OrderListCommand: ICommand<IOrderListCommandParams>;
interface IQuickListCommandParams {
    listType: PresetListType;
    paragraph: IParagraphRange;
}
export declare const QuickListCommand: ICommand<IQuickListCommandParams>;
export declare const InsertBulletListBellowCommand: ICommand<IQuickListCommandParams>;
export declare const InsertOrderListBellowCommand: ICommand<IQuickListCommandParams>;
export declare const InsertCheckListBellowCommand: ICommand<IQuickListCommandParams>;
export declare function getParagraphsRelative(ranges: ITextRangeWithStyle[], paragraphs: IParagraph[], dataStream: string): IParagraph[];
export declare function findNearestSectionBreak(currentIndex: number, sectionBreaks: ISectionBreak[]): ISectionBreak | undefined;
export {};
