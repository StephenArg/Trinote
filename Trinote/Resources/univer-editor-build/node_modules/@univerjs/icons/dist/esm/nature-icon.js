import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/nature-icon.tsx
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
			"d": "M13.6 2.4C8.4 2.6 4.2 5.2 3.6 9.1C3.2 11.7 5.1 13.8 7.6 13.3C11.3 12.6 13.4 7.9 13.6 2.4Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.3
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M3.4 13.1C5.5 9.6 8.3 6.9 12.2 4.6",
			"strokeLinecap": "round",
			"strokeWidth": 1.3
		}
	}]
};
const NatureIcon = forwardRef(function NatureIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "nature-icon",
		ref,
		icon: element
	}));
});
NatureIcon.displayName = "NatureIcon";
//#endregion
export { NatureIcon, NatureIcon as default };
