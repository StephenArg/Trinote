import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-uturn-arrow-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 17 17",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M11.5 6C11.5 4.34315 10.6569 3.5 9 3.5H6C4.34315 3.5 3.5 4.34315 3.5 6V15H1.5V6H0V16.5H5V6C5 5.44771 5.44771 5 6 5H9C9.5523 5 10 5.44772 10 6H11.5ZM6 1.5H9C11.2091 1.5 13.5 3.79086 13.5 6V9H13.4971L12.5 11L11.5 9V6H10V7H8L12.5 14L17 7H15V6C15 2.68629 12.3137 0 9 0H6C2.68629 0 0 2.68629 0 6H1.5C1.5 3.79086 3.79086 1.5 6 1.5Z"
		}
	}]
};
const ShapeUturnArrowIcon = forwardRef(function ShapeUturnArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-uturn-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeUturnArrowIcon.displayName = "ShapeUturnArrowIcon";
//#endregion
export { ShapeUturnArrowIcon, ShapeUturnArrowIcon as default };
