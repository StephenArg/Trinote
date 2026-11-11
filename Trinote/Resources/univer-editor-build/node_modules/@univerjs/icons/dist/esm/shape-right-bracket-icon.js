import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-right-bracket-icon.tsx
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
			"d": "M8 3H12V17H8",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeRightBracketIcon = forwardRef(function ShapeRightBracketIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-right-bracket-icon",
		ref,
		icon: element
	}));
});
ShapeRightBracketIcon.displayName = "ShapeRightBracketIcon";
//#endregion
export { ShapeRightBracketIcon, ShapeRightBracketIcon as default };
