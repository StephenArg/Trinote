import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-action-button-home-icon.tsx
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
				"d": "M16.043 10.75C16.4884 10.75 16.7114 10.2115 16.3965 9.89652L10.1251 3.6251L3.85367 9.89653C3.53868 10.2115 3.76177 10.75 4.20722 10.75L16.043 10.75ZM6.8634 9.1495L10.1251 5.8878L13.3868 9.1495L6.8634 9.1495Z",
				"fillRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M5.2 9H6.8V14.2H9.2V12H10.8V14.2H13.2V9H14.8V15.8H5.2V9Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M13.8 4.5H12.2V8H13.8V4.5Z"
			}
		}
	]
};
const ShapeActionButtonHomeIcon = forwardRef(function ShapeActionButtonHomeIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-action-button-home-icon",
		ref,
		icon: element
	}));
});
ShapeActionButtonHomeIcon.displayName = "ShapeActionButtonHomeIcon";
//#endregion
export { ShapeActionButtonHomeIcon, ShapeActionButtonHomeIcon as default };
