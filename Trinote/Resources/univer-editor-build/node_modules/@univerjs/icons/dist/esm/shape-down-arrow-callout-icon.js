import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-down-arrow-callout-icon.tsx
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
			"d": "M4 8V2H16V8H11.4V14.9L10 17.3L8.6 14.9V8H4ZM13 14H14.3301L10 20L5.6699 14H7V9.6H2.4V0.4H17.6V9.6H13V14Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeDownArrowCalloutIcon = forwardRef(function ShapeDownArrowCalloutIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-down-arrow-callout-icon",
		ref,
		icon: element
	}));
});
ShapeDownArrowCalloutIcon.displayName = "ShapeDownArrowCalloutIcon";
//#endregion
export { ShapeDownArrowCalloutIcon, ShapeDownArrowCalloutIcon as default };
