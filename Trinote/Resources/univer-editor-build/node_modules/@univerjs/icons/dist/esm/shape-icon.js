import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-icon.tsx
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
			"d": "M14.35 5.3V4A2.35 2.35 0 0 0 12 1.65H4A2.35 2.35 0 0 0 1.65 4V12A2.35 2.35 0 0 0 4 14.35H5.3",
			"strokeLinecap": "round",
			"strokeWidth": 1.3
		}
	}, {
		"tag": "circle",
		"attrs": {
			"cx": 12.5,
			"cy": 12.5,
			"r": 5.85,
			"stroke": "currentColor",
			"strokeWidth": 1.3
		}
	}]
};
const ShapeIcon = forwardRef(function ShapeIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-icon",
		ref,
		icon: element
	}));
});
ShapeIcon.displayName = "ShapeIcon";
//#endregion
export { ShapeIcon, ShapeIcon as default };
