import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/expand-icon.tsx
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
			"d": "M10 10L14 14M10 6L14 2M14 10.6667V14H10.6667M14 5.33333V2H10.6667M2 10.6667V14H5.33333M2 14L6 10M2 5.33333V2H5.33333M6 6L2 2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const ExpandIcon = forwardRef(function ExpandIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "expand-icon",
		ref,
		icon: element
	}));
});
ExpandIcon.displayName = "ExpandIcon";
//#endregion
export { ExpandIcon, ExpandIcon as default };
