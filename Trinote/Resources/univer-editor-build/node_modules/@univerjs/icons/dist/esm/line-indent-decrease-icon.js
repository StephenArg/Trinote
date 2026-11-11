import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/line-indent-decrease-icon.tsx
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
				"d": "M5 5.6L2.4 8L5 10.4",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2.4 8H5.1",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		}
	]
};
const LineIndentDecreaseIcon = forwardRef(function LineIndentDecreaseIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "line-indent-decrease-icon",
		ref,
		icon: element
	}));
});
LineIndentDecreaseIcon.displayName = "LineIndentDecreaseIcon";
//#endregion
export { LineIndentDecreaseIcon, LineIndentDecreaseIcon as default };
