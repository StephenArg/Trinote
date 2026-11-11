import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-action-button-back-previous-icon.tsx
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
			"stroke": "currentColor",
			"d": "M1.8 1.8H18.2V18.2H1.8z",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M13.9999 15.4058L13.9999 4.0918L5 10.092ZM12.4001 7.0803L12.4001 12.6026L8.0074 10.009Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeActionButtonBackPreviousIcon = forwardRef(function ShapeActionButtonBackPreviousIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-action-button-back-previous-icon",
		ref,
		icon: element
	}));
});
ShapeActionButtonBackPreviousIcon.displayName = "ShapeActionButtonBackPreviousIcon";
//#endregion
export { ShapeActionButtonBackPreviousIcon, ShapeActionButtonBackPreviousIcon as default };
