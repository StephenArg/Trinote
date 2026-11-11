import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/pdf-highlight-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 24 24",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.75 16.05L15.5 6.3A2 2 0 0 1 18.33 6.3L18.7 6.67A2 2 0 0 1 18.7 9.5L8.95 19.25L5.75 16.05Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.65
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M5.75 16.05L8.95 19.25L3.8 20.2L5.75 16.05Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10.4 20.45H20.9",
				"strokeOpacity": .16,
				"strokeWidth": 3.2
			}
		}
	]
};
const PdfHighlightIcon = forwardRef(function PdfHighlightIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "pdf-highlight-icon",
		ref,
		icon: element
	}));
});
PdfHighlightIcon.displayName = "PdfHighlightIcon";
//#endregion
export { PdfHighlightIcon, PdfHighlightIcon as default };
