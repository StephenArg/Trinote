import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-action-button-beginning-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.8 1.8H18.2V18.2H1.8z",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M10.9999 15.6341L11 4.6339L4.5 10.634ZM9.4002 8.2875L9.4002 12.3833L6.9799 10.5216Z",
				"fillRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M14.3 4.5H12.7V15.5H14.3V4.5Z"
			}
		}
	]
};
const ShapeActionButtonBeginningIcon = forwardRef(function ShapeActionButtonBeginningIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-action-button-beginning-icon",
		ref,
		icon: element
	}));
});
ShapeActionButtonBeginningIcon.displayName = "ShapeActionButtonBeginningIcon";
//#endregion
export { ShapeActionButtonBeginningIcon, ShapeActionButtonBeginningIcon as default };
