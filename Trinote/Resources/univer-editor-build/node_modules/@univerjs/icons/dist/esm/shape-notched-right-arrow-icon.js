import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-notched-right-arrow-icon.tsx
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
			"d": "M18.699 10.001L10.2 17.5556L10.2 13.8L1.4 13.8L4.25 10L1.4 6.2L10.2 6.2L10.2 2.4463ZM16.2906 10.001L11.8 13.9927L11.8 12.2L4.6 12.2L6.25 10L4.6 7.8L11.8 7.8L11.8 6.0093Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeNotchedRightArrowIcon = forwardRef(function ShapeNotchedRightArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-notched-right-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeNotchedRightArrowIcon.displayName = "ShapeNotchedRightArrowIcon";
//#endregion
export { ShapeNotchedRightArrowIcon, ShapeNotchedRightArrowIcon as default };
