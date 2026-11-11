import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-trapezoid-icon.tsx
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
			"d": "M6.80225 2H13.1978L16.7534 18H3.24658L6.80225 2Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeTrapezoidIcon = forwardRef(function ShapeTrapezoidIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-trapezoid-icon",
		ref,
		icon: element
	}));
});
ShapeTrapezoidIcon.displayName = "ShapeTrapezoidIcon";
//#endregion
export { ShapeTrapezoidIcon, ShapeTrapezoidIcon as default };
