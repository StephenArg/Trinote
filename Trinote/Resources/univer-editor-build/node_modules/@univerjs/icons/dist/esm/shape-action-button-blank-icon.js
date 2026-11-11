import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-action-button-blank-icon.tsx
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
			"d": "M1.8 1.8H18.2V18.2H1.8z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeActionButtonBlankIcon = forwardRef(function ShapeActionButtonBlankIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-action-button-blank-icon",
		ref,
		icon: element
	}));
});
ShapeActionButtonBlankIcon.displayName = "ShapeActionButtonBlankIcon";
//#endregion
export { ShapeActionButtonBlankIcon, ShapeActionButtonBlankIcon as default };
