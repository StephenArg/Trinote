import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-left-right-up-arrow-icon.tsx
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
			"d": "M15.083 7L13 7L13 10.9688L14 10.9688L14 9L20 14L14 19L14 16.9688L6 16.9688L6 19L0 14L6 9L6 10.9688L7 10.9688L7 7L5.083 7L10.083 1ZM8.6 12.5688L4.2166 12.5688L2.498 14L4.1414 15.3688L15.8588 15.3688L17.5007 14L15.7835 12.5688L11.4 12.5688L11.4 5.0788L10.083 3.4982L8.6 5.278Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeLeftRightUpArrowIcon = forwardRef(function ShapeLeftRightUpArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-left-right-up-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeLeftRightUpArrowIcon.displayName = "ShapeLeftRightUpArrowIcon";
//#endregion
export { ShapeLeftRightUpArrowIcon, ShapeLeftRightUpArrowIcon as default };
