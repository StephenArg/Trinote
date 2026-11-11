import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-round2-same-rect-icon.tsx
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
			"d": "M1.8 16.2V6C1.8 4.785 2.785 3.8 4 3.8H16C17.215 3.8 18.2 4.785 18.2 6V16.2H1.8Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeRound2SameRectIcon = forwardRef(function ShapeRound2SameRectIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-round2-same-rect-icon",
		ref,
		icon: element
	}));
});
ShapeRound2SameRectIcon.displayName = "ShapeRound2SameRectIcon";
//#endregion
export { ShapeRound2SameRectIcon, ShapeRound2SameRectIcon as default };
