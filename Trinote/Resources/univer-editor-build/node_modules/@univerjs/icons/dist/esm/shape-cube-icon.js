import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-cube-icon.tsx
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
			"d": "M2 6.4L6.4 2H18V13.6L13.6 18H2V6.4Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M2 6.4H13.6V18M13.6 6.4L18 2M13.6 6.4V18",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeCubeIcon = forwardRef(function ShapeCubeIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-cube-icon",
		ref,
		icon: element
	}));
});
ShapeCubeIcon.displayName = "ShapeCubeIcon";
//#endregion
export { ShapeCubeIcon, ShapeCubeIcon as default };
