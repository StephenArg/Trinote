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
import type { DateKit } from '@univerjs/core';
import type { IPopupWithExtraProps } from '@univerjs/ui';
import type { IBaseDropdownProps } from './type';
export interface IDateDropdownProps {
    defaultValue?: DateKit;
    onChange?: (value: DateKit | undefined, changeType?: 'date' | 'time') => boolean | Promise<boolean>;
    durationValue?: number;
    onDurationChange?: (value: number | undefined) => boolean | Promise<boolean>;
    /** A calendar serial that cannot be represented by the configured Excel date system. */
    unsupportedValue?: number;
    onSerialChange?: (value: number | undefined) => boolean | Promise<boolean>;
    exceptionalDateLabel?: string;
    patternType?: 'datetime' | 'date' | 'time' | 'duration';
    showTime?: boolean;
    /** Keep the original serial when the picker is opened and confirmed without an actual selection change. */
    preserveDefaultValue?: boolean;
}
export declare function formatDuration(value: number | undefined): string;
export declare function parseDuration(value: string): number | null;
export declare function DateDropdown(props: {
    popup: IPopupWithExtraProps<IDateDropdownProps & IBaseDropdownProps>;
}): import("react").JSX.Element;
export declare namespace DateDropdown {
    var componentKey: string;
}
