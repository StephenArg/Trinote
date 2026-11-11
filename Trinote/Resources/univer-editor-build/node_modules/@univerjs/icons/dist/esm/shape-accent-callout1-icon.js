import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-accent-callout1-icon.tsx
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
				"d": "M19.0001 4V15H9.00013V4H19.0001Z",
				"strokeDasharray": "4 3",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.00013 3V16",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.00013 17L6.00013 9",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeAccentCallout1Icon = forwardRef(function ShapeAccentCallout1Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-accent-callout1-icon",
		ref,
		icon: element
	}));
});
ShapeAccentCallout1Icon.displayName = "ShapeAccentCallout1Icon";
//#endregion
export { ShapeAccentCallout1Icon, ShapeAccentCallout1Icon as default };
