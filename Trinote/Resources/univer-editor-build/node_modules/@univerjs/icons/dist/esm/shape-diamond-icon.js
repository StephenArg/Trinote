import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-diamond-icon.tsx
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
			"d": "M10 1.41406L18.4854 9.89949L10 18.3848L1.51465 9.89949L10 1.41406Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeDiamondIcon = forwardRef(function ShapeDiamondIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-diamond-icon",
		ref,
		icon: element
	}));
});
ShapeDiamondIcon.displayName = "ShapeDiamondIcon";
//#endregion
export { ShapeDiamondIcon, ShapeDiamondIcon as default };
