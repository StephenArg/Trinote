import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/text-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 17 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M2.22891 2.67227H11.5622M6.89541 2.67227V14.0056M10.2289 7.00552H15.5622M12.8954 7.00552V14.0055",
			"strokeLinecap": "round",
			"strokeWidth": 1.2
		}
	}]
};
const TextIcon = forwardRef(function TextIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "text-icon",
		ref,
		icon: element
	}));
});
TextIcon.displayName = "TextIcon";
//#endregion
export { TextIcon, TextIcon as default };
