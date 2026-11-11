import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-rt-triangle-icon.tsx
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
			"d": "M2 3.41406V18H16.5859L2 3.41406Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeRtTriangleIcon = forwardRef(function ShapeRtTriangleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-rt-triangle-icon",
		ref,
		icon: element
	}));
});
ShapeRtTriangleIcon.displayName = "ShapeRtTriangleIcon";
//#endregion
export { ShapeRtTriangleIcon, ShapeRtTriangleIcon as default };
