import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/locate-fixed-icon.tsx
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
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10 2.8v2.5M10 14.7v2.5M2.8 10h2.5M14.7 10h2.5",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10,
				"cy": 10,
				"r": 4.2,
				"stroke": "currentColor",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10,
				"cy": 10,
				"r": 1.35,
				"fill": "currentColor"
			}
		}
	]
};
const LocateFixedIcon = forwardRef(function LocateFixedIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "locate-fixed-icon",
		ref,
		icon: element
	}));
});
LocateFixedIcon.displayName = "LocateFixedIcon";
//#endregion
export { LocateFixedIcon, LocateFixedIcon as default };
