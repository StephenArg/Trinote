import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-curved-connector3-icon.tsx
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
			"d": "M5.75 4C12.5 4 15 5.1 15 7.2C15 9.7 11.3 9.6 7.1 10.95C5.5 11.45 5 12.25 5 12.9C5 15.1 8 16 15 16",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeCurvedConnector3Icon = forwardRef(function ShapeCurvedConnector3Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-curved-connector3-icon",
		ref,
		icon: element
	}));
});
ShapeCurvedConnector3Icon.displayName = "ShapeCurvedConnector3Icon";
//#endregion
export { ShapeCurvedConnector3Icon, ShapeCurvedConnector3Icon as default };
