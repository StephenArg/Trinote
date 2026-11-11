import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/grip-horizontal-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "circle",
			"attrs": {
				"cx": 5,
				"cy": 7,
				"r": 1.1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10,
				"cy": 7,
				"r": 1.1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 15,
				"cy": 7,
				"r": 1.1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 5,
				"cy": 13,
				"r": 1.1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10,
				"cy": 13,
				"r": 1.1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 15,
				"cy": 13,
				"r": 1.1,
				"fill": "currentColor"
			}
		}
	]
};
const GripHorizontalIcon = forwardRef(function GripHorizontalIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "grip-horizontal-icon",
		ref,
		icon: element
	}));
});
GripHorizontalIcon.displayName = "GripHorizontalIcon";
//#endregion
export { GripHorizontalIcon, GripHorizontalIcon as default };
