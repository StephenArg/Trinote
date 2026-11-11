import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/one-to-one-icon.tsx
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
				"width": 13.6,
				"height": 11.6,
				"x": 1.2,
				"y": 2.2,
				"stroke": "currentColor",
				"rx": .8,
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M3.8 6.6L5.2 5.6V10.4M10.6 6.6L12 5.6V10.4",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8 6.7V6.71M8 9.3V9.31",
				"strokeLinecap": "round",
				"strokeWidth": 1.4
			}
		}
	]
};
const OneToOneIcon = forwardRef(function OneToOneIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "one-to-one-icon",
		ref,
		icon: element
	}));
});
OneToOneIcon.displayName = "OneToOneIcon";
//#endregion
export { OneToOneIcon, OneToOneIcon as default };
