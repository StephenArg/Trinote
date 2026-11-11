import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-snip1-rect-icon.tsx
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
			"d": "M2 16V4H13.6L18 8V16H2Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeSnip1RectIcon = forwardRef(function ShapeSnip1RectIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-snip1-rect-icon",
		ref,
		icon: element
	}));
});
ShapeSnip1RectIcon.displayName = "ShapeSnip1RectIcon";
//#endregion
export { ShapeSnip1RectIcon, ShapeSnip1RectIcon as default };
