import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-action-button-end-icon.tsx
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
				"d": "M9.0001 15.5001L9 4.5L15.5 10.5ZM10.5998 8.1535L10.5998 12.2493L13.0201 10.3876Z",
				"fillRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M5.7 4.5H7.3V15.5H5.7V4.5Z"
			}
		}
	]
};
const ShapeActionButtonEndIcon = forwardRef(function ShapeActionButtonEndIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-action-button-end-icon",
		ref,
		icon: element
	}));
});
ShapeActionButtonEndIcon.displayName = "ShapeActionButtonEndIcon";
//#endregion
export { ShapeActionButtonEndIcon, ShapeActionButtonEndIcon as default };
