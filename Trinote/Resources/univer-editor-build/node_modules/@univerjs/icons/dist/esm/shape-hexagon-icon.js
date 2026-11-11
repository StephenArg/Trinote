import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-hexagon-icon.tsx
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
			"d": "M13.9229 3.20605L17.8452 10L13.9229 16.7939H6.07764L2.15527 10L6.07764 3.20605H13.9229Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeHexagonIcon = forwardRef(function ShapeHexagonIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-hexagon-icon",
		ref,
		icon: element
	}));
});
ShapeHexagonIcon.displayName = "ShapeHexagonIcon";
//#endregion
export { ShapeHexagonIcon, ShapeHexagonIcon as default };
