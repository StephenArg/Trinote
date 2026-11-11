import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-left-arrow-callout-icon.tsx
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
			"d": "M12 16H18V4H12V8.6H5.1L2.7 10L5.1 11.4H12V16ZM6 13V14.3301L0 10L6 5.6699V7H10.4V2.4H19.6V17.6H10.4V13H6Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeLeftArrowCalloutIcon = forwardRef(function ShapeLeftArrowCalloutIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-left-arrow-callout-icon",
		ref,
		icon: element
	}));
});
ShapeLeftArrowCalloutIcon.displayName = "ShapeLeftArrowCalloutIcon";
//#endregion
export { ShapeLeftArrowCalloutIcon, ShapeLeftArrowCalloutIcon as default };
