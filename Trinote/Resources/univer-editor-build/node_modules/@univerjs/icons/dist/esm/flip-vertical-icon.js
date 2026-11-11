import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/flip-vertical-icon.tsx
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
				"d": "M3.3 2.6L8 6.2L12.7 2.6H3.3Z",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M3.3 13.4L8 9.8L12.7 13.4H3.3Z",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2.2 8H3.8",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.2 8H7.8",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10.2 8H11.8",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M14 8H14.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const FlipVerticalIcon = forwardRef(function FlipVerticalIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "flip-vertical-icon",
		ref,
		icon: element
	}));
});
FlipVerticalIcon.displayName = "FlipVerticalIcon";
//#endregion
export { FlipVerticalIcon, FlipVerticalIcon as default };
