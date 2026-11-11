import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-math-multiply-icon.tsx
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
			"d": "M4 4L16 16M16 4L4 16",
			"strokeLinecap": "square",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeMathMultiplyIcon = forwardRef(function ShapeMathMultiplyIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-math-multiply-icon",
		ref,
		icon: element
	}));
});
ShapeMathMultiplyIcon.displayName = "ShapeMathMultiplyIcon";
//#endregion
export { ShapeMathMultiplyIcon, ShapeMathMultiplyIcon as default };
