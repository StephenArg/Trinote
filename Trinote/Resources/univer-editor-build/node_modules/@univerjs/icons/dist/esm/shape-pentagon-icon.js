import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-pentagon-icon.tsx
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
			"d": "M10 3.23584L17.3838 8.60059L14.5635 17.2812H5.43652L2.61572 8.60059L10 3.23584Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapePentagonIcon = forwardRef(function ShapePentagonIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-pentagon-icon",
		ref,
		icon: element
	}));
});
ShapePentagonIcon.displayName = "ShapePentagonIcon";
//#endregion
export { ShapePentagonIcon, ShapePentagonIcon as default };
