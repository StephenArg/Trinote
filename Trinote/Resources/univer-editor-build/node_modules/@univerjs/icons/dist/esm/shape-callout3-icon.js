import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-callout3-icon.tsx
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
			"d": "M19 4V15H6V4H19Z",
			"strokeDasharray": "4 3",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M6 18.5L1 15V9H6",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeCallout3Icon = forwardRef(function ShapeCallout3Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-callout3-icon",
		ref,
		icon: element
	}));
});
ShapeCallout3Icon.displayName = "ShapeCallout3Icon";
//#endregion
export { ShapeCallout3Icon, ShapeCallout3Icon as default };
