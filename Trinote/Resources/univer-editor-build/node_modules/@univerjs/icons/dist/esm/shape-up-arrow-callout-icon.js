import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-up-arrow-callout-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M16 12V18H4V12H8.6V5.1L10 2.7L11.4 5.1V12H16ZM7 6H5.6699L10 0L14.3301 6H13V10.4H17.6V19.6H2.4V10.4H7V6Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeUpArrowCalloutIcon = forwardRef(function ShapeUpArrowCalloutIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-up-arrow-callout-icon",
		ref,
		icon: element
	}));
});
ShapeUpArrowCalloutIcon.displayName = "ShapeUpArrowCalloutIcon";
//#endregion
export { ShapeUpArrowCalloutIcon, ShapeUpArrowCalloutIcon as default };
