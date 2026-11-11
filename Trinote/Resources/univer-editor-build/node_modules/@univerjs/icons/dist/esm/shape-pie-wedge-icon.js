import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-pie-wedge-icon.tsx
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
			"fill": "currentColor",
			"d": "M18 18H1C1 8.6112 8.6112 1 18 1V18ZM16.4 2.6833A15.4 15.4 0 0 0 2.6833 16.4H16.4V2.6833Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapePieWedgeIcon = forwardRef(function ShapePieWedgeIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-pie-wedge-icon",
		ref,
		icon: element
	}));
});
ShapePieWedgeIcon.displayName = "ShapePieWedgeIcon";
//#endregion
export { ShapePieWedgeIcon, ShapePieWedgeIcon as default };
