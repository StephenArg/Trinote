import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-can-icon.tsx
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
			"cy": 5,
			"stroke": "currentColor",
			"rx": 8,
			"ry": 4,
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M2 5V14C2 16.2 5.6 18.5 10 18.5C14.4 18.5 18 16.2 18 14V5",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeCanIcon = forwardRef(function ShapeCanIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-can-icon",
		ref,
		icon: element
	}));
});
ShapeCanIcon.displayName = "ShapeCanIcon";
//#endregion
export { ShapeCanIcon, ShapeCanIcon as default };
