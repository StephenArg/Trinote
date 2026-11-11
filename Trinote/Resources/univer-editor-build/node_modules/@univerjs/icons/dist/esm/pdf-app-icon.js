import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/pdf-app-icon.tsx
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
				"d": "M4.84365 4.8458H8.72365L11.1562 7.27835V11.1583H5.84365C5.29137 11.1583 4.84365 10.7106 4.84365 10.1583V4.8458ZM8.72365 4.8458V7.27835H11.1562",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.9,
				"height": 1.15,
				"x": 6.05,
				"y": 8.42,
				"fill": "currentColor",
				"rx": .35
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M1.90107 0.578613C1.45925 0.578613 1.10107 0.936785 1.10107 1.37861V11.8216C1.10107 13.8098 2.71285 15.4216 4.70107 15.4216H14.0987C14.5406 15.4216 14.8987 15.0634 14.8987 14.6216V4.17861C14.8987 2.19039 13.287 0.578613 11.2987 0.578613H1.90107ZM2.30107 11.8216V1.77861H11.2987C12.6242 1.77861 13.6987 2.85313 13.6987 4.17861V14.2216H4.70107C3.37559 14.2216 2.30107 13.1471 2.30107 11.8216Z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}
	]
};
const PdfAppIcon = forwardRef(function PdfAppIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "pdf-app-icon",
		ref,
		icon: element
	}));
});
PdfAppIcon.displayName = "PdfAppIcon";
//#endregion
export { PdfAppIcon, PdfAppIcon as default };
