import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sheets-multi-icon.tsx
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
				"fill": "#35BD4B",
				"d": "M3.4535 1.12549C2.7002 1.12549 2.08954 1.73615 2.08954 2.48945V13.5104C2.08954 14.2637 2.7002 14.8744 3.4535 14.8744H12.5465C13.2998 14.8744 13.9105 14.2637 13.9105 13.5104V5.0992L10.0091 1.12549H3.4535Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#32A846",
				"d": "M10.0075 1.12549L13.9104 5.09842H10.6742C10.306 5.09842 10.0075 4.79994 10.0075 4.43175V1.12549Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "white",
				"d": "M4.7 7.05H11.1V12.05H4.7V7.05ZM5.5 7.85V9.2H7.35V7.85H5.5ZM8.15 7.85V9.2H10.3V7.85H8.15ZM5.5 10V11.25H7.35V10H5.5ZM8.15 10V11.25H10.3V10H8.15Z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}
	]
};
const SheetsMultiIcon = forwardRef(function SheetsMultiIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sheets-multi-icon",
		ref,
		icon: element
	}));
});
SheetsMultiIcon.displayName = "SheetsMultiIcon";
//#endregion
export { SheetsMultiIcon, SheetsMultiIcon as default };
