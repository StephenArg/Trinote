import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shrink-icon.tsx
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
			"d": "M10 10L14 14M10 10V13.2M10 10H13.2M6 13.2V10H2.8M6 10L2 14M10 2.8V6H13.2M10 6L14 2M6 2.8V6H2.8M6 6L2 2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const ShrinkIcon = forwardRef(function ShrinkIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shrink-icon",
		ref,
		icon: element
	}));
});
ShrinkIcon.displayName = "ShrinkIcon";
//#endregion
export { ShrinkIcon, ShrinkIcon as default };
