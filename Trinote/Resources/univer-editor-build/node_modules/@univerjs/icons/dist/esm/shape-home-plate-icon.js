import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-home-plate-icon.tsx
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
			"d": "M2 3H10.6L18.5 10L10.6 17H2V3Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeHomePlateIcon = forwardRef(function ShapeHomePlateIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-home-plate-icon",
		ref,
		icon: element
	}));
});
ShapeHomePlateIcon.displayName = "ShapeHomePlateIcon";
//#endregion
export { ShapeHomePlateIcon, ShapeHomePlateIcon as default };
