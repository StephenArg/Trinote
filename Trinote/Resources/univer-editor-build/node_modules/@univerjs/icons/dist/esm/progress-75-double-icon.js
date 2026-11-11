import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/progress-75-double-icon.tsx
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
			"tag": "circle",
			"attrs": {
				"cx": 8,
				"cy": 8,
				"r": 6.5,
				"fill": "colorChannel1"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8H8V1.5Z"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 8,
				"cy": 8,
				"r": 6.5,
				"stroke": "currentColor",
				"strokeWidth": .75
			}
		}
	]
};
const Progress75DoubleIcon = forwardRef(function Progress75DoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "progress-75-double-icon",
		ref,
		icon: element
	}));
});
Progress75DoubleIcon.displayName = "Progress75DoubleIcon";
//#endregion
export { Progress75DoubleIcon, Progress75DoubleIcon as default };
