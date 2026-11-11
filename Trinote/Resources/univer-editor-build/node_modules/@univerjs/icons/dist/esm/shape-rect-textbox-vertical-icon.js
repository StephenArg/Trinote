import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-rect-textbox-vertical-icon.tsx
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
				"d": "M6.5 6.97823C6.5 7.29621 6.69236 7.58258 6.98673 7.70283L8.38 8.272V11.752L6.9659 12.3477C6.68357 12.4667 6.5 12.7432 6.5 13.0496C6.5 13.5855 7.03894 13.9538 7.53828 13.7591L13.5175 11.4272C14.11 11.1961 14.5 10.6253 14.5 9.98948C14.5 9.35214 14.1082 8.78037 13.5138 8.55034L7.56524 6.24825C7.05231 6.04974 6.5 6.42823 6.5 6.97823ZM9.7 11.284V8.74L13.096 9.928V10.072L9.7 11.284Z"
			}
		}
	]
};
const ShapeRectTextboxVerticalIcon = forwardRef(function ShapeRectTextboxVerticalIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-rect-textbox-vertical-icon",
		ref,
		icon: element
	}));
});
ShapeRectTextboxVerticalIcon.displayName = "ShapeRectTextboxVerticalIcon";
//#endregion
export { ShapeRectTextboxVerticalIcon, ShapeRectTextboxVerticalIcon as default };
