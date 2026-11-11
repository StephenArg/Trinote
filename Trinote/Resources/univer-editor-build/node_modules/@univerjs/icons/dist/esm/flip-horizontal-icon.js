import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/flip-horizontal-icon.tsx
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
				"d": "M2.6 3.3L6.2 8L2.6 12.7V3.3Z",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M13.4 3.3L9.8 8L13.4 12.7V3.3Z",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8 2.2V3.8",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8 6.2V7.8",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8 10.2V11.8",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8 14V14.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const FlipHorizontalIcon = forwardRef(function FlipHorizontalIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "flip-horizontal-icon",
		ref,
		icon: element
	}));
});
FlipHorizontalIcon.displayName = "FlipHorizontalIcon";
//#endregion
export { FlipHorizontalIcon, FlipHorizontalIcon as default };
