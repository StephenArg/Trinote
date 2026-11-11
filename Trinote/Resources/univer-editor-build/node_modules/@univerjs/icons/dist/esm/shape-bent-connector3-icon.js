import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-bent-connector3-icon.tsx
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
			"d": "M4 4H10V16H16",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeBentConnector3Icon = forwardRef(function ShapeBentConnector3Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-bent-connector3-icon",
		ref,
		icon: element
	}));
});
ShapeBentConnector3Icon.displayName = "ShapeBentConnector3Icon";
//#endregion
export { ShapeBentConnector3Icon, ShapeBentConnector3Icon as default };
