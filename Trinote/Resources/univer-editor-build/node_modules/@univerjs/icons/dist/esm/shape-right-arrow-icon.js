import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-right-arrow-icon.tsx
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
			"d": "M19 10.001L10 18.001V14H1V6H10V2.00098L19 10.001ZM16.6 10.001L11.6 5.55651V7.6H2.6V12.4H11.6V14.4455L16.6 10.001Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeRightArrowIcon = forwardRef(function ShapeRightArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-right-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeRightArrowIcon.displayName = "ShapeRightArrowIcon";
//#endregion
export { ShapeRightArrowIcon, ShapeRightArrowIcon as default };
