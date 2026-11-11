import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-up-arrow-icon.tsx
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
			"fill": "currentColor",
			"d": "M10 1.00098L2 10.001H6.00098V19.001H14.001V10.001H18L10 1.00098ZM10 3.401L14.4458 8.401H12.401V17.401H7.60098V8.401H5.55518L10 3.401Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeUpArrowIcon = forwardRef(function ShapeUpArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-up-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeUpArrowIcon.displayName = "ShapeUpArrowIcon";
//#endregion
export { ShapeUpArrowIcon, ShapeUpArrowIcon as default };
