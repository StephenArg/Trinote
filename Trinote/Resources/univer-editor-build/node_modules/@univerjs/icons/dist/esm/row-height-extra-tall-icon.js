import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/row-height-extra-tall-icon.tsx
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
				"height": 11.6,
				"x": 1.5,
				"y": 4.2,
				"fill": "currentColor",
				"rx": 1.8
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
const RowHeightExtraTallIcon = forwardRef(function RowHeightExtraTallIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "row-height-extra-tall-icon",
		ref,
		icon: element
	}));
});
RowHeightExtraTallIcon.displayName = "RowHeightExtraTallIcon";
//#endregion
export { RowHeightExtraTallIcon, RowHeightExtraTallIcon as default };
