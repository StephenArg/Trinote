import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-left-brace-icon.tsx
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
			"d": "M12 2C10.2 2 9.4 2.75 9.4 4.6V7.3C9.4 8.55 8.85 9.35 7.6 9.9C8.85 10.45 9.4 11.25 9.4 12.5V15.4C9.4 17.25 10.2 18 12 18",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeLeftBraceIcon = forwardRef(function ShapeLeftBraceIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-left-brace-icon",
		ref,
		icon: element
	}));
});
ShapeLeftBraceIcon.displayName = "ShapeLeftBraceIcon";
//#endregion
export { ShapeLeftBraceIcon, ShapeLeftBraceIcon as default };
