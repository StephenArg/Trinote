import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/line-indent-increase-icon.tsx
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
				"d": "M2.1 2.5H13.9M7.1 5.8H13.9M7.1 9.1H13.9M2.1 12.4H13.9",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2.4 5.6L5 8L2.4 10.4",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2.3 8H5",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		}
	]
};
const LineIndentIncreaseIcon = forwardRef(function LineIndentIncreaseIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "line-indent-increase-icon",
		ref,
		icon: element
	}));
});
LineIndentIncreaseIcon.displayName = "LineIndentIncreaseIcon";
//#endregion
export { LineIndentIncreaseIcon, LineIndentIncreaseIcon as default };
