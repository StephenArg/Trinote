import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/print-icon.tsx
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
				"d": "M4 5.6V3.2C4 2.53726 4.53726 2 5.2 2H10.8C11.4627 2 12 2.53726 12 3.2V5.6",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.8 13.8H3.2C2.53726 13.8 2 13.2627 2 12.6V7.2C2 6.53726 2.53726 6 3.2 6H12.8C13.4627 6 14 6.53726 14 7.2V12.6C14 13.2627 13.4627 13.8 12.8 13.8H11.2",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.2 8.6H5.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 6,
				"height": 3.6,
				"x": 5.2,
				"y": 10.4,
				"stroke": "currentColor",
				"rx": .6,
				"strokeWidth": 1.2
			}
		}
	]
};
const PrintIcon = forwardRef(function PrintIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "print-icon",
		ref,
		icon: element
	}));
});
PrintIcon.displayName = "PrintIcon";
//#endregion
export { PrintIcon, PrintIcon as default };
