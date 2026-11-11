import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-striped-right-arrow-icon.tsx
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
				"fill": "currentColor",
				"d": "M20 10.001L11 18.001L11 14L6 14L6 6L11 6L11 2.001ZM12.6 7.6L7.6 7.6L7.6 12.4L12.6 12.4L12.6 14.4366L17.5904 10.001L12.6 5.5642Z",
				"fillRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M3 6H4.6V14H3V6Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M0 6H1.6V14H0V6Z"
			}
		}
	]
};
const ShapeStripedRightArrowIcon = forwardRef(function ShapeStripedRightArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-striped-right-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeStripedRightArrowIcon.displayName = "ShapeStripedRightArrowIcon";
//#endregion
export { ShapeStripedRightArrowIcon, ShapeStripedRightArrowIcon as default };
