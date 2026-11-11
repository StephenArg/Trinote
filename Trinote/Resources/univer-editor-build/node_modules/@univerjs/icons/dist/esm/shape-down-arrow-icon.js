import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-down-arrow-icon.tsx
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
		"tag": "clipPath",
		"attrs": { "id": "shape-down-arrow-icon-clip" },
		"children": [{
			"tag": "path",
			"attrs": { "d": "M10 19.001L2 10.001H6.00098V1.00098L14.001 1.00098V10.001H18L10 19.001Z" }
		}]
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M10 19.001L2 10.001H6.00098V1.00098L14.001 1.00098V10.001H18L10 19.001Z",
			"strokeWidth": 3.2,
			"clipPath": "url(#shape-down-arrow-icon-clip)"
		}
	}]
};
const ShapeDownArrowIcon = forwardRef(function ShapeDownArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-down-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeDownArrowIcon.displayName = "ShapeDownArrowIcon";
//#endregion
export { ShapeDownArrowIcon, ShapeDownArrowIcon as default };
