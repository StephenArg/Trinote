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
import type { BaselineOffset, HorizontalAlign, TextDecoration, TextDirection, VerticalAlign } from '../../types/enum';
import type { IBorderData, IColorStyle, IDocumentBody, IDocumentData, INumberUnit, IParagraphBorder, IParagraphStyle, IShading, ITabStop, ITextDecoration, ITextStyle, NamedStyleType, SpacingRule } from '../../types/interfaces';
import { BooleanNumber } from '../../types/enum';
import { PresetListType } from './preset-list-type';
/** A half-open range in a rich-text document data stream. */
export interface IRichTextRange {
    /** Inclusive offset of the first character. */
    startOffset: number;
    /** Exclusive offset immediately after the last character. */
    endOffset: number;
}
type IMutableRichTextRange = IRichTextRange;
export declare function normalizeBody(body: IDocumentBody): IDocumentBody;
export declare function normalizeData(data: IDocumentData): IDocumentData;
/**
 * Agent-friendly text style aliases accepted by `RichTextBuilder.span()`.
 *
 * The readable aliases can be combined in one object and apply only to the appended span. Native `ITextStyle` fields
 * remain available for advanced document integrations. Drawing effects such as `glow` and `outerShadow` are
 * especially useful when the resulting rich text is attached to a Shape; standalone document products may not expose
 * dedicated controls for them.
 *
 * @example
 * ```ts
 * const text = univerAPI.newRichText()
 *   .text('Status: ')
 *   .span('Blocked', {
 *     bold: true,
 *     italic: true,
 *     color: '#dc2626',
 *     background: '#fee2e2',
 *     glow: { color: '#f97316', radius: 6 },
 *     outerShadow: {
 *       color: '#000000',
 *       opacity: 0.35,
 *       blurRadius: 4,
 *       distance: 3,
 *       direction: 45,
 *     },
 *   });
 * ```
 */
export interface IRichTextSpanStyle extends ITextStyle {
    /**
     * Agent-friendly alias for `bl`.
     */
    bold?: boolean;
    /**
     * Agent-friendly alias for `it`.
     */
    italic?: boolean;
    /**
     * Agent-friendly alias for `ff`.
     */
    fontFamily?: string;
    /**
     * Agent-friendly alias for `fs`.
     */
    fontSize?: number;
    /**
     * Agent-friendly alias for `cl`. A string is treated as an RGB color.
     */
    color?: string | IColorStyle | null;
    /**
     * Agent-friendly alias for `bg`. A string is treated as an RGB color.
     */
    background?: string | IColorStyle | null;
}
/**
 * Agent-friendly paragraph options accepted by `RichTextBuilder.paragraph()`.
 *
 * Numeric lengths use document points. Pass an `INumberUnit` when another supported unit is required. `lineHeight`
 * behaves as a multiplier with `SpacingRule.AUTO`, and as an absolute document size with `AT_LEAST` or `EXACT`.
 *
 * @example
 * ```ts
 * const text = univerAPI.newRichText()
 *   .paragraph({
 *     align: univerAPI.Enum.HorizontalAlign.LEFT,
 *     lineHeight: 1.4,
 *     lineHeightRule: univerAPI.Enum.SpacingRule.AUTO,
 *     firstLineIndent: 12,
 *     spaceAfter: 6,
 *   })
 *   .text('Agent-friendly paragraph');
 * ```
 */
export interface IRichTextParagraphStyle {
    /** Horizontal paragraph alignment. Use `univerAPI.Enum.HorizontalAlign`. */
    align?: HorizontalAlign;
    /** Line-height multiplier or absolute size, depending on `lineHeightRule`. */
    lineHeight?: number;
    /** Line-height interpretation. Defaults to `SpacingRule.AUTO`. */
    lineHeightRule?: SpacingRule;
    /** First-line indent. A number is interpreted as document points. */
    firstLineIndent?: number | INumberUnit;
    /** Hanging indent. A number is interpreted as document points. */
    hangingIndent?: number | INumberUnit;
    /** Leading-side indent. A number is interpreted as document points. */
    indentStart?: number | INumberUnit;
    /** Trailing-side indent. A number is interpreted as document points. */
    indentEnd?: number | INumberUnit;
    /** Space before the paragraph. A number is interpreted as document points. */
    spaceBefore?: number | INumberUnit;
    /** Space after the paragraph. A number is interpreted as document points. */
    spaceAfter?: number | INumberUnit;
    /** Text direction. Use `univerAPI.Enum.TextDirection`. */
    direction?: TextDirection;
    /** Whether lines may wrap at character boundaries. */
    wordWrap?: boolean;
    /** Keeps all paragraph lines together when pagination applies. */
    keepLines?: boolean;
    /** Keeps this paragraph with the following paragraph when pagination applies. */
    keepNext?: boolean;
}
/**
 * Portable text-container alignment accepted by `RichTextBuilder.align()`.
 *
 * Unlike `paragraph({ align })`, which styles one paragraph, this alignment is a document-level presentation hint that
 * can be consumed consistently by shapes, table cells, and other rich-text hosts.
 */
export interface IRichTextAlignment {
    /** Horizontal alignment for the rich-text block. */
    horizontal?: HorizontalAlign;
    /** Vertical alignment inside the host text container. */
    vertical?: VerticalAlign;
}
export interface IRichTextColumnsOptions {
    /** Number of text-flow columns. Use 1 to clear multi-column layout. */
    count: number;
    /** Spacing between columns in px. Defaults to 0. */
    spacing?: number;
}
/**
 * Agent-friendly options for one paragraph list item.
 *
 * @example
 * ```ts
 * const text = univerAPI.newRichText()
 *   .listItem('Plan', {
 *     type: univerAPI.Enum.PresetListType.ORDER_LIST,
 *     listId: 'agent.release-steps',
 *   })
 *   .listItem('Build', {
 *     type: univerAPI.Enum.PresetListType.ORDER_LIST,
 *     listId: 'agent.release-steps',
 *     level: 1,
 *   });
 * ```
 */
export interface IRichTextListItemOptions {
    /** Preset ordered, unordered, or checklist style. Defaults to `PresetListType.BULLET_LIST`. */
    type?: PresetListType;
    /** Stable list identity. Consecutive compatible items reuse the previous id when omitted. */
    listId?: string;
    /** Zero-based nesting level. Defaults to `0`. */
    level?: number;
    /** Optional paragraph layout for this item. */
    paragraphStyle?: ParagraphStyleBuilder | IRichTextParagraphStyle;
}
/**
 * Represents a read-only font style value object.
 * This class provides access to font style properties without modification capabilities.
 */
