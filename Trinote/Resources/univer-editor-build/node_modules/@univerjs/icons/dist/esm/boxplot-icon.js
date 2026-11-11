import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/boxplot-icon.tsx
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
				"d": "M2.2 2.2V13.8H13.8",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.9 5.1H8.6V10.9H4.9V5.1Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.75 3.4V5.1",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.75 10.9V12.6",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10.4 3.8H13.7V9.6H10.4V3.8Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M12.05 2.2V3.8",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M12.05 9.6V11.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const BoxplotIcon = forwardRef(function BoxplotIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "boxplot-icon",
		ref,
		icon: element
	}));
});
BoxplotIcon.displayName = "BoxplotIcon";
//#endregion
export { BoxplotIcon, BoxplotIcon as default };
