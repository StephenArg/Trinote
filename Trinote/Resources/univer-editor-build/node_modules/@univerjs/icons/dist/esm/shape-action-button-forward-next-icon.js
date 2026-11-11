import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-action-button-forward-next-icon.tsx
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
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M6.0001 15.3138L6.0001 3.9999L15 10ZM7.5999 6.9883L7.5999 12.5106L11.9926 9.917Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeActionButtonForwardNextIcon = forwardRef(function ShapeActionButtonForwardNextIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-action-button-forward-next-icon",
		ref,
		icon: element
	}));
});
ShapeActionButtonForwardNextIcon.displayName = "ShapeActionButtonForwardNextIcon";
//#endregion
export { ShapeActionButtonForwardNextIcon, ShapeActionButtonForwardNextIcon as default };
