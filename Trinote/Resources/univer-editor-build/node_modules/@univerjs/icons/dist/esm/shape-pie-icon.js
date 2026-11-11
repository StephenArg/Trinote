import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-pie-icon.tsx
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
			"d": "M10 1.8V10H18.2C18.2 14.529 14.529 18.2 10 18.2C5.471 18.2 1.8 14.529 1.8 10C1.8 5.471 5.471 1.8 10 1.8Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapePieIcon = forwardRef(function ShapePieIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-pie-icon",
		ref,
		icon: element
	}));
});
ShapePieIcon.displayName = "ShapePieIcon";
//#endregion
export { ShapePieIcon, ShapePieIcon as default };