export declare class TextStyleValue {
    protected _style: ITextStyle;
    /**
     * Creates an instance of TextStyleValue.
     * @param {ITextStyle} style style object
     * @returns {TextStyleValue} font style instance
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style);
     * ```
     */
    static create(style?: ITextStyle): TextStyleValue;
    /**
     * Creates a new TextStyleValue instance
     * @param {ITextStyle} style The initial style object
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style);
     * ```
     */
    constructor(style?: ITextStyle);
    /**
     * Gets the font family
     * @returns {Nullable<string>} The font family name or undefined
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.fontFamily);
     * ```
     */
    get fontFamily(): Nullable<string>;
    /**
     * Gets the font size in points
     * @returns {number | undefined} The font size or undefined
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.fontSize);
     * ```
     */
    get fontSize(): number | undefined;
    /**
     * Gets whether the text is italic
     * @returns {boolean} True if italic, false otherwise
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.italic);
     * ```
     */
    get italic(): boolean;
    /**
     * Gets whether the text is bold
     * @returns {boolean} True if bold, false otherwise
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.bold);
     * ```
     */
    get bold(): boolean;
    /**
     * Gets the underline decoration
     * @returns {TextDecorationBuilder | undefined} The underline decoration or undefined
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.underline);
     * ```
     */
    get underline(): TextDecorationBuilder | undefined;
    /**
     * Gets the bottom border line decoration
     * @returns {TextDecorationBuilder | undefined} The bottom border line decoration or undefined
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.bottomBorderLine);
     * ```
     */
    get bottomBorderLine(): TextDecorationBuilder | undefined;
    /**
     * Gets the strikethrough decoration
     * @returns {TextDecorationBuilder | undefined} The strikethrough decoration or undefined
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.strikethrough);
     * ```
     */
    get strikethrough(): TextDecorationBuilder | undefined;
    /**
     * Gets the overline decoration
     * @returns {TextDecorationBuilder | undefined} The overline decoration or undefined
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.overline);
     * ```
     */
    get overline(): TextDecorationBuilder | undefined;
    /**
     * Gets the background color
     * @returns {Nullable<IColorStyle>} The background color or null/undefined
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.background);
     * ```
     */
    get background(): Nullable<IColorStyle>;
    /**
     * Gets the border settings
     * @returns {Nullable<IBorderData>} The border settings or null/undefined
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.border);
     * ```
     */
    get border(): Nullable<IBorderData>;
    /**
     * Gets the text color
     * @returns {Nullable<IColorStyle>} The text color or null/undefined
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.color);
     * ```
     */
    get color(): Nullable<IColorStyle>;
    /**
     * Gets the vertical alignment (subscript/superscript)
     * @returns {Nullable<BaselineOffset>} The vertical alignment or null/undefined
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.verticalAlign);
     * ```
     */
    get verticalAlign(): Nullable<BaselineOffset>;
    /**
     * Gets the number format pattern
     * @returns {Nullable<{ pattern: string }>} The number format pattern or null/undefined
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.numberFormat);
     * ```
     */
    get numberFormat(): Nullable<{
        pattern: string;
    }>;
    /**
     * Creates a copy of this font style as a builder
     * @returns {TextStyleBuilder} A new TextStyleBuilder instance with the same style
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * const copy = style.copy();
     * console.log(copy);
     * ```
     */
    copy(): TextStyleBuilder;
    /**
     * Gets the raw style object
     * @returns {ITextStyle} The underlying style object
     * @example
     * ```ts
     * const style = TextStyleValue.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style.getValue());
     * ```
     */
    getValue(): ITextStyle;
}
/**
 * Builder class for creating and modifying font styles.
 * Extends TextStyleValue to provide setter methods for all style properties.
 */
export declare class TextStyleBuilder extends TextStyleValue {
    /**
     * Creates a new TextStyleBuilder instance
     * @param {ITextStyle} style Initial style object
     * @returns {TextStyleBuilder} A new TextStyleBuilder instance
     * @example
     * ```ts
     * const style = TextStyleBuilder.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style);
     * ```
     */
    static create(style?: ITextStyle): TextStyleBuilder;
    /**
     * Creates a new TextStyleBuilder instance
     * @param {ITextStyle} style The initial style object
     * @example
     * ```ts
     * const style = new TextStyleBuilder({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * console.log(style);
     * ```
     */
    constructor(style?: ITextStyle);
    /**
     * Sets the font family
     * @param {string} family The font family name
     * @returns {TextStyleBuilder} The builder instance for chaining
     * @example
     * ```ts
     * const style = TextStyleBuilder.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * style.setFontFamily('Times New Roman');
     * console.log(style.fontFamily);
     * ```
     */
    setFontFamily(family: string): TextStyleBuilder;
    /**
     * Sets the font size in points
     * @param {number} size The font size
     * @returns {TextStyleBuilder} The builder instance for chaining
     * @example
     * ```ts
     * const style = TextStyleBuilder.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * style.setFontSize(14);
     * console.log(style.fontSize);
     * ```
     */
    setFontSize(size: number): TextStyleBuilder;
    /**
     * Sets the italic style
     * @param {boolean} value True to make italic, false otherwise
     * @returns {TextStyleBuilder} The builder instance for chaining
     * @example
     * ```ts
     * const style = TextStyleBuilder.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * style.setItalic(true);
     * console.log(style.italic);
     * ```
     */
    setItalic(value: boolean): TextStyleBuilder;
    /**
     * Sets the bold style
     * @param {boolean} value True to make bold, false otherwise
     * @returns {TextStyleBuilder} The builder instance for chaining
     * @example
     * ```ts
     * const style = TextStyleBuilder.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * style.setBold(true);
     * console.log(style.bold);
     * ```
     */
    setBold(value: boolean): TextStyleBuilder;
    /**
     * Sets the underline decoration
     * @param {TextDecorationBuilder} decoration The underline decoration settings
     * @returns {TextStyleBuilder} The builder instance for chaining
     * @example
     * ```ts
     * const style = TextStyleBuilder.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * style.setUnderline({ type: 'single', color: '#FF0000' });
     * console.log(style.underline);
     * ```
     */
    setUnderline(decoration: TextDecorationBuilder): TextStyleBuilder;
    /**
     * Sets the bottom border line decoration
     * @param {TextDecorationBuilder} decoration The bottom border line decoration settings
     * @returns {TextStyleBuilder} The builder instance for chaining
     * @example
     * ```ts
     * const style = TextStyleBuilder.create({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * style.setBottomBorderLine({ type: 'single', color: '#FF0000' });
     * console.log(style.bottomBorderLine);
     * ```
     */
    setBottomBorderLine(decoration: TextDecorationBuilder): TextStyleBuilder;
    /**
     * Sets the strikethrough decoration
     * @param {TextDecorationBuilder} decoration The strikethrough decoration settings
     * @returns {TextStyleBuilder} The builder instance for chaining
     */
    setStrikethrough(decoration: TextDecorationBuilder): TextStyleBuilder;
    /**
     * Sets the overline decoration
     * @param {TextDecorationBuilder} decoration The overline decoration settings
     * @returns {TextStyleBuilder} The builder instance for chaining
     */
    setOverline(decoration: TextDecorationBuilder): TextStyleBuilder;
    /**
     * Sets the background color
     * @param {IColorStyle | null} color The background color or null to remove
     * @returns {TextStyleBuilder} The builder instance for chaining
     */
    setBackground(color: IColorStyle | null): TextStyleBuilder;
    /**
     * Sets the border settings
     * @param {IBorderData | null} border The border settings or null to remove
     * @returns {TextStyleBuilder} The builder instance for chaining
     */
    setBorder(border: IBorderData | null): TextStyleBuilder;
    /**
     * Sets the text color
     * @param {IColorStyle | null} color The text color or null to remove
     * @returns {TextStyleBuilder} The builder instance for chaining
     */
    setColor(color: IColorStyle | null): TextStyleBuilder;
    /**
     * Sets the vertical alignment (subscript/superscript)
     * @param {BaselineOffset | null} offset The vertical alignment or null to remove
     * @returns {TextStyleBuilder} The builder instance for chaining
     */
    setVerticalAlign(offset: BaselineOffset | null): TextStyleBuilder;
    /**
     * Creates a copy of this font style builder
     * @returns {TextStyleBuilder} A new TextStyleBuilder instance with the same style
     */
    copy(): TextStyleBuilder;
    /**
     * Builds and returns the final style object
     * @returns {ITextStyle} The complete style object
     */
    build(): ITextStyle;
}
/**
 * Builder class for creating and modifying text decorations.
 * Provides a fluent interface for setting text decoration properties.
 */
