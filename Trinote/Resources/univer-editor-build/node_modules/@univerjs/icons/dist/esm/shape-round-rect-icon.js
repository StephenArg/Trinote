import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-round-rect-icon.tsx
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
		"tag": "rect",
		"attrs": {
			"width": 16.4,
			"height": 12.4,
			"x": 1.8,
			"y": 3.8,
			"stroke": "currentColor",
			"rx": 2.2,
			"strokeWidth": 1.6
		}
	}]
};
const ShapeRoundRectIcon = forwardRef(function ShapeRoundRectIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-round-rect-icon",
		ref,
		icon: element
	}));
});
ShapeRoundRectIcon.displayName = "ShapeRoundRectIcon";
//#endregion
export { ShapeRoundRectIcon, ShapeRoundRectIcon as default };
