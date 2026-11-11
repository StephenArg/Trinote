import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-line-inv-icon.tsx
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
			"d": "M16.5 3.5L3.5 16.5",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeLineInvIcon = forwardRef(function ShapeLineInvIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-line-inv-icon",
		ref,
		icon: element
	}));
});
ShapeLineInvIcon.displayName = "ShapeLineInvIcon";
//#endregion
export { ShapeLineInvIcon, ShapeLineInvIcon as default };
