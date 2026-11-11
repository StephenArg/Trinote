import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-bevel-icon.tsx
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
				"d": "M1.8 1.8H18.2V18.2H1.8z",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.8 5.8H14.2V14.2H5.8z",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.8 1.8L5.8 5.8M18.2 1.8L14.2 5.8M18.2 18.2L14.2 14.2M1.8 18.2L5.8 14.2",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeBevelIcon = forwardRef(function ShapeBevelIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-bevel-icon",
		ref,
		icon: element
	}));
});
ShapeBevelIcon.displayName = "ShapeBevelIcon";
//#endregion
export { ShapeBevelIcon, ShapeBevelIcon as default };
