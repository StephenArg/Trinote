import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-line-icon.tsx
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
			"d": "M3.5 3.5L16.5 16.5",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeLineIcon = forwardRef(function ShapeLineIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-line-icon",
		ref,
		icon: element
	}));
});
ShapeLineIcon.displayName = "ShapeLineIcon";
//#endregion
export { ShapeLineIcon, ShapeLineIcon as default };
