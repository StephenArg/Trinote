import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-ribbon2-icon.tsx
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
			"clipPath": "url(#shape-ribbon2-icon_clip0_2_47)"
		},
		"children": [
			{
				"tag": "path",
				"attrs": { "d": "M15.5 3.5L15.5 8L15.5 13L4.5 13L4.5 8L4.5 3.5L15.5 3.5ZM6 11.5L14 11.5L14 5L6 5L6 11.5Z" }
			},
			{
				"tag": "path",
				"attrs": { "d": "M15.5 11.5L15.5 13.5L15.5 16L11 16L11 11.5L13.5 11.5L15.5 11.5ZM12.5 14.5L14 14.5L14 13L12.5 13L12.5 14.5Z" }
			},
			{
				"tag": "path",
				"attrs": { "d": "M9 11.5L9 13.5L9 16L4.5 16L4.5 11.5L7 11.5L9 11.5ZM6 14.5L7.5 14.5L7.5 13L6 13L6 14.5Z" }
			},
			{
				"tag": "path",
				"attrs": { "d": "M17 11L20 16L14 16L14 6L20 6L17 11ZM15.5 14.5L17.5 14.5L15.5 11.5L15.5 14.5ZM15.5 10.5L17.5 7.5L15.5 7.5L15.5 10.5Z" }
			},
			{
				"tag": "path",
				"attrs": { "d": "M3 11L0 6L6 6L6 16L-1.74846e-06 16L3 11ZM4.5 7.5L2.5 7.5L4.5 10.5L4.5 7.5ZM4.5 11.5L2.5 14.5L4.5 14.5L4.5 11.5Z" }
			}
		]
	}, {
		"tag": "defs",
		"attrs": {},
		"children": [{
			"tag": "clipPath",
			"attrs": { "id": "shape-ribbon2-icon_clip0_2_47" },
			"children": [{
				"tag": "path",
				"attrs": {
					"fill": "white",
					"d": "M0 0H20V20H0z",
					"transform": "matrix(-1 0 0 -1 20 20)"
				}
			}]
		}]
	}],
	"defIds": ["shape-ribbon2-icon_clip0_2_47"]
};
const ShapeRibbon2Icon = forwardRef(function ShapeRibbon2Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-ribbon2-icon",
		ref,
		icon: element
	}));
});
ShapeRibbon2Icon.displayName = "ShapeRibbon2Icon";
//#endregion
export { ShapeRibbon2Icon, ShapeRibbon2Icon as default };
