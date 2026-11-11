import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-math-divide-icon.tsx
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
			"tag": "circle",
			"attrs": {
				"cx": 10,
				"cy": 3,
				"r": 2.2,
				"stroke": "currentColor",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2 10H18",
				"strokeLinecap": "square",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10,
				"cy": 17,
				"r": 2.2,
				"stroke": "currentColor",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeMathDivideIcon = forwardRef(function ShapeMathDivideIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-math-divide-icon",
		ref,
		icon: element
	}));
});
ShapeMathDivideIcon.displayName = "ShapeMathDivideIcon";
//#endregion
export { ShapeMathDivideIcon, ShapeMathDivideIcon as default };
