import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/row-height-short-icon.tsx
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
			"tag": "rect",
			"attrs": {
				"width": 8.3,
				"height": 1.7,
				"x": 1.5,
				"y": 5,
				"fill": "currentColor",
				"rx": .85
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 6,
				"height": 1.7,
				"x": 1.5,
				"y": 10,
				"fill": "currentColor",
				"rx": .85
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 8.3,
				"height": 1.7,
				"x": 1.5,
				"y": 15,
				"fill": "currentColor",
				"rx": .85
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M14.2 4.2v11.6",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "m12 6.5 2.2-2.3 2.2 2.3",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "m12 13.5 2.2 2.3 2.2-2.3",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const RowHeightShortIcon = forwardRef(function RowHeightShortIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "row-height-short-icon",
		ref,
		icon: element
	}));
});
RowHeightShortIcon.displayName = "RowHeightShortIcon";
//#endregion
export { RowHeightShortIcon, RowHeightShortIcon as default };
