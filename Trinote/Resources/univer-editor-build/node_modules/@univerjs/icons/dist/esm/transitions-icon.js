import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/transitions-icon.tsx
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
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.92 2.93C8.88 2.16 10.16 1.82 11.45 2.08C13.73 2.57 15.17 4.81 14.7 7.07C14.41 8.39 13.53 9.44 12.4 9.99",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 5.4,
				"cy": 9.6,
				"r": 4.3,
				"stroke": "currentColor",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.4 9.6L12.35 5.04",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10.27 5.38L12.35 5.04L11.21 6.8",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const TransitionsIcon = forwardRef(function TransitionsIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "transitions-icon",
		ref,
		icon: element
	}));
});
TransitionsIcon.displayName = "TransitionsIcon";
//#endregion
export { TransitionsIcon, TransitionsIcon as default };
