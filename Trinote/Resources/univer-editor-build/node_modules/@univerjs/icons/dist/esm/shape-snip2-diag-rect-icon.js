import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-snip2-diag-rect-icon.tsx
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
			"d": "M2 4H13.6L18 8V16H6.4L2 12.5V4Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeSnip2DiagRectIcon = forwardRef(function ShapeSnip2DiagRectIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-snip2-diag-rect-icon",
		ref,
		icon: element
	}));
});
ShapeSnip2DiagRectIcon.displayName = "ShapeSnip2DiagRectIcon";
//#endregion
export { ShapeSnip2DiagRectIcon, ShapeSnip2DiagRectIcon as default };
