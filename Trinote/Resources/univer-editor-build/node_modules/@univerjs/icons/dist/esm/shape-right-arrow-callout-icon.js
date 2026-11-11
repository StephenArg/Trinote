import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-right-arrow-callout-icon.tsx
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
			"d": "M8 4H2V16H8V11.4H14.9L17.3 10L14.9 8.6H8V4ZM14 7V5.6699L20 10L14 14.3301V13H9.6V17.6H0.4V2.4H9.6V7H14Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeRightArrowCalloutIcon = forwardRef(function ShapeRightArrowCalloutIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-right-arrow-callout-icon",
		ref,
		icon: element
	}));
});
ShapeRightArrowCalloutIcon.displayName = "ShapeRightArrowCalloutIcon";
//#endregion
export { ShapeRightArrowCalloutIcon, ShapeRightArrowCalloutIcon as default };
