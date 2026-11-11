import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/function-icon.tsx
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
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M12.8325 3.00753L12.2725 2.44328C11.9909 2.15966 11.6076 1.9999 11.2079 1.9999H4.08689C3.55342 1.9999 3.28522 2.64412 3.66105 3.02295L7.78136 7.17471C8.25623 7.65323 8.25623 8.43812 7.78136 8.91664L3.66105 13.0684C3.28522 13.4473 3.55342 14.0915 4.08689 14.0915H11.2079C11.6076 14.0915 11.9909 13.9317 12.2725 13.648L12.8325 13.0838",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const FunctionIcon = forwardRef(function FunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "function-icon",
		ref,
		icon: element
	}));
});
FunctionIcon.displayName = "FunctionIcon";
//#endregion
export { FunctionIcon, FunctionIcon as default };
