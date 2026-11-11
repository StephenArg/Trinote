import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/information-function-icon.tsx
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
			"d": "M5 12H11M8 6.5V9.5M8 4.7H8.01",
			"strokeLinecap": "round",
			"strokeWidth": 1.2
		}
	}]
};
const InformationFunctionIcon = forwardRef(function InformationFunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "information-function-icon",
		ref,
		icon: element
	}));
});
InformationFunctionIcon.displayName = "InformationFunctionIcon";
//#endregion
export { InformationFunctionIcon, InformationFunctionIcon as default };
