import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/signal-75-double-icon.tsx
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
				"width": 1.8,
				"height": 3,
				"x": 1.6,
				"y": 11,
				"fill": "currentColor",
				"rx": .65
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 1.8,
				"height": 6,
				"x": 5.6,
				"y": 8,
				"fill": "currentColor",
				"rx": .65
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 1.8,
				"height": 9,
				"x": 9.6,
				"y": 5,
				"fill": "currentColor",
				"rx": .65
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 1.8,
				"height": 12,
				"x": 13.6,
				"y": 2,
				"fill": "colorChannel1",
				"rx": .65
			}
		}
	]
};
const Signal75DoubleIcon = forwardRef(function Signal75DoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "signal-75-double-icon",
		ref,
		icon: element
	}));
});
Signal75DoubleIcon.displayName = "Signal75DoubleIcon";
//#endregion
export { Signal75DoubleIcon, Signal75DoubleIcon as default };