export declare class TextDecorationBuilder {
    protected _decoration: ITextDecoration;
    /**
     * Creates an instance of TextDecorationBuilder.
     * @param {ITextDecoration} decoration Initial decoration object
     * @returns {TextDecorationBuilder} text decoration builder instance
     * @example
     * ```ts
     * const decoration = TextDecorationBuilder.create({ s: 1, t: TextDecoration.SINGLE });
     * console.log(decoration);
     * ```
     */
    static create(decoration?: ITextDecoration): TextDecorationBuilder;
    /**
     * Creates a new TextDecorationBuilder instance
     * @param {ITextDecoration} decoration The initial decoration object
     * @example
     * ```ts
     * const decoration = new TextDecorationBuilder({ s: 1, t: TextDecoration.SINGLE });
     * ```
     */
    constructor(decoration?: ITextDecoration);
    /**
     * Gets whether the decoration is shown
     * @returns {boolean} True if the decoration is shown
     */
    get show(): boolean;
    /**
     * Gets whether the decoration color follows the font color
     * @returns {boolean} True if the decoration color follows the font color
     */
    get followFontColor(): boolean;
    /**
     * Gets the decoration color
     * @returns {Nullable<IColorStyle>} The decoration color
     */
    get color(): Nullable<IColorStyle>;
    /**
     * Gets the decoration line type
     * @returns {Nullable<TextDecoration>} The decoration line type
     */
    get type(): Nullable<TextDecoration>;
    /**
     * Sets whether the decoration is shown
     * @param {boolean} value True to show the decoration
     * @returns {TextDecorationBuilder} The builder instance for chaining
     * @example
     * ```ts
     * decoration.setShow(true);
     * ```
     */
    setShow(value: boolean): TextDecorationBuilder;
    /**
     * Sets whether the decoration color follows the font color
     * @param {boolean} value True to follow font color
     * @returns {TextDecorationBuilder} The builder instance for chaining
     * @example
     * ```ts
     * decoration.setFollowFontColor(false);
     * ```
     */
    setFollowFontColor(value: boolean): TextDecorationBuilder;
    /**
     * Sets the decoration color
     * @param {IColorStyle} color The color style
     * @returns {TextDecorationBuilder} The builder instance for chaining
     * @example
     * ```ts
     * decoration.setColor({ rgb: '#FF0000' });
     * ```
     */
    setColor(color: IColorStyle): TextDecorationBuilder;
    /**
     * Sets the decoration line type
     * @param {TextDecoration} type The line type
     * @returns {TextDecorationBuilder} The builder instance for chaining
     * @example
     * ```ts
     * decoration.setLineType(TextDecoration.SINGLE);
     * ```
     */
    setLineType(type: TextDecoration): TextDecorationBuilder;
    /**
     * Creates a copy of this text decoration builder
     * @returns {TextDecorationBuilder} A new TextDecorationBuilder instance with the same decoration
     * @example
     * ```ts
     * const copy = decoration.copy();
     * ```
     */
    copy(): TextDecorationBuilder;
    /**
     * Builds and returns the final decoration object
     * @returns {ITextDecoration} The complete text decoration object
     * @example
     * ```ts
     * const style = decoration.build();
     * ```
     */
    build(): ITextDecoration;
}
export declare class ParagraphStyleValue {
    protected _style: IParagraphStyle;
    /**
     * Creates a new ParagraphStyleValue instance
     * @param {IParagraphStyle} style The initial style object
     * @returns A new ParagraphStyleValue instance
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * ```
     */
    static create(style?: IParagraphStyle): ParagraphStyleValue;
    constructor(style?: IParagraphStyle);
    /**
     * Gets the first line indent
     * @returns {Nullable<INumberUnit>} The first line indent
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.indentFirstLine);
     * ```
     */
    get indentFirstLine(): Nullable<INumberUnit>;
    /**
     * Gets the hanging indent
     * @returns {Nullable<INumberUnit>} The hanging indent
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.hanging);
     * ```
     */
    get hanging(): Nullable<INumberUnit>;
    /**
     * Gets the indent start
     * @returns {Nullable<INumberUnit>} The indent start
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.indentStart);
     * ```
     */
    get indentStart(): Nullable<INumberUnit>;
    /**
     * Gets the indent end
     * @returns {Nullable<INumberUnit>} The indent end
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.indentEnd);
     * ```
     */
    get tabStops(): Nullable<ITabStop[]>;
    /**
     * Gets the indent end
     * @returns {Nullable<INumberUnit>} The indent end
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.indentEnd);
     * ```
     */
    get indentEnd(): Nullable<INumberUnit>;
    /**
     * Gets the text style
     * @returns {Nullable<ITextStyle>} The text style
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.textStyle);
     * ```
     */
    get textStyle(): Nullable<ITextStyle>;
    /**
     * Gets the heading id
     * @returns {Nullable<string>} The heading id
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.headingId);
     * ```
     */
    get headingId(): Nullable<string>;
    /**
     * Gets the named style type
     * @returns {Nullable<NamedStyleType>} The named style type
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.namedStyleType);
     * ```
     */
    get namedStyleType(): Nullable<NamedStyleType>;
    /**
     * Gets the horizontal align
     * @returns {Nullable<HorizontalAlign>} The horizontal align
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.horizontalAlign);
     * ```
     */
    get horizontalAlign(): Nullable<HorizontalAlign>;
    /**
     * Gets the line spacing
     * @returns {Nullable<number>} The line spacing
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.lineSpacing);
     * ```
     */
    get lineSpacing(): Nullable<number>;
    /**
     * Gets the text direction
     * @returns {Nullable<TextDirection>} The text direction
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.direction);
     * ```
     */
    get direction(): Nullable<TextDirection>;
    /**
     * Gets the spacing rule
     * @returns {Nullable<SpacingRule>} The spacing rule
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.spacingRule);
     * ```
     */
    get spacingRule(): Nullable<SpacingRule>;
    /**
     * Gets the snap to grid
     * @returns {Nullable<BooleanNumber>} The snap to grid
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.snapToGrid);
     * ```
     */
    get snapToGrid(): Nullable<BooleanNumber>;
    /**
     * Gets the space above
     * @returns {Nullable<INumberUnit>} The space above
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.spaceAbove);
     * ```
     */
    get spaceAbove(): Nullable<INumberUnit>;
    /**
     * Gets the space below
     * @returns {Nullable<INumberUnit>} The space below
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.spaceBelow);
     * ```
     */
    get spaceBelow(): Nullable<INumberUnit>;
    /**
     * Gets the border between
     * @returns {Nullable<IParagraphBorder>} The border between
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.borderBetween);
     * ```
     */
    get borderBetween(): Nullable<IParagraphBorder>;
    /**
     * Gets the border top
     * @returns {Nullable<IParagraphBorder>} The border top
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.borderTop);
     * ```
     */
    get borderTop(): Nullable<IParagraphBorder>;
    /**
     * Gets the border bottom
     * @returns {Nullable<IParagraphBorder>} The border bottom
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.borderBottom);
     * ```
     */
    get borderBottom(): Nullable<IParagraphBorder>;
    /**
     * Gets the border left
     * @returns {Nullable<IParagraphBorder>} The border left
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.borderLeft);
     * ```
     */
    get borderLeft(): Nullable<IParagraphBorder>;
    /**
     * Gets the border right
     * @returns {Nullable<IParagraphBorder>} The border right
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.borderRight);
     * ```
     */
    get borderRight(): Nullable<IParagraphBorder>;
    /**
     * Gets the keep lines
     * @returns {boolean} The keep lines
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.keepLines);
     * ```
     */
    get keepLines(): boolean;
    /**
     * Gets the keep next
     * @returns {boolean} The keep next
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.keepNext);
     * ```
     */
    get keepNext(): boolean;
    /**
     * Gets the word wrap
     * @returns {boolean} The word wrap
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.wordWrap);
     * ```
     */
    get wordWrap(): boolean;
    /**
     * Gets the widow control
     * @returns {boolean} The widow control
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.widowControl);
     * ```
     */
    get widowControl(): boolean;
    /**
     * Gets the shading
     * @returns {Nullable<IShading>} The shading
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.shading);
     * ```
     */
    get shading(): Nullable<IShading>;
    /**
     * Gets the suppress hyphenation
     * @returns {boolean} The suppress hyphenation
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.suppressHyphenation);
     * ```
     */
    get suppressHyphenation(): boolean;
    /**
     * Creates a copy of the paragraph style
     * @returns {ParagraphStyleBuilder} The copy
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * ```
     */
    copy(): ParagraphStyleBuilder;
    /**
     * Gets the value
     * @returns {IParagraphStyle} The value
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * console.log(style.getValue());
     * ```
     */
    getValue(): IParagraphStyle;
}
/**
 * Paragraph style builder
 */
