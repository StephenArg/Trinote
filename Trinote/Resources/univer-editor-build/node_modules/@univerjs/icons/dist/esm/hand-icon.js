import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/hand-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 24 24",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M18 11V6C18 4.89543 17.1046 4 16 4C14.8954 4 14 4.89543 14 6",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 2.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M14 10V4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4V6",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 2.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10 10.5V6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6V14",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 2.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M18 8C18 6.89543 18.8954 6 20 6C21.1046 6 22 6.89543 22 8V14C22 18.4183 18.4183 22 14 22H12C9.2 22 7.5 21.14 6.01 19.66L2.41 16.06C1.62947 15.2795 1.62947 14.0145 2.41 13.234C3.19053 12.4535 4.45547 12.4535 5.236 13.234L7 15",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 2.2
			}
		}
	]
};
const HandIcon = forwardRef(function HandIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "hand-icon",
		ref,
		icon: element
	}));
});
HandIcon.displayName = "HandIcon";
//#endregion
export { HandIcon, HandIcon as default };
