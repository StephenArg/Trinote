import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-plaque-icon.tsx
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
			"d": "M13.2 1.8C13.2 4.562 15.438 6.8 18.2 6.8V13.2C15.438 13.2 13.2 15.438 13.2 18.2H6.8C6.8 15.438 4.562 13.2 1.8 13.2V6.8C4.562 6.8 6.8 4.562 6.8 1.8H13.2Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapePlaqueIcon = forwardRef(function ShapePlaqueIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-plaque-icon",
		ref,
		icon: element
	}));
});
ShapePlaqueIcon.displayName = "ShapePlaqueIcon";
//#endregion
export { ShapePlaqueIcon, ShapePlaqueIcon as default };