export declare class ParagraphStyleBuilder extends ParagraphStyleValue {
    /**
     * Creates a new paragraph style builder
     * @param style The paragraph style
     * @returns A new paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * ```
     */
    static create(style?: IParagraphStyle): ParagraphStyleBuilder;
    constructor(style?: IParagraphStyle);
    /**
     * Sets the indent first line
     * @param value The indent first line
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setIndentFirstLine(10);
     * ```
     */
    setIndentFirstLine(value: INumberUnit): ParagraphStyleBuilder;
    /**
     * Sets the hanging
     * @param value The hanging
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setHanging(10);
     * ```
     */
    setHanging(value: INumberUnit): ParagraphStyleBuilder;
    /**
     * Sets the indent start
     * @param value The indent start
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setIndentStart(10);
     * ```
     */
    setIndentStart(value: INumberUnit): ParagraphStyleBuilder;
    /**
     * Sets the tab stops
     * @param value The tab stops
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setTabStops([{ value: 10 }]);
     * ```
     */
    setTabStops(value: ITabStop[]): ParagraphStyleBuilder;
    /**
     * Sets the indent end
     * @param value The indent end
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setIndentEnd(10);
     * ```
     */
    setIndentEnd(value: INumberUnit): ParagraphStyleBuilder;
    /**
     * Sets the text style
     * @param value The text style
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setTextStyle({ ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE });
     * ```
     */
    setTextStyle(value: ITextStyle): ParagraphStyleBuilder;
    /**
     * Sets the heading id
     * @param value The heading id
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setHeadingId('test');
     * ```
     */
    setHeadingId(value: string): ParagraphStyleBuilder;
    /**
     * Sets the named style type
     * @param value The named style type
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setNamedStyleType(NamedStyleType.CHAPTER);
     * ```
     */
    setNamedStyleType(value: NamedStyleType): ParagraphStyleBuilder;
    /**
     * Sets the vertical align
     * @param value The vertical align
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setVerticalAlign(VerticalAlign.CENTER);
     * ```
     */
    setHorizontalAlign(value: HorizontalAlign): ParagraphStyleBuilder;
    /**
     * Sets the line spacing
     * @param value The line spacing
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setLineSpacing(10);
     * ```
     */
    setLineSpacing(value: number): ParagraphStyleBuilder;
    /**
     * Sets the text direction
     * @param value The text direction
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setTextDirection(TextDirection.RIGHT_TO_LEFT);
     * ```
     */
    setDirection(value: TextDirection): ParagraphStyleBuilder;
    /**
     * Sets the spacing rule
     * @param value The spacing rule
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setSpacingRule(SpacingRule.AUTO);
     * ```
     */
    setSpacingRule(value: SpacingRule): ParagraphStyleBuilder;
    /**
     * Sets the snap to grid
     * @param value The snap to grid
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setSnapToGrid(true);
     * ```
     */
    setSnapToGrid(value: boolean): ParagraphStyleBuilder;
    /**
     * Sets the space above
     * @param value The space above
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setSpaceAbove(10);
     * ```
     */
    setSpaceAbove(value: INumberUnit): ParagraphStyleBuilder;
    /**
     * Sets the space below
     * @param value The space below
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setSpaceBelow(10);
     * ```
     */
    setSpaceBelow(value: INumberUnit): ParagraphStyleBuilder;
    /**
     * Sets the border between
     * @param {IParagraphBorder} value The border between
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setBorderBetween({ color: 'red', width: 1 });
     * ```
     */
    setBorderBetween(value: IParagraphBorder): ParagraphStyleBuilder;
    /**
     * Sets the border top
     * @param {IParagraphBorder} value The border top
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setBorderTop({ color: 'red', width: 1 });
     * ```
     */
    setBorderTop(value: IParagraphBorder): ParagraphStyleBuilder;
    /**
     * Sets the border bottom
     * @param {IParagraphBorder} value The border bottom
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setBorderBottom({ color: 'red', width: 1 });
     * ```
     */
    setBorderBottom(value: IParagraphBorder): ParagraphStyleBuilder;
    /**
     * Sets the border left
     * @param {IParagraphBorder} value The border left
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setBorderLeft({ color: 'red', width: 1 });
     * ```
     */
    setBorderLeft(value: IParagraphBorder): ParagraphStyleBuilder;
    /**
     * Sets the border right
     * @param {IParagraphBorder} value The border right
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setBorderRight({ color: 'red', width: 1 });
     * ```
     */
    setBorderRight(value: IParagraphBorder): ParagraphStyleBuilder;
    /**
     * Sets the keep lines
     * @param value The keep lines
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setKeepLines(true);
     * ```
     */
    setKeepLines(value: boolean): ParagraphStyleBuilder;
    /**
     * Sets the keep next
     * @param value The keep next
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setKeepNext(true);
     * ```
     */
    setKeepNext(value: boolean): ParagraphStyleBuilder;
    /**
     * Sets the word wrap
     * @param value The word wrap
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setWordWrap(true);
     * ```
     */
    setWordWrap(value: boolean): ParagraphStyleBuilder;
    /**
     * Sets the widow control
     * @param {boolean} value The widow control value
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setWidowControl(true);
     * ```
     */
    setWidowControl(value: boolean): ParagraphStyleBuilder;
    /**
     * Sets the shading style
     * @param {IShading} value The shading configuration
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setShading({ backgroundColor: '#f0f0f0' });
     * ```
     */
    setShading(value: IShading): ParagraphStyleBuilder;
    /**
     * Sets whether to suppress hyphenation
     * @param {boolean} value The suppress hyphenation value
     * @returns {ParagraphStyleBuilder} The paragraph style builder
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * copy.setSuppressHyphenation(true);
     * ```
     */
    setSuppressHyphenation(value: boolean): ParagraphStyleBuilder;
    /**
     * Creates a copy of the current paragraph style builder
     * @returns {ParagraphStyleBuilder} A new instance of ParagraphStyleBuilder with the same settings
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const copy = style.copy();
     * ```
     */
    copy(): ParagraphStyleBuilder;
    /**
     * Builds and returns the final paragraph style configuration
     * @returns {IParagraphStyle} The constructed paragraph style object
     * @example
     * ```ts
     * const style = ParagraphStyleValue.create({ textStyle: { ff: 'Arial', fs: 12, it: univerAPI.Enum.BooleanNumber.TRUE, bl: univerAPI.Enum.BooleanNumber.TRUE } });
     * const finalStyle = style.build();
     * ```
     */
    build(): IParagraphStyle;
}
/**
 * Represents a rich text value
 */
