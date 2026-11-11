import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-arc-icon.tsx
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
			"d": "M2 3C6.95 3 10.75 4.45 13.45 7.2C16.05 9.85 17.4 12.55 18 17",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeArcIcon = forwardRef(function ShapeArcIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-arc-icon",
		ref,
		icon: element
	}));
});
ShapeArcIcon.displayName = "ShapeArcIcon";
//#endregion
export { ShapeArcIcon, ShapeArcIcon as default };
