import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/crop-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "1.05 1.05 17.9 17.9",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5 2.8V12.5C5 13.9 6.1 15 7.5 15H17.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.5
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2.8 5H12.5C13.9 5 15 6.1 15 7.5V17.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.5
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8.3 8.3H11.7V11.7H8.3V8.3Z",
				"strokeWidth": 1.2
			}
		}
	]
};
const CropIcon = forwardRef(function CropIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "crop-icon",
		ref,
		icon: element
	}));
});
CropIcon.displayName = "CropIcon";
//#endregion
export { CropIcon, CropIcon as default };
