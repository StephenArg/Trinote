import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/hide-gridlines-icon.tsx
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
				"d": "M5 2H2V5M11 2H14V5M14 11V14H11M5 14H2V11",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.4 4V12M10.6 4V12M4 5.4H12M4 10.6H12",
				"strokeDasharray": "1.6 1.6",
				"strokeWidth": 1.05
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M4.875 4.875H5.925V5.925H4.875V4.875ZM10.075 4.875H11.125V5.925H10.075V4.875ZM10.075 10.075H11.125V11.125H10.075V10.075ZM4.875 10.075H5.925V11.125H4.875V10.075Z"
			}
		}
	]
};
const HideGridlinesIcon = forwardRef(function HideGridlinesIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "hide-gridlines-icon",
		ref,
		icon: element
	}));
});
HideGridlinesIcon.displayName = "HideGridlinesIcon";
//#endregion
export { HideGridlinesIcon, HideGridlinesIcon as default };
