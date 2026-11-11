import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-chevron-icon.tsx
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
			"d": "M2.75 3H11.6L17.65 10L11.6 17H2.75L9.15 10L2.75 3Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeChevronIcon = forwardRef(function ShapeChevronIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-chevron-icon",
		ref,
		icon: element
	}));
});
ShapeChevronIcon.displayName = "ShapeChevronIcon";
//#endregion
export { ShapeChevronIcon, ShapeChevronIcon as default };
