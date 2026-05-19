import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/smile-double-icon.tsx
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
				"r": 6.4,
				"fill": "colorChannel1",
				"stroke": "currentColor",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 5.75,
				"cy": 6.3,
				"r": .75,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10.25,
				"cy": 6.3,
				"r": .75,
				"fill": "currentColor"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5 9.3C5.65 10.65 6.65 11.35 8 11.35C9.35 11.35 10.35 10.65 11 9.3",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const SmileDoubleIcon = forwardRef(function SmileDoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "smile-double-icon",
		ref,
		icon: element
	}));
});
SmileDoubleIcon.displayName = "SmileDoubleIcon";
//#endregion
export { SmileDoubleIcon, SmileDoubleIcon as default };
