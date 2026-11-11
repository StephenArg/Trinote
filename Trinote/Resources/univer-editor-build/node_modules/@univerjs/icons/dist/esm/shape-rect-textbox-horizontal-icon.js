import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-rect-textbox-horizontal-icon.tsx
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
				"d": "M2.8 4.8H17.2V15.2H2.8z",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "white",
				"stroke": "currentColor",
				"d": "M1.5 3.5H4.5V6.5H1.5z",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "white",
				"stroke": "currentColor",
				"d": "M15.5 3.5H18.5V6.5H15.5z",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "white",
				"stroke": "currentColor",
				"d": "M15.5 13.5H18.5V16.5H15.5z",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "white",
				"stroke": "currentColor",
				"d": "M1.5 13.5H4.5V16.5H1.5z",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M13.1858 14C12.8678 14 12.5814 13.8076 12.4612 13.5133L11.892 12.12H8.412L7.81627 13.5341C7.69734 13.8164 7.4208 14 7.11444 14C6.57847 14 6.21019 13.4611 6.40493 12.9617L8.73684 6.98245C8.96788 6.39004 9.53865 6 10.1745 6C10.8119 6 11.3836 6.39182 11.6137 6.9862L13.9158 12.9348C14.1143 13.4477 13.7358 14 13.1858 14ZM8.88 10.8H11.424L10.236 7.404H10.092L8.88 10.8Z"
			}
		}
	]
};
const ShapeRectTextboxHorizontalIcon = forwardRef(function ShapeRectTextboxHorizontalIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-rect-textbox-horizontal-icon",
		ref,
		icon: element
	}));
});
ShapeRectTextboxHorizontalIcon.displayName = "ShapeRectTextboxHorizontalIcon";
//#endregion
export { ShapeRectTextboxHorizontalIcon, ShapeRectTextboxHorizontalIcon as default };
