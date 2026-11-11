import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-up-down-arrow-callout-icon.tsx
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
			"d": "M16 5L13 5L13 6L19 6L19 14L13 14L13 15L16 15L10 20L4 15L7 15L7 14L1 14L1 6L7 6L7 5L4 5L10 0ZM8.6 3.2482L8.6 7.6L2.6 7.6L2.6 12.4L8.6 12.4L8.6 16.7509L10 17.9171L11.4 16.7509L11.4 12.4L17.4 12.4L17.4 7.6L11.4 7.6L11.4 3.2482L10 2.0819Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeUpDownArrowCalloutIcon = forwardRef(function ShapeUpDownArrowCalloutIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-up-down-arrow-callout-icon",
		ref,
		icon: element
	}));
});
ShapeUpDownArrowCalloutIcon.displayName = "ShapeUpDownArrowCalloutIcon";
//#endregion
export { ShapeUpDownArrowCalloutIcon, ShapeUpDownArrowCalloutIcon as default };
