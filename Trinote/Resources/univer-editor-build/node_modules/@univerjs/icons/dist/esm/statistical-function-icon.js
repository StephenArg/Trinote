import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/statistical-function-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
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
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M5 12H11M5.5 9.7V7.8M8 9.7V5M10.5 9.7V6.5M5 9.7H11",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const StatisticalFunctionIcon = forwardRef(function StatisticalFunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "statistical-function-icon",
		ref,
		icon: element
	}));
});
StatisticalFunctionIcon.displayName = "StatisticalFunctionIcon";
//#endregion
export { StatisticalFunctionIcon, StatisticalFunctionIcon as default };
