import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-math-minus-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M2 10H18",
			"strokeLinecap": "square",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeMathMinusIcon = forwardRef(function ShapeMathMinusIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-math-minus-icon",
		ref,
		icon: element
	}));
});
ShapeMathMinusIcon.displayName = "ShapeMathMinusIcon";
//#endregion
export { ShapeMathMinusIcon, ShapeMathMinusIcon as default };
