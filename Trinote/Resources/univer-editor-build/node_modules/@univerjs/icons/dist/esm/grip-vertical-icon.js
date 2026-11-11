import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/grip-vertical-icon.tsx
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
				"cx": 7,
				"cy": 5,
				"r": 1.1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 13,
				"cy": 5,
				"r": 1.1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 7,
				"cy": 10,
				"r": 1.1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 13,
				"cy": 10,
				"r": 1.1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 7,
				"cy": 15,
				"r": 1.1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 13,
				"cy": 15,
				"r": 1.1,
				"fill": "currentColor"
			}
		}
	]
};
const GripVerticalIcon = forwardRef(function GripVerticalIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "grip-vertical-icon",
		ref,
		icon: element
	}));
});
GripVerticalIcon.displayName = "GripVerticalIcon";
//#endregion
export { GripVerticalIcon, GripVerticalIcon as default };
