import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/callout-icon.tsx
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
				"width": 11.4,
				"height": 6.6,
				"x": 2.3,
				"y": 3.2,
				"stroke": "currentColor",
				"rx": .9,
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.9 12H11.1",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.3 14H9.7",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		}
	]
};
const CalloutIcon = forwardRef(function CalloutIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "callout-icon",
		ref,
		icon: element
	}));
});
CalloutIcon.displayName = "CalloutIcon";
//#endregion
export { CalloutIcon, CalloutIcon as default };
