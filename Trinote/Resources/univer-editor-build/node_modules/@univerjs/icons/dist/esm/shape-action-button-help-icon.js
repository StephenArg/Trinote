import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-action-button-help-icon.tsx
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
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7 7.935C7 7.275 7.231 6.635 7.654 6.128L7.836 5.91C8.745 4.819 10.374 4.69 11.442 5.625C12.542 6.587 12.598 8.281 11.564 9.315L10 10.4V12.7",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10,
				"cy": 15,
				"r": .8,
				"fill": "currentColor"
			}
		}
	]
};
const ShapeActionButtonHelpIcon = forwardRef(function ShapeActionButtonHelpIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-action-button-help-icon",
		ref,
		icon: element
	}));
});
ShapeActionButtonHelpIcon.displayName = "ShapeActionButtonHelpIcon";
//#endregion
export { ShapeActionButtonHelpIcon, ShapeActionButtonHelpIcon as default };