export declare class RichTextValue {
    protected _data: IDocumentData;
    /**
     * Creates a new RichTextValue instance
     * @param {IDocumentData} data The initial data for the rich text value
     * @returns {RichTextValue} A new RichTextValue instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * ```
     */
    static create(data: IDocumentData): RichTextValue;
    /**
     * Creates a new RichTextValue instance
     * @param {IDocumentBody} data The initial data for the rich text value
     * @returns {RichTextValue} A new RichTextValue instance
     * @example
     * ```ts
     * const richText = RichTextValue.createByBody({ dataStream: 'Hello World\r\n' });
     * ```
     */
    static createByBody(data: IDocumentBody): RichTextValue;
    constructor(data: IDocumentData);
    /**
     * Creates a copy of the current RichTextValue instance
     * @returns {RichTextValue} A new instance of RichTextValue with the same data
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const copy = richText.copy();
     * ```
     */
    copy(): RichTextBuilder;
    /**
     * Slices the current RichTextValue instance
     * @param {number} start The start index
     * @param {number} end The end index
     * @returns {RichTextBuilder} A new instance of RichTextBuilder with the sliced data
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const sliced = richText.slice(0, 5);
     * ```
     */
    slice(start: number, end: number): RichTextBuilder;
    /**
     * Converts the current RichTextValue instance to plain text
     * @returns {string} The plain text representation of the current RichTextValue instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const plainText = richText.toPlainText();
     * ```
     */
    toPlainText(): string;
    /**
     * Gets the paragraph style of the current RichTextValue instance
     * @returns {ParagraphStyleValue} The paragraph style of the current RichTextValue instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const style = richText.getParagraphStyle();
     * ```
     */
    getParagraphStyle(): ParagraphStyleValue;
    /**
     * Gets the paragraph bullet of the current RichTextValue instance
     * @returns {ParagraphBulletValue} The paragraph bullet of the current RichTextValue instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const bullet = richText.getParagraphBullet();
     * ```
     */
    getParagraphBullet(): import("../..").IBullet | undefined;
    /**
     * Gets the paragraphs of the current RichTextValue instance
     * @returns {RichTextValue[]} The paragraphs of the current RichTextValue instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const paragraphs = richText.getParagraphs();
     * ```
     */
    getParagraphs(): RichTextValue[];
    /**
     * Gets the text runs of the current RichTextValue instance
     * @returns {TextRunValue[]} The text runs of the current RichTextValue instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const textRuns = richText.getTextRuns();
     * ```
     */
    getTextRuns(): {
        ts: TextStyleValue | null;
        st: number;
        ed: number;
        sId?: string;
    }[];
    /**
     * Gets the links of the current RichTextValue instance
     * @returns {ICustomRange[]} The links of the current RichTextValue instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const links = richText.getLinks();
     * ```
     */
    getLinks(): import("../..").ICustomRange<Record<string, any>>[];
    /**
     * Gets the data of the current RichTextValue instance
     * @returns {IDocumentData} The data of the current RichTextValue instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const data = richText.getData();
     * ```
     */
    getData(): IDocumentData;
}
/**
 * Represents a rich text builder
 */
