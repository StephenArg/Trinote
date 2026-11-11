import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-right-brace-icon.tsx
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
			"d": "M8 2C9.8 2 10.6 2.75 10.6 4.6V7.3C10.6 8.55 11.15 9.35 12.4 9.9C11.15 10.45 10.6 11.25 10.6 12.5V15.4C10.6 17.25 9.8 18 8 18",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeRightBraceIcon = forwardRef(function ShapeRightBraceIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-right-brace-icon",
		ref,
		icon: element
	}));
});
ShapeRightBraceIcon.displayName = "ShapeRightBraceIcon";
//#endregion
export { ShapeRightBraceIcon, ShapeRightBraceIcon as default };
