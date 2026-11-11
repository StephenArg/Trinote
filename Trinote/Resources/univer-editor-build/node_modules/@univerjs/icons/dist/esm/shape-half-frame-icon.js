import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-half-frame-icon.tsx
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
			"d": "M1.8 18.2V1.8H18.2L12.6 7.4H7.4V12.6L1.8 18.2Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M5.8 14.2V5.8H14.2",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeHalfFrameIcon = forwardRef(function ShapeHalfFrameIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-half-frame-icon",
		ref,
		icon: element
	}));
});
ShapeHalfFrameIcon.displayName = "ShapeHalfFrameIcon";
//#endregion
export { ShapeHalfFrameIcon, ShapeHalfFrameIcon as default };
