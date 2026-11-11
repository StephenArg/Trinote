import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-parallelogram-icon.tsx
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
			"d": "M6.02734 2H17.7373L13.9727 18H2.2627L6.02734 2Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeParallelogramIcon = forwardRef(function ShapeParallelogramIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-parallelogram-icon",
		ref,
		icon: element
	}));
});
ShapeParallelogramIcon.displayName = "ShapeParallelogramIcon";
//#endregion
export { ShapeParallelogramIcon, ShapeParallelogramIcon as default };
