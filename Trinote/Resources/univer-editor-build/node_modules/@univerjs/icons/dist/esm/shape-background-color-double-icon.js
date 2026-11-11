import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-background-color-double-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "circle",
		"attrs": {
			"cx": 8,
			"cy": 8,
			"r": 5.4,
			"fill": "colorChannel1",
			"stroke": "currentColor",
			"strokeWidth": 1.2
		}
	}]
};
const ShapeBackgroundColorDoubleIcon = forwardRef(function ShapeBackgroundColorDoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-background-color-double-icon",
		ref,
		icon: element
	}));
});
ShapeBackgroundColorDoubleIcon.displayName = "ShapeBackgroundColorDoubleIcon";
//#endregion
export { ShapeBackgroundColorDoubleIcon, ShapeBackgroundColorDoubleIcon as default };
