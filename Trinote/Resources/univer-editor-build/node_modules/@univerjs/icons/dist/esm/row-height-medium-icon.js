import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/row-height-medium-icon.tsx
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
			"tag": "rect",
			"attrs": {
				"width": 8.3,
				"height": 2.2,
				"x": 1.5,
				"y": 5,
				"fill": "currentColor",
				"rx": 1.1
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 8.3,
				"height": 2.2,
				"x": 1.5,
				"y": 13,
				"fill": "currentColor",
				"rx": 1.1
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M14.2 4.2v11.6",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "m12 6.5 2.2-2.3 2.2 2.3",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "m12 13.5 2.2 2.3 2.2-2.3",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const RowHeightMediumIcon = forwardRef(function RowHeightMediumIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "row-height-medium-icon",
		ref,
		icon: element
	}));
});
RowHeightMediumIcon.displayName = "RowHeightMediumIcon";
//#endregion
export { RowHeightMediumIcon, RowHeightMediumIcon as default };
