import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/mind-map-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.19967 2.46667H4.93301C4.19663 2.46667 3.59967 3.06362 3.59967 3.8V6.06667C3.59967 6.80304 3.00272 7.4 2.26634 7.4C3.00272 7.4 3.59967 7.99695 3.59967 8.73333V12.2C3.59967 12.9364 4.19663 13.5333 4.93301 13.5333H5.19967",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.35
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.19967 3.73333H14.0663",
				"strokeLinecap": "round",
				"strokeWidth": 1.35
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.19967 8H13.3997",
				"strokeLinecap": "round",
				"strokeWidth": 1.35
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.19967 12.2667H14.0663",
				"strokeLinecap": "round",
				"strokeWidth": 1.35
			}
		}
	]
};
const MindMapIcon = forwardRef(function MindMapIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "mind-map-icon",
		ref,
		icon: element
	}));
});
MindMapIcon.displayName = "MindMapIcon";
//#endregion
export { MindMapIcon, MindMapIcon as default };
