import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-ellipse-icon.tsx
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
		"tag": "ellipse",
		"attrs": {
			"cx": 10,
			"cy": 10,
			"stroke": "currentColor",
			"rx": 8.2,
			"ry": 6.2,
			"strokeWidth": 1.6
		}
	}]
};
const ShapeEllipseIcon = forwardRef(function ShapeEllipseIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-ellipse-icon",
		ref,
		icon: element
	}));
});
ShapeEllipseIcon.displayName = "ShapeEllipseIcon";
//#endregion
export { ShapeEllipseIcon, ShapeEllipseIcon as default };
