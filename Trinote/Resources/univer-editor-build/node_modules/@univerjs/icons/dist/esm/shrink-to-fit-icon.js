import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shrink-to-fit-icon.tsx
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
			"d": "M5.4 13.5L7.65 2.8C7.73 2.4 8.27 2.4 8.35 2.8L10.6 13.5M6.2 9.7H9.8",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.3
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M1.5 8H4.3M3.2 6.9L4.3 8L3.2 9.1M14.5 8H11.7M12.8 6.9L11.7 8L12.8 9.1",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const ShrinkToFitIcon = forwardRef(function ShrinkToFitIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shrink-to-fit-icon",
		ref,
		icon: element
	}));
});
ShrinkToFitIcon.displayName = "ShrinkToFitIcon";
//#endregion
export { ShrinkToFitIcon, ShrinkToFitIcon as default };
