import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-action-button-information-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.8 1.8H18.2V18.2H1.8z",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10,
				"cy": 10,
				"r": 5.2,
				"stroke": "currentColor",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10,
				"cy": 7.5,
				"r": 1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M9 9H11V13H9z"
			}
		}
	]
};
const ShapeActionButtonInformationIcon = forwardRef(function ShapeActionButtonInformationIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-action-button-information-icon",
		ref,
		icon: element
	}));
});
ShapeActionButtonInformationIcon.displayName = "ShapeActionButtonInformationIcon";
//#endregion
export { ShapeActionButtonInformationIcon, ShapeActionButtonInformationIcon as default };
