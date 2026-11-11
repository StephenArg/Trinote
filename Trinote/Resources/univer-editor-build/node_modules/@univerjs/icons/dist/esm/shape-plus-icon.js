import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-plus-icon.tsx
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
			"d": "M14 6H19V14H14V19H6V14H1V6H6V1H14V6ZM7.6 7.6H2.6V12.4H7.6V17.4H12.4V12.4H17.4V7.6H12.4V2.6H7.6V7.6Z"
		}
	}]
};
const ShapePlusIcon = forwardRef(function ShapePlusIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-plus-icon",
		ref,
		icon: element
	}));
});
ShapePlusIcon.displayName = "ShapePlusIcon";
//#endregion
export { ShapePlusIcon, ShapePlusIcon as default };
