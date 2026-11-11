import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-teardrop-icon.tsx
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
			"d": "M18.2 10V1.8H10C5.471 1.8 1.8 5.471 1.8 10C1.8 14.529 5.471 18.2 10 18.2C14.529 18.2 18.2 14.529 18.2 10Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeTeardropIcon = forwardRef(function ShapeTeardropIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-teardrop-icon",
		ref,
		icon: element
	}));
});
ShapeTeardropIcon.displayName = "ShapeTeardropIcon";
//#endregion
export { ShapeTeardropIcon, ShapeTeardropIcon as default };
