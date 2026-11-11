import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-left-bracket-icon.tsx
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
			"d": "M12 3H8V17H12",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeLeftBracketIcon = forwardRef(function ShapeLeftBracketIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-left-bracket-icon",
		ref,
		icon: element
	}));
});
ShapeLeftBracketIcon.displayName = "ShapeLeftBracketIcon";
//#endregion
export { ShapeLeftBracketIcon, ShapeLeftBracketIcon as default };
