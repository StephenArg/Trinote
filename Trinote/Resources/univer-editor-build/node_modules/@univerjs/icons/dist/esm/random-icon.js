import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/random-icon.tsx
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
				"d": "M2.5 4.5H4.3C5.4 4.5 6.2 5.1 7 6.2L9.2 9.2C10 10.3 10.8 10.9 11.9 10.9H13.5",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M11.5 8.9L13.5 10.9L11.5 12.9",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2.5 10.9H4.3C5.4 10.9 6.2 10.3 7 9.2L9.2 6.2C10 5.1 10.8 4.5 11.9 4.5H13.5",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M11.5 2.5L13.5 4.5L11.5 6.5",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		}
	]
};
const RandomIcon = forwardRef(function RandomIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "random-icon",
		ref,
		icon: element
	}));
});
RandomIcon.displayName = "RandomIcon";
//#endregion
export { RandomIcon, RandomIcon as default };
