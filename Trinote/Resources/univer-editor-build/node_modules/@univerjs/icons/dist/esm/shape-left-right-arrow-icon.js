import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-left-right-arrow-icon.tsx
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
			"d": "M20 10L12.5 17L12.5 13.0312L7.5 13.0312L7.5 17L0 10L7.5 3L7.5 6.9688L12.5 6.9688L12.5 3ZM14.1 8.5687L5.9 8.5687L5.9 6.6812L2.3433 10.0001L5.9 13.3176L5.9 11.4312L14.1 11.4312L14.1 13.3179L17.6555 10.0001L14.1 6.681Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeLeftRightArrowIcon = forwardRef(function ShapeLeftRightArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-left-right-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeLeftRightArrowIcon.displayName = "ShapeLeftRightArrowIcon";
//#endregion
export { ShapeLeftRightArrowIcon, ShapeLeftRightArrowIcon as default };
