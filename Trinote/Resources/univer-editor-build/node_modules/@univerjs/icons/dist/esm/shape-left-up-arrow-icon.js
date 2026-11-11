import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-left-up-arrow-icon.tsx
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
			"d": "M19.083 7H17V16.9688H7V19L1 14L7 9V10.9688H11V7H9.08301L14.083 1L19.083 7ZM15.55 5.55V15.5688H5.75L3.65 14L5.75 12.43H12.45V5.55L14.083 3.55L15.55 5.55Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeLeftUpArrowIcon = forwardRef(function ShapeLeftUpArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-left-up-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeLeftUpArrowIcon.displayName = "ShapeLeftUpArrowIcon";
//#endregion
export { ShapeLeftUpArrowIcon, ShapeLeftUpArrowIcon as default };
