import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/conditional-color-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"stroke": "currentColor",
		"viewBox": "0 0 20 20",
		"strokeLinecap": "round",
		"strokeLinejoin": "round",
		"strokeWidth": 1.6,
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": { "d": "M3.6 8.1L9.6 2.1L15.6 8.1L9.6 14.1L3.6 8.1Z" }
		},
		{
			"tag": "path",
			"attrs": { "d": "M5.2 9.7H14" }
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"stroke": "none",
				"d": "M14.6 15.2C14.6 16.35 15.42 17.15 16.4 17.15C17.38 17.15 18.2 16.35 18.2 15.2C18.2 14.3 17.28 13.15 16.72 12.52C16.55 12.33 16.25 12.33 16.08 12.52C15.52 13.15 14.6 14.3 14.6 15.2Z"
			}
		}
	]
};
const ConditionalColorIcon = forwardRef(function ConditionalColorIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "conditional-color-icon",
		ref,
		icon: element
	}));
});
ConditionalColorIcon.displayName = "ConditionalColorIcon";
//#endregion
export { ConditionalColorIcon, ConditionalColorIcon as default };
