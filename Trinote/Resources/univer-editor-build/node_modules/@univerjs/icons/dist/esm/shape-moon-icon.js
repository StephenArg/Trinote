import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-moon-icon.tsx
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
			"d": "M15.6 1.8C12.8 5.9 11.8 6.7 11.8 10C11.8 13.3 13.1 14.9 15.6 18.2C10.8 18.1 5.8 16.1 5.8 10C5.8 3.9 10.8 1.9 15.6 1.8Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeMoonIcon = forwardRef(function ShapeMoonIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-moon-icon",
		ref,
		icon: element
	}));
});
ShapeMoonIcon.displayName = "ShapeMoonIcon";
//#endregion
export { ShapeMoonIcon, ShapeMoonIcon as default };
