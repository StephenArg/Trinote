import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/first-tab-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5 4v12",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M15 10H7",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10 7l-3 3 3 3",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const FirstTabIcon = forwardRef(function FirstTabIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "first-tab-icon",
		ref,
		icon: element
	}));
});
FirstTabIcon.displayName = "FirstTabIcon";
//#endregion
export { FirstTabIcon, FirstTabIcon as default };
