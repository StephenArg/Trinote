import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/date-function-icon.tsx
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
			"tag": "rect",
			"attrs": {
				"width": 11.2,
				"height": 13.2,
				"x": 2.4,
				"y": 1.4,
				"stroke": "currentColor",
				"rx": 1.6,
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5 12H11",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 8,
				"cy": 7.1,
				"r": 2.65,
				"stroke": "currentColor",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8 5.5V7.35L9.25 8.2",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const DateFunctionIcon = forwardRef(function DateFunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "date-function-icon",
		ref,
		icon: element
	}));
});
DateFunctionIcon.displayName = "DateFunctionIcon";
//#endregion
export { DateFunctionIcon, DateFunctionIcon as default };
