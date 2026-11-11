import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-left-right-arrow-callout-icon.tsx
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
			"d": "M7 13L6 13L6 14.3301L0 10L6 5.6699L6 7L7 7L7 1L13 1L13 7L14 7L14 5.6699L20 10L14 14.3301L14 13L13 13L13 19L7 19ZM8.6 8.6L4.6735 8.6L2.7334 10L4.6735 11.4L8.6 11.4L8.6 17.4L11.4 17.4L11.4 11.4L15.3266 11.4L17.2652 10L15.3266 8.6L11.4 8.6L11.4 2.6L8.6 2.6Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeLeftRightArrowCalloutIcon = forwardRef(function ShapeLeftRightArrowCalloutIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-left-right-arrow-callout-icon",
		ref,
		icon: element
	}));
});
ShapeLeftRightArrowCalloutIcon.displayName = "ShapeLeftRightArrowCalloutIcon";
//#endregion
export { ShapeLeftRightArrowCalloutIcon, ShapeLeftRightArrowCalloutIcon as default };
