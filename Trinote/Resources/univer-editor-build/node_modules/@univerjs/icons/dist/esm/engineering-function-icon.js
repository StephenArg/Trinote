import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/engineering-function-icon.tsx
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
			"d": "M5 12H11M5.4 9.8L10.5 4.7V9.8H5.4ZM7.1 9.5V8.3M8.4 9.5V7",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const EngineeringFunctionIcon = forwardRef(function EngineeringFunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "engineering-function-icon",
		ref,
		icon: element
	}));
});
EngineeringFunctionIcon.displayName = "EngineeringFunctionIcon";
//#endregion
export { EngineeringFunctionIcon, EngineeringFunctionIcon as default };
