import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/convert-to-number-icon.tsx
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
			"d": "M2 3.5V6.2C2 7.2 2.8 8 3.8 8H6.4M4.8 6.2L6.6 8L4.8 9.8",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M9.8 3.2L8.8 12.8M13.2 3.2L12.2 12.8M8 6.2H14M7.7 9.8H13.7",
			"strokeLinecap": "round",
			"strokeWidth": 1.2
		}
	}]
};
const ConvertToNumberIcon = forwardRef(function ConvertToNumberIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "convert-to-number-icon",
		ref,
		icon: element
	}));
});
ConvertToNumberIcon.displayName = "ConvertToNumberIcon";
//#endregion
export { ConvertToNumberIcon, ConvertToNumberIcon as default };
