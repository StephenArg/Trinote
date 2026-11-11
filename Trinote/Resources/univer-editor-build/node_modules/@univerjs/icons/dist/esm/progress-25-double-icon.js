import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/progress-25-double-icon.tsx
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
				"d": "M8 1.5C11.5899 1.5 14.5 4.41015 14.5 8H8V1.5Z"
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
const Progress25DoubleIcon = forwardRef(function Progress25DoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "progress-25-double-icon",
		ref,
		icon: element
	}));
});
Progress25DoubleIcon.displayName = "Progress25DoubleIcon";
//#endregion
export { Progress25DoubleIcon, Progress25DoubleIcon as default };