export declare class RichTextBuilder extends RichTextValue {
    static newEmptyData(): IDocumentData;
    /**
     * Creates a new RichTextBuilder instance
     * @param {IDocumentData} data The initial data for the rich text builder
     * @returns {RichTextBuilder} A new RichTextBuilder instance
     */
    static create(data?: IDocumentData): RichTextBuilder;
    private _doc;
    private readonly _trackedRanges;
    private _childHandleRevision;
    constructor(data: IDocumentData);
    /**
     * Returns editable paragraph handles backed by this detached rich-text builder.
     *
     * Paragraph boundaries come from the document model rather than splitting plain text. Handles stay aligned across
     * edits made through their child run handles, so callers can safely iterate from the first paragraph to the last.
     * Direct builder edits that change text or run boundaries invalidate previously returned paragraph and run handles;
     * query them again after calling methods such as `insertText()`, `setStyle()`, `setLink()`, or `delete()`.
     *
     * @returns Editable paragraphs in document order.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText()
     *   .text('Quarterly Review')
     *   .paragraph()
     *   .text('Revenue increased by 18%.');
     * for (const paragraph of richText.getParagraphs()) {
     *   console.log(paragraph.getText());
     * }
     * ```
     */
    getParagraphs(): RichTextParagraphBuilder[];
    /**
     * Returns editable text-run handles for all paragraph text in this builder.
     *
     * Unlike the read-only value API, this method also returns unstyled gaps. Paragraph and section markers are never
     * exposed as text runs. Prefer `getParagraphs()` when paragraph context matters.
     *
     * @returns Editable text runs in document order.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText()
     *   .text('Status: ')
     *   .span('Ready', { bold: true, color: '#16a34a' });
     * for (const run of richText.getTextRuns()) {
     *   console.log(run.getText(), run.getTextStyle()?.getValue());
     * }
     * ```
     */
    getTextRuns(): RichTextRunBuilder[];
    private _createParagraphBuilder;
    private _trackRange;
    private _rebaseTrackedRanges;
    private _invalidateChildHandles;
    /**
     * Appends plain text to the rich text.
     *
     * This is an agent-friendly alias of `insertText(text)`. Use it when building rich text from left to right for
     * shapes, comments, table cells, and document fragments.
     *
     * @param text Text to append.
     * @returns The current builder for chaining.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText()
     *   .text('Priority: ')
     *   .bold('High')
     *   .text(' ')
     *   .code('P0');
     * ```
     */
    text(text: string): RichTextBuilder;
    /**
     * Aligns the rich-text block inside its host container.
     *
     * This is the preferred facade-friendly API for alignment shared by shapes and table cells. It keeps callers away
     * from `IDocumentData.documentStyle.renderConfig`. Use `paragraph({ align })` when individual paragraphs need
     * different horizontal alignment.
     *
     * @param alignment Horizontal and/or vertical container alignment.
     * @returns The current builder for chaining.
     * @example
     * ```ts
     * const text = univerAPI.newRichText()
     *   .align({
     *     horizontal: univerAPI.Enum.HorizontalAlign.CENTER,
     *     vertical: univerAPI.Enum.VerticalAlign.MIDDLE,
     *   })
     *   .text('Centered text');
     * ```
     */
    align(alignment: IRichTextAlignment): RichTextBuilder;
    /**
     * Sets the column layout for this rich-text document.
     *
     * Columns are stored in the rich-text document section layout. This creates text-flow columns, not table columns.
     * The host renderer must support rich-text columns for the layout to be visible.
     *
     * @param options The column layout options.
     * @param options.count The number of text columns. Must be a positive integer. Use `1` to clear multi-column layout.
     * @param options.spacing The spacing between columns, in px. Defaults to `0`.
     * @returns The current builder for chaining.
     *
     * @example
     * ```ts
     * const presentation = univerAPI.getActivePresentation();
     * if (!presentation) throw new Error('No active presentation');
     *
     * const slide = presentation.getSlideByIndex(0);
     * if (!slide) throw new Error('The presentation has no slides');
     * const richText = univerAPI.newRichText()
     *   .columns({ count: 2, spacing: 12 })
     *   .text('Column text');
     *
     * const shapeInfo = slide.newShape()
     *   .setRichText(richText)
     *   .setAbsolutePosition(80, 80)
     *   .setSize(360, 160)
     *   .build();
     *
     * slide.insertShape(shapeInfo);
     * ```
     */
    columns(options: IRichTextColumnsOptions): RichTextBuilder;
    /**
     * Appends one text span with an optional style.
     *
     * Prefer this method when combining multiple styles, because the style object is local to the inserted text and does
     * not leak into following calls.
     *
     * @param text Text to append.
     * @param style Optional text style for this span. When omitted, the span is appended as unstyled text. Agent-friendly
     * aliases such as `bold`, `italic`, `fontFamily`, `fontSize`, `color`, and `background` are supported alongside native
     * document text style fields.
     * @returns The current builder for chaining.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText()
     *   .text('Status: ')
     *   .span('Important', { bold: true, italic: true, color: '#d92d20' });
     * ```
     */
    span(text: string, style?: IRichTextSpanStyle): RichTextBuilder;
    /**
     * Appends bold text.
     *
     * @param text Text to append.
     * @returns The current builder for chaining.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText().text('This is ').bold('important');
     * ```
     */
    bold(text: string): RichTextBuilder;
    /**
     * Appends italic text.
     *
     * @param text Text to append.
     * @returns The current builder for chaining.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText().text('Use ').italic('judgment');
     * ```
     */
    italic(text: string): RichTextBuilder;
    /**
     * Appends inline code-style text.
     *
     * This is intentionally an inline text style, not a block range. Use `paragraph().code('...')` when the code should
     * occupy its own line.
     *
     * @param text Text to append as inline code.
     * @returns The current builder for chaining.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText()
     *   .text('Run ')
     *   .code('pnpm test')
     *   .text(' before submitting.');
     * ```
     */
    code(text: string): RichTextBuilder;
    /**
     * Appends linked text.
     *
     * This is the agent-friendly alias of `insertLink(text, url)`. Use `setLink(start, end, url)` only when applying a
     * link to text that is already present and numeric offsets are unavoidable.
     *
     * @param text Visible link text to append. An empty string is ignored.
     * @param url Link destination.
     * @returns The current builder for chaining.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText()
     *   .text('Read ')
     *   .link('Univer documentation', 'https://docs.univer.ai')
     *   .text(' for details.');
     * ```
     */
    link(text: string, url: string): RichTextBuilder;
    /**
     * Appends one ordered, unordered, or checklist paragraph.
     *
     * Consecutive items with the same `type` automatically share a generated list id. Supply a semantic `listId` when
     * an agent needs stable list identity across regeneration.
     *
     * @param text Plain item text.
     * @param options List type, stable identity, nesting, and optional paragraph layout.
     * @returns The current builder for chaining.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText()
     *   .listItem('Analyze requirements', {
     *     type: univerAPI.Enum.PresetListType.BULLET_LIST,
     *     listId: 'agent.tasks',
     *   })
     *   .listItem('Implement API', {
     *     type: univerAPI.Enum.PresetListType.BULLET_LIST,
     *     listId: 'agent.tasks',
     *     level: 1,
     *   });
     * ```
     */
    listItem(text: string, options?: IRichTextListItemOptions): RichTextBuilder;
    /**
     * Starts a new paragraph before the next appended content.
     *
     * Calling `paragraph()` on an empty builder is a no-op, so agents can naturally start chains with
     * `newRichText().paragraph().text('Title')` without creating a leading blank paragraph.
     *
     * @param paragraphStyle Optional agent-friendly paragraph options or an advanced paragraph style builder.
     * @returns The current builder for chaining.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText()
     *   .paragraph({ lineHeight: 1.4, firstLineIndent: 16, spaceAfter: 8 })
     *   .text('First paragraph')
     *   .paragraph({ align: univerAPI.Enum.HorizontalAlign.CENTER })
     *   .span('Second paragraph', { bold: true, italic: true });
     * ```
     */
    paragraph(paragraphStyle?: ParagraphStyleBuilder | IRichTextParagraphStyle): RichTextBuilder;
    /**
     * Inserts text into the rich text builder at the specified start position
     * @param start The start position of the text to insert
     * @param text The text to insert
     * @param style The style of the text to insert
     * @returns {RichTextBuilder} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const newRichText = richText.insertText('World');
     * ```
     */
    insertText(text: string, style?: TextStyleBuilder | ITextStyle): RichTextBuilder;
    /**
     * Inserts text into the rich text builder at the specified start position
     * @param start The start position of the text to insert
     * @param text The text to insert
     * @param style The style of the text to insert
     * @returns {RichTextBuilder} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const newRichText = richText.insertText(5, 'World', { ff: 'Arial', fs: 12 });
     * ```
     */
    insertText(start: number, text: string, style?: TextStyleBuilder | ITextStyle): RichTextBuilder;
    /**
     * Inserts rich text into the rich text builder at the specified start position
     * @param {RichTextValue} richText The rich text to insert
     * @returns {RichTextValue | IDocumentData} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const newRichText = richText.insertRichText(RichTextValue.create({ body: { dataStream: 'World' } }));
     * ```
     */
    insertRichText(richText: RichTextValue | IDocumentData): RichTextBuilder;
    /**
     *  Inserts rich text into the rich text builder at the specified start position
     * @param {number} start The start position of the text to insert
     * @param { RichTextValue | IDocumentData} richText The rich text to insert
     * @returns {RichTextValue | IDocumentData} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const newRichText = richText.insertRichText(5, RichTextValue.create({ body: { dataStream: 'World' } }));
     * ```
     */
    insertRichText(start: number, richText: RichTextValue | IDocumentData): RichTextBuilder;
    /**
     * Deletes text from the rich text builder from the end.
     * @param {number} count The number of characters to delete (optional)
     * @returns {RichTextBuilder} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const newRichText = richText.delete(5);
     * ```
     */
    delete(count: number): RichTextBuilder;
    /**
     * Deletes text from the rich text builder at the specified start position
     * @param {number} start The start position of the text to delete
     * @param {number} [count] The number of characters to delete (optional)
     * @returns {RichTextBuilder} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const newRichText = richText.delete(5, 5);
     * ```
     */
    delete(start: number, count: number): RichTextBuilder;
    /**
     * Sets the style of the text at the specified start and end positions
     * @param {number} start The start position of the text to set the style
     * @param {number} end The end position of the text to set the style
     * @param {TextStyleBuilder | ITextStyle} style The style to set
     * @returns {RichTextBuilder} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const newRichText = richText.setStyle(5, 10, { ff: 'Arial', fs: 12 });
     * ```
     */
    setStyle(start: number, end: number, style: TextStyleBuilder | ITextStyle): RichTextBuilder;
    /**
     * Sets the link of the text at the specified start and end positions
     * @param {number} start The start position of the text to set the link
     * @param {number} end The end position of the text to set the link
     * @param {string} link The link to set
     * @returns {RichTextBuilder} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const newRichText = richText.setLink(5, 10, 'https://www.example.com');
     * ```
     */
    setLink(start: number, end: number, link: string): RichTextBuilder;
    /**
     * Cancels the link of the text at the specified start and end positions
     * @param {string} linkId The id of the link to cancel
     * @returns {RichTextBuilder} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({
     *      body: {
     *          dataStream: 'Hello World\r\n',
     *          customRanges: [
     *              {
     *                  rangeType: CustomRangeType.HYPERLINK,
     *                  rangeId: 'linkId',
     *                  properties: { url: 'https://www.example.com' },
     *                  startIndex: 0,
     *                  endIndex: 5
     *          }]
     *      }
     * });
     * const newRichText = richText.cancelLink('linkId');
     * ```
     */
    cancelLink(linkId: string): RichTextBuilder;
    /**
     * Cancels the link of the text at the specified start and end positions
     * @param {number} start The start position of the text to cancel the link
     * @param {number} end The end position of the text to cancel the link
     * @returns {RichTextBuilder} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({
     *      body: {
     *          dataStream: 'Hello World\r\n',
     *          customRanges: [
     *              {
     *                  rangeType: CustomRangeType.HYPERLINK,
     *                  rangeId: 'linkId',
     *                  properties: { url: 'https://www.example.com' },
     *                  startIndex: 0,
     *                  endIndex: 5
     *          }]
     *      }
     * });
     * const newRichText = richText.cancelLink(0, 10);
     * ```
     */
    cancelLink(start: number, end: number): RichTextBuilder;
    /**
     * Removes a link while preserving its visible text.
     *
     * Link ids are available from `getLinks()`. This readable alias avoids exposing text offsets for the common case.
     * Use `cancelLink(start, end)` only when removing every link in a known text range.
     *
     * @param id Link range id returned by `getLinks()`.
     * @returns The current builder for chaining.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText().link('Univer', 'https://univer.ai');
     * const [link] = richText.getLinks();
     * if (link) richText.removeLink(link.rangeId);
     * ```
     */
    removeLink(id: string): RichTextBuilder;
    /**
     * Updates a link destination while preserving its visible text.
     * @param id Link range id returned by `getLinks()`.
     * @param url New link destination.
     * @returns The current builder for chaining.
     */
    updateLink(id: string, url: string): RichTextBuilder;
    /**
     * Inserts a new paragraph to the end
     * @param {ParagraphStyleBuilder} paragraphStyle The style of the paragraph to insert
     * @returns {RichTextBuilder} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const newRichText = richText.insertParagraph();
     * ```
     */
    insertParagraph(paragraphStyle?: ParagraphStyleBuilder): RichTextBuilder;
    /**
     * Inserts a new paragraph at the specified start position
     * @param {number} start The start position of the paragraph to insert
     * @param {ParagraphStyleBuilder} paragraphStyle The style of the paragraph to insert
     * @returns {RichTextBuilder} The current RichTextBuilder instance
     * @example
     * ```ts
     * const richText = RichTextValue.create({ body: { dataStream: 'Hello World\r\n' } });
     * const newRichText = richText.insertParagraph(5, { ff: 'Arial', fs: 12 });
     * ```
     */
    insertParagraph(start: number, paragraphStyle: ParagraphStyleBuilder): RichTextBuilder;
    /**
     * Inserts linked text at the end of the builder or at an explicit text offset.
     *
     * Application and agent code should prefer `link(text, url)` for left-to-right construction. The positional
     * overload remains available for advanced document-model integrations.
     *
     * @param text Visible link text to insert.
     * @param url Link destination.
     * @returns The current builder for chaining.
     */
    insertLink(text: string, url: string): RichTextBuilder;
    insertLink(start: number, text: string, url: string): RichTextBuilder;
}
/**
 * An editable paragraph handle owned by a detached {@link RichTextBuilder}.
 *
 * The paragraph is resolved by its persisted paragraph id, while its tracked range is rebased after every run edit.
 * This keeps paragraph traversal safe when earlier translated text becomes longer or shorter.
 */
