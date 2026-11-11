import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-math-equal-icon.tsx
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
			"d": "M2 6H18M2 14H18",
			"strokeLinecap": "square",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeMathEqualIcon = forwardRef(function ShapeMathEqualIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-math-equal-icon",
		ref,
		icon: element
	}));
});
ShapeMathEqualIcon.displayName = "ShapeMathEqualIcon";
//#endregion
export { ShapeMathEqualIcon, ShapeMathEqualIcon as default };
