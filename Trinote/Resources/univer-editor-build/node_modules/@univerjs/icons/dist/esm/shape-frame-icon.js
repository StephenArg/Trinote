import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-frame-icon.tsx
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
			"stroke": "currentColor",
			"d": "M5.8 5.8H14.2V14.2H5.8z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFrameIcon = forwardRef(function ShapeFrameIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-frame-icon",
		ref,
		icon: element
	}));
});
ShapeFrameIcon.displayName = "ShapeFrameIcon";
//#endregion
export { ShapeFrameIcon, ShapeFrameIcon as default };
