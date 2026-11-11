import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-corner-tabs-icon.tsx
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
				"d": "M1.8 7V1.8H7L1.8 7Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.8 13V18.2H7L1.8 13Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M18.2 7V1.8H13L18.2 7Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M18.2 13V18.2H13L18.2 13Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeCornerTabsIcon = forwardRef(function ShapeCornerTabsIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-corner-tabs-icon",
		ref,
		icon: element
	}));
});
ShapeCornerTabsIcon.displayName = "ShapeCornerTabsIcon";
//#endregion
export { ShapeCornerTabsIcon, ShapeCornerTabsIcon as default };
