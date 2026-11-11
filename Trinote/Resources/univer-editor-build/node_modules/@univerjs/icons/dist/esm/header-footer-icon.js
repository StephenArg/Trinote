import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/header-footer-icon.tsx
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
		"tag": "rect",
		"attrs": {
			"width": 12.2,
			"height": 13,
			"x": 1.9,
			"y": 1.5,
			"stroke": "currentColor",
			"rx": 1.4,
			"strokeWidth": 1.2
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M4.9999 4.50137H10.9999M4.9999 11.4987H10.9999",
			"strokeLinecap": "round",
			"strokeWidth": 1.2
		}
	}]
};
const HeaderFooterIcon = forwardRef(function HeaderFooterIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "header-footer-icon",
		ref,
		icon: element
	}));
});
HeaderFooterIcon.displayName = "HeaderFooterIcon";
//#endregion
export { HeaderFooterIcon, HeaderFooterIcon as default };
