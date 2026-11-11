import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-circular-arrow-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 18 19",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M6.5 5H8.5C9.0523 5 10.0661 5.44772 10.0661 6H11.5661C11.5661 4.34315 10.1569 3.60304 8.5 3.60304H6.5C4.84315 3.60304 4 4.34315 4 6V10V10.0938V12.7969V15.5H1.5V6H0V17H5.5V6C5.5 5.44771 5.94771 5 6.5 5ZM5.5 1.60304H9.5C11.7091 1.60304 14 3.79086 14 6V14V14.603L12.8965 16.3597L11.5661 14.603V10.0201V6H10.0661V13.103H8.06612L12.8965 18.603L17.5 13.103H15.5V6C15.5 2.68629 12.8137 0 9.5 0H5.5C2.18629 0 0 2.68629 0 6H1.5C1.5 3.79086 3.29086 1.60304 5.5 1.60304Z"
		}
	}]
};
const ShapeCircularArrowIcon = forwardRef(function ShapeCircularArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-circular-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeCircularArrowIcon.displayName = "ShapeCircularArrowIcon";
//#endregion
export { ShapeCircularArrowIcon, ShapeCircularArrowIcon as default };
