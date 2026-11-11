import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/math-function-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "rect",
		"attrs": {
			"width": 11.2,
			"height": 13.2,
			"x": 2.4,
			"y": 1.4,
			"stroke": "currentColor",
			"rx": 1.6,
			"strokeWidth": 1.2
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M5 12H11M5.1 7.6H6.1L7 9.7L8.35 4.9H10.9",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const MathFunctionIcon = forwardRef(function MathFunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "math-function-icon",
		ref,
		icon: element
	}));
});
MathFunctionIcon.displayName = "MathFunctionIcon";
//#endregion
export { MathFunctionIcon, MathFunctionIcon as default };
