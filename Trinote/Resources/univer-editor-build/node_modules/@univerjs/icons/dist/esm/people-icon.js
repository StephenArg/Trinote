import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/people-icon.tsx
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
				"r": 5.7,
				"stroke": "currentColor",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.4 6.8H5.5",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10.5 6.8H10.6",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.6 9.3C6.2 10.4 7 10.9 8 10.9C9 10.9 9.8 10.4 10.4 9.3",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		}
	]
};
const PeopleIcon = forwardRef(function PeopleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "people-icon",
		ref,
		icon: element
	}));
});
PeopleIcon.displayName = "PeopleIcon";
//#endregion
export { PeopleIcon, PeopleIcon as default };
