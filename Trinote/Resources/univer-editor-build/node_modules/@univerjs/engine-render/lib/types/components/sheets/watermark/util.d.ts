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
import type { IUser, Nullable } from '@univerjs/core';
import type { UniverRenderingContext } from '../../../context';
import type { IImageWatermarkConfig, ITextWatermarkConfig, IUserInfoWatermarkConfig, IWatermarkConfigWithType } from './type';
export declare function renderWatermark(ctx: UniverRenderingContext, config: IWatermarkConfigWithType, image: Nullable<HTMLImageElement>, userInfo: Nullable<IUser>): void;
export declare function renderUserInfoWatermark(ctx: UniverRenderingContext, config: IUserInfoWatermarkConfig, userInfo: Nullable<IUser>): void;
export declare function renderTextWatermark(ctx: UniverRenderingContext, config: ITextWatermarkConfig): void;
export declare function renderImageWatermark(ctx: UniverRenderingContext, config: IImageWatermarkConfig, image: Nullable<HTMLImageElement>): void;
