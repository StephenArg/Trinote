import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-left-arrow-icon.tsx
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
			"d": "M1 10.001L10 18.001V14H19V6H10V2.00098L1 10.001ZM3.40002 10.001L8.4 5.55651V7.6H17.4V12.4H8.4V14.4455L3.40002 10.001Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeLeftArrowIcon = forwardRef(function ShapeLeftArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-left-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeLeftArrowIcon.displayName = "ShapeLeftArrowIcon";
//#endregion
export { ShapeLeftArrowIcon, ShapeLeftArrowIcon as default };