export declare class RichTextParagraphBuilder extends RichTextValue {
    private readonly _owner;
    private readonly _paragraphId;
    private readonly _range;
    private readonly _revision;
    /** @hideconstructor */
    constructor(_owner: RichTextBuilder, _paragraphId: string, _range: IMutableRichTextRange, _revision: number);
    /** Returns the persisted paragraph id. */
    getId(): string;
    /** Returns the current paragraph range without its trailing paragraph marker. */
    getRange(): IRichTextRange;
    /**
     * Returns the current paragraph text without its trailing paragraph marker.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText().text('Quarterly Review');
     * const paragraph = richText.getParagraphs()[0];
     * console.log(paragraph.getText());
     * ```
     */
    getText(): string;
    toPlainText(): string;
    /**
     * Returns editable runs that cover all text in this paragraph, including unstyled gaps.
     * @returns Editable text runs in document order.
     */
    getTextRuns(): RichTextRunBuilder[];
    getParagraphStyle(): ParagraphStyleValue;
    getParagraphBullet(): import("../..").IBullet | undefined;
    getLinks(): import("../..").ICustomRange<Record<string, any>>[];
    /** Agent-friendly alias of `getParagraphBullet()`. */
    getBullet(): import("../..").IBullet | undefined;
    getData(): IDocumentData;
    copy(): RichTextBuilder;
    private _getParagraph;
    private _assertActive;
}
/**
 * An editable text-run handle owned by a detached {@link RichTextBuilder}.
 *
 * Calling {@link setText} replaces only the run text. The builder automatically updates this run, every later run,
 * paragraph indexes, hyperlinks, decorations, and other offset-based document metadata through TextX.
 */
