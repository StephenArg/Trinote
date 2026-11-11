import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-accent-callout3-icon.tsx
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
				"d": "M19 4V15H9V4H19Z",
				"strokeDasharray": "4 3",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6 3V16",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6 18.5L1 15V9H6",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeAccentCallout3Icon = forwardRef(function ShapeAccentCallout3Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-accent-callout3-icon",
		ref,
		icon: element
	}));
});
ShapeAccentCallout3Icon.displayName = "ShapeAccentCallout3Icon";
//#endregion
export { ShapeAccentCallout3Icon, ShapeAccentCallout3Icon as default };
