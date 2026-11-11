import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/cross-highlighting-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5 2H2V5M11 2H14V5M14 11V14H11M5 14H2V11",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.6 3.8H9.4V6.6H12.2V9.4H9.4V12.2H6.6V9.4H3.8V6.6H6.6V3.8Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.15
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 2.6,
				"height": 2.6,
				"x": 6.7,
				"y": 6.7,
				"fill": "currentColor",
				"rx": .35
			}
		}
	]
};
const CrossHighlightingIcon = forwardRef(function CrossHighlightingIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "cross-highlighting-icon",
		ref,
		icon: element
	}));
});
CrossHighlightingIcon.displayName = "CrossHighlightingIcon";
//#endregion
export { CrossHighlightingIcon, CrossHighlightingIcon as default };
