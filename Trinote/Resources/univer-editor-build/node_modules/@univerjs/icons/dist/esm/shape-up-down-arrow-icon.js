import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-up-down-arrow-icon.tsx
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
			"d": "M10 20L3 12.5L6.9688 12.5L6.9688 7.5L3 7.5L10 0L17 7.5L13.0312 7.5L13.0312 12.5L17 12.5ZM11.4312 14.1L11.4312 5.9L13.3187 5.9L9.9999 2.3433L6.6824 5.9L8.5687 5.9L8.5687 14.1L6.6822 14.1L9.9999 17.6555L13.319 14.1Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeUpDownArrowIcon = forwardRef(function ShapeUpDownArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-up-down-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeUpDownArrowIcon.displayName = "ShapeUpDownArrowIcon";
//#endregion
export { ShapeUpDownArrowIcon, ShapeUpDownArrowIcon as default };
