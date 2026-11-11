import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-snip-round-rect-icon.tsx
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
			"d": "M2 16V6.2C2 4.985 2.985 4 4.2 4H13.6L18 8V16H2Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeSnipRoundRectIcon = forwardRef(function ShapeSnipRoundRectIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-snip-round-rect-icon",
		ref,
		icon: element
	}));
});
ShapeSnipRoundRectIcon.displayName = "ShapeSnipRoundRectIcon";
//#endregion
export { ShapeSnipRoundRectIcon, ShapeSnipRoundRectIcon as default };
