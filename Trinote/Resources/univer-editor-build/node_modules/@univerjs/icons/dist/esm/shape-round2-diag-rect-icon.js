import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-round2-diag-rect-icon.tsx
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
			"d": "M1.8 3.8H16C17.215 3.8 18.2 4.785 18.2 6V16.2H4C2.785 16.2 1.8 15.215 1.8 14V3.8Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeRound2DiagRectIcon = forwardRef(function ShapeRound2DiagRectIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-round2-diag-rect-icon",
		ref,
		icon: element
	}));
});
ShapeRound2DiagRectIcon.displayName = "ShapeRound2DiagRectIcon";
//#endregion
export { ShapeRound2DiagRectIcon, ShapeRound2DiagRectIcon as default };
