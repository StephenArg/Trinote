import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-ribbon-icon.tsx
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
		"tag": "g",
		"attrs": {
			"fill": "currentColor",
			"clipPath": "url(#shape-ribbon-icon_clip0_2_47)"
		},
		"children": [
			{
				"tag": "path",
				"attrs": { "d": "M4.5 16.5V12V7H15.5V12V16.5H4.5ZM14 8.5H6V15H14V8.5Z" }
			},
			{
				"tag": "path",
				"attrs": { "d": "M4.5 8.5V6.5V4H9V8.5H6.5H4.5ZM7.5 5.5H6V7H7.5V5.5Z" }
			},
			{
				"tag": "path",
				"attrs": { "d": "M11 8.5V6.5V4H15.5V8.5H13H11ZM14 5.5H12.5V7H14V5.5Z" }
			},
			{
				"tag": "path",
				"attrs": { "d": "M3 9L0 4H6V14H0L3 9ZM4.5 5.5H2.5L4.5 8.5V5.5ZM4.5 9.5L2.5 12.5H4.5V9.5Z" }
			},
			{
				"tag": "path",
				"attrs": { "d": "M17 9L20 14L14 14L14 4L20 4L17 9ZM15.5 12.5L17.5 12.5L15.5 9.5L15.5 12.5ZM15.5 8.5L17.5 5.5L15.5 5.5L15.5 8.5Z" }
			}
		]
	}, {
		"tag": "defs",
		"attrs": {},
		"children": [{
			"tag": "clipPath",
			"attrs": { "id": "shape-ribbon-icon_clip0_2_47" },
			"children": [{
				"tag": "path",
				"attrs": {
					"fill": "white",
					"d": "M0 0H20V20H0z"
				}
			}]
		}]
	}],
	"defIds": ["shape-ribbon-icon_clip0_2_47"]
};
const ShapeRibbonIcon = forwardRef(function ShapeRibbonIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-ribbon-icon",
		ref,
		icon: element
	}));
});
ShapeRibbonIcon.displayName = "ShapeRibbonIcon";
//#endregion
export { ShapeRibbonIcon, ShapeRibbonIcon as default };
