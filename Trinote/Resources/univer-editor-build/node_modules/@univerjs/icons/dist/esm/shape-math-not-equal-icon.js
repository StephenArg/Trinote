import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-math-not-equal-icon.tsx
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
			"d": "M3 6H17M3 14H17M13.5 2L6.5 18",
			"strokeLinecap": "square",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeMathNotEqualIcon = forwardRef(function ShapeMathNotEqualIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-math-not-equal-icon",
		ref,
		icon: element
	}));
});
ShapeMathNotEqualIcon.displayName = "ShapeMathNotEqualIcon";
//#endregion
export { ShapeMathNotEqualIcon, ShapeMathNotEqualIcon as default };
