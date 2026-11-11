import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/date-picker-icon.tsx
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
				"width": 13,
				"height": 12,
				"x": 1.5,
				"y": 2.5,
				"stroke": "currentColor",
				"rx": 1.5,
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.5 6.5H14.5M5 1.5V4M11 1.5V4",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.5 9H6M8 9H9.5M11.5 9H12M4.5 12H6M8 12H9.5",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const DatePickerIcon = forwardRef(function DatePickerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "date-picker-icon",
		ref,
		icon: element
	}));
});
DatePickerIcon.displayName = "DatePickerIcon";
//#endregion
export { DatePickerIcon, DatePickerIcon as default };
