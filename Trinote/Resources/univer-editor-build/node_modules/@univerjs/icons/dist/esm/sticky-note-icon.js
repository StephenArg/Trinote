import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sticky-note-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M2.39967 2.26669H13.5997C13.9679 2.26669 14.2663 2.56517 14.2663 2.93336V9.66669L9.66634 14.2667H2.39967C2.03148 14.2667 1.73301 13.9682 1.73301 13.6V2.93336C1.73301 2.56517 2.03148 2.26669 2.39967 2.26669Z",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.35
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M9.66634 14.2667V10.3334C9.66634 9.96517 9.96482 9.66669 10.333 9.66669H14.2663L9.66634 14.2667Z"
		}
	}]
};
const StickyNoteIcon = forwardRef(function StickyNoteIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sticky-note-icon",
		ref,
		icon: element
	}));
});
StickyNoteIcon.displayName = "StickyNoteIcon";
//#endregion
export { StickyNoteIcon, StickyNoteIcon as default };
