import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/bases-multi-icon.tsx
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
				"fill": "#14B8A6",
				"d": "M3.4535 1.12549C2.7002 1.12549 2.08954 1.73615 2.08954 2.48945V13.5104C2.08954 14.2637 2.7002 14.8744 3.4535 14.8744H12.5465C13.2998 14.8744 13.9105 14.2637 13.9105 13.5104V5.0992L10.0091 1.12549H3.4535Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#0E9284",
				"d": "M10.0075 1.12549L13.9104 5.09842H10.6742C10.306 5.09842 10.0075 4.79994 10.0075 4.43175V1.12549Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "white",
				"d": "M7.9 6.55C6.24437 6.55 4.9 7.10222 4.9 7.78333V11.0167C4.9 11.6978 6.24437 12.25 7.9 12.25C9.55563 12.25 10.9 11.6978 10.9 11.0167V7.78333C10.9 7.10222 9.55563 6.55 7.9 6.55Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#14B8A6",
				"d": "M5.05 8.42C5.671 8.72 6.709 8.89 7.9 8.89C9.091 8.89 10.129 8.72 10.75 8.42V9.02C10.129 9.32 9.091 9.49 7.9 9.49C6.709 9.49 5.671 9.32 5.05 9.02V8.42Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#14B8A6",
				"d": "M5.05 10.02C5.671 10.32 6.709 10.49 7.9 10.49C9.091 10.49 10.129 10.32 10.75 10.02V10.62C10.129 10.92 9.091 11.09 7.9 11.09C6.709 11.09 5.671 10.92 5.05 10.62V10.02Z"
			}
		}
	]
};
const BasesMultiIcon = forwardRef(function BasesMultiIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "bases-multi-icon",
		ref,
		icon: element
	}));
});
BasesMultiIcon.displayName = "BasesMultiIcon";
//#endregion
export { BasesMultiIcon, BasesMultiIcon as default };
