import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-square-tabs-icon.tsx
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
				"d": "M1.8 1.8H6.2V6.2H1.8z",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.8 13.8H6.2V18.2H1.8z",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M13.8 1.8H18.2V6.2H13.8z",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M13.8 13.8H18.2V18.2H13.8z",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeSquareTabsIcon = forwardRef(function ShapeSquareTabsIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-square-tabs-icon",
		ref,
		icon: element
	}));
});
ShapeSquareTabsIcon.displayName = "ShapeSquareTabsIcon";
//#endregion
export { ShapeSquareTabsIcon, ShapeSquareTabsIcon as default };
