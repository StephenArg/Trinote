import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/code-block-icon.tsx
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
			"d": "M5.33333 2H4.66667C3.93029 2 3.33333 2.59695 3.33333 3.33333V6.66667C3.33333 7.40305 2.73638 8 2 8C2.73638 8 3.33333 8.59695 3.33333 9.33333V12.6667C3.33333 13.403 3.93029 14 4.66667 14H5.33333",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.3
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M10.6667 14H11.3333C12.0697 14 12.6667 13.403 12.6667 12.6667V9.33333C12.6667 8.59695 13.2636 8 14 8C13.2636 8 12.6667 7.40305 12.6667 6.66667V3.33333C12.6667 2.59695 12.0697 2 11.3333 2H10.6667",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.3
		}
	}]
};
const CodeBlockIcon = forwardRef(function CodeBlockIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "code-block-icon",
		ref,
		icon: element
	}));
});
CodeBlockIcon.displayName = "CodeBlockIcon";
//#endregion
export { CodeBlockIcon, CodeBlockIcon as default };
