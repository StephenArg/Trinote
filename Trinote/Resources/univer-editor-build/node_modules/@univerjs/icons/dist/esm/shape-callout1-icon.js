import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-callout1-icon.tsx
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
			"d": "M19.0001 4V15H6.00014V4H19.0001Z",
			"strokeDasharray": "4 3",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M1.00014 17L6.00014 9",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeCallout1Icon = forwardRef(function ShapeCallout1Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-callout1-icon",
		ref,
		icon: element
	}));
});
ShapeCallout1Icon.displayName = "ShapeCallout1Icon";
//#endregion
export { ShapeCallout1Icon, ShapeCallout1Icon as default };
