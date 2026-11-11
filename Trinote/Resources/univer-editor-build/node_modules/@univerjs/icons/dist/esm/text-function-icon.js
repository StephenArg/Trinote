import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/text-function-icon.tsx
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
			"d": "M5 12H11M5.3 4.4H10.7M8 4.4V9.6M6.6 9.6H9.4",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const TextFunctionIcon = forwardRef(function TextFunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "text-function-icon",
		ref,
		icon: element
	}));
});
TextFunctionIcon.displayName = "TextFunctionIcon";
//#endregion
export { TextFunctionIcon, TextFunctionIcon as default };
