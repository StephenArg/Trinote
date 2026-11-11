import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/reduce-icon.tsx
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
			"d": "M1.9999 7.9999H13.9999",
			"strokeLinecap": "round",
			"strokeWidth": 1.2
		}
	}]
};
const ReduceIcon = forwardRef(function ReduceIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "reduce-icon",
		ref,
		icon: element
	}));
});
ReduceIcon.displayName = "ReduceIcon";
//#endregion
export { ReduceIcon, ReduceIcon as default };
