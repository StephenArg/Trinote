import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/lookup-function-icon.tsx
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
				"cx": 7.35,
				"cy": 6.8,
				"r": 2.25,
				"stroke": "currentColor",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M9 8.45L10.65 10.1",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const LookupFunctionIcon = forwardRef(function LookupFunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "lookup-function-icon",
		ref,
		icon: element
	}));
});
LookupFunctionIcon.displayName = "LookupFunctionIcon";
//#endregion
export { LookupFunctionIcon, LookupFunctionIcon as default };
