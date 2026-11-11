import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/pdf-multi-icon.tsx
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
				"fill": "#E5484D",
				"d": "M3.4535 1.12549C2.7002 1.12549 2.08954 1.73615 2.08954 2.48945V13.5104C2.08954 14.2637 2.7002 14.8744 3.4535 14.8744H12.5465C13.2998 14.8744 13.9105 14.2637 13.9105 13.5104V5.0992L10.0091 1.12549H3.4535Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#C62F35",
				"d": "M10.0075 1.12549L13.9104 5.09842H10.6742C10.306 5.09842 10.0075 4.79994 10.0075 4.43175V1.12549Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "white",
				"d": "M4.75 6.45H9.3L11.25 8.4V12.35H4.75V6.45Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#F7C7C9",
				"d": "M9.3 6.45V8.4H11.25L9.3 6.45Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#B9252D",
				"d": "M4.15 8.65H11.75V11.35H4.15V8.65Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "white",
				"d": "M5.05 10.62V9.38H5.45C5.76 9.38 5.94 9.57 5.94 9.82C5.94 10.08 5.76 10.25 5.45 10.25H5.05M6.43 9.38V10.62H6.78C7.16 10.62 7.38 10.38 7.38 10C7.38 9.62 7.16 9.38 6.78 9.38H6.43ZM7.88 10.62V9.38H8.85M7.88 9.99H8.62",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": .42
			}
		}
	]
};
const PdfMultiIcon = forwardRef(function PdfMultiIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "pdf-multi-icon",
		ref,
		icon: element
	}));
});
PdfMultiIcon.displayName = "PdfMultiIcon";
//#endregion
export { PdfMultiIcon, PdfMultiIcon as default };
