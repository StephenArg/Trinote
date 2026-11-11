import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-corner-icon.tsx
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
			"d": "M9.2 1.8H1.8V18.2H18.2V10.8H9.2V1.8Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeCornerIcon = forwardRef(function ShapeCornerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-corner-icon",
		ref,
		icon: element
	}));
});
ShapeCornerIcon.displayName = "ShapeCornerIcon";
//#endregion
export { ShapeCornerIcon, ShapeCornerIcon as default };
