import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-action-button-document-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.8 1.8H18.2V18.2H1.8z",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7 4.3H9.6L14.2 9.8V14.5C14.2 15.163 13.663 15.7 13 15.7H7C6.337 15.7 5.8 15.163 5.8 14.5V5.5C5.8 4.837 6.337 4.3 7 4.3Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M9.2 4.6V8C9.2 9.105 10.095 10 11.2 10H14",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeActionButtonDocumentIcon = forwardRef(function ShapeActionButtonDocumentIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-action-button-document-icon",
		ref,
		icon: element
	}));
});
ShapeActionButtonDocumentIcon.displayName = "ShapeActionButtonDocumentIcon";
//#endregion
export { ShapeActionButtonDocumentIcon, ShapeActionButtonDocumentIcon as default };
