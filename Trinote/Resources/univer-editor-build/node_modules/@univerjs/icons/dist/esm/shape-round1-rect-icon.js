import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-round1-rect-icon.tsx
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
			"d": "M1.8 16.2V3.8H16C17.215 3.8 18.2 4.785 18.2 6V16.2H1.8Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeRound1RectIcon = forwardRef(function ShapeRound1RectIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-round1-rect-icon",
		ref,
		icon: element
	}));
});
ShapeRound1RectIcon.displayName = "ShapeRound1RectIcon";
//#endregion
export { ShapeRound1RectIcon, ShapeRound1RectIcon as default };
