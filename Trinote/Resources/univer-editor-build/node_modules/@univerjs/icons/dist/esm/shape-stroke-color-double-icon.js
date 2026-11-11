import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-stroke-color-double-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "circle",
		"attrs": {
			"cx": 8,
			"cy": 8,
			"r": 5.1,
			"fill": "none",
			"stroke": "colorChannel1",
			"strokeWidth": 1.8
		}
	}]
};
const ShapeStrokeColorDoubleIcon = forwardRef(function ShapeStrokeColorDoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-stroke-color-double-icon",
		ref,
		icon: element
	}));
});
ShapeStrokeColorDoubleIcon.displayName = "ShapeStrokeColorDoubleIcon";
//#endregion
export { ShapeStrokeColorDoubleIcon, ShapeStrokeColorDoubleIcon as default };