export declare class RichTextRunBuilder {
    private readonly _owner;
    private readonly _range;
    private readonly _textStyle;
    private readonly _styleId;
    private readonly _hasExplicitTextStyle;
    private readonly _revision;
    private _active;
    /** @hideconstructor */
    constructor(_owner: RichTextBuilder, _range: IMutableRichTextRange, _textStyle: ITextStyle | undefined, _styleId: string | undefined, _hasExplicitTextStyle: boolean, _revision: number);
    /** Inclusive start offset, kept for compatibility with existing `getTextRuns()` callers. */
    get st(): number;
    /** Exclusive end offset, automatically updated after text replacement. */
    get ed(): number;
    /** Optional persisted style id. This is not a stable run identity. */
    get sId(): string | undefined;
    /** Existing text-style value property exposed by `getTextRuns()`. */
    get ts(): TextStyleValue | null;
    /** Returns the current run range. */
    getRange(): IRichTextRange;
    /** Returns the current run text. */
    getText(): string;
    /** Returns this run's explicit text style, or `null` for an unstyled text segment. */
    getTextStyle(): TextStyleValue | null;
    /** Returns whether this segment is backed by an explicit document text run. */
    hasTextStyle(): boolean;
    /**
     * Replaces this run's text without changing its style or paragraph structure.
     *
     * Replacement text may be longer or shorter than the original. Offsets are updated automatically, so handles
     * returned in the same `getTextRuns()` call remain safe to use in forward order. Paragraph and section breaks are
     * rejected because a text run cannot create or remove paragraphs.
     *
     * @param text New text for this run.
     * @returns This run handle for chaining. A handle becomes invalid after it is replaced with an empty string.
     * @example
     * ```ts
     * const richText = univerAPI.newRichText()
     *   .span('标题', { bold: true, fontSize: 24 })
     *   .paragraph()
     *   .text('正文内容');
     * const replacements = ['Quarterly Review', 'Revenue increased by 18%.'];
     * let index = 0;
     * for (const run of richText.getTextRuns()) {
     *   const replacement = replacements[index++];
     *   if (replacement !== undefined) run.setText(replacement);
     * }
     * console.log(richText.toPlainText());
     * ```
     */
    setText(text: string): this;
    private _assertActive;
}
export {};
