import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/column-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 17 17",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "rect",
			"attrs": {
				"width": 12.52,
				"height": 4,
				"x": 2.63,
				"y": 2.89,
				"stroke": "currentColor",
				"rx": 1.1,
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.80825 2.89202V6.89199M10.9821 2.89202V6.89199",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 4,
				"height": 4,
				"x": 2.63,
				"y": 9.8,
				"stroke": "currentColor",
				"rx": 1.1,
				"strokeWidth": 1.2
			}
		}
	]
};
const ColumnIcon = forwardRef(function ColumnIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "column-icon",
		ref,
		icon: element
	}));
});
ColumnIcon.displayName = "ColumnIcon";
//#endregion
export { ColumnIcon, ColumnIcon as default };
