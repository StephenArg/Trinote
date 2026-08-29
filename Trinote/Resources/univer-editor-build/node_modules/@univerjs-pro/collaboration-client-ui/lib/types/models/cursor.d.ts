import type { IRange } from '@univerjs/core';
import type { ITextRangeWithStyle } from '@univerjs/engine-render';
/**
 * The data structure to store collab cursor info of sheet.
 */
export interface ISheetCollabCursor {
    /** Stroke color of this collab cursor */
    color: string;
    /** Position of this cursor */
    range: IRange;
    /** Displayed user name of this cursor */
    name: string;
    /** The serialized range to check if two cursor are on the same position. */
    selection: string;
    /** Worksheet ID */
    sheetID: string;
    /** Background color of this collab cursor */
    backgroundColor?: string;
    /** Whether to always show the text label (not just on hover) */
    showText?: boolean;
    /** Whether to highlight the cursor with blinking effect */
    highlight?: boolean;
    /** Duration in seconds for the highlight blinking effect */
    highlightSecond?: number;
}
/**
 * The data structure to store collab cursor info of doc.
 */
export interface IDocCollabCursor {
    /** Background color of this collab cursor */
    color: string;
    /** Displayed user name of this cursor */
    name: string;
    /** The deserialized ranges of collab cursor. */
    ranges: ITextRangeWithStyle[];
}
