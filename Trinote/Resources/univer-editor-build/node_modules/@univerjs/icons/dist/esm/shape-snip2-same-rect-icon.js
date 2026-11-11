import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-snip2-same-rect-icon.tsx
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
			"d": "M2 8.5L6.4 4H13.6L18 8.5V16H2V8.5Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeSnip2SameRectIcon = forwardRef(function ShapeSnip2SameRectIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-snip2-same-rect-icon",
		ref,
		icon: element
	}));
});
ShapeSnip2SameRectIcon.displayName = "ShapeSnip2SameRectIcon";
//#endregion
export { ShapeSnip2SameRectIcon, ShapeSnip2SameRectIcon as default };
