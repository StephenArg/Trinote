import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/star-incomplete-double-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"fill": "colorChannel1",
				"d": "M8 1.8L9.73075 5.30631L13.6 5.86863L10.8 8.59897L11.4615 12.4526L8 10.632L4.53853 12.4526L5.2 8.59897L2.4 5.86863L6.26927 5.30631L8 1.8Z"
			}
		},
		{
			"tag": "mask",
			"attrs": {
				"id": "star-incomplete-mask",
				"width": 8,
				"height": 16,
				"x": 0,
				"y": 0,
				"maskUnits": "userSpaceOnUse"
			},
			"children": [{
				"tag": "path",
				"attrs": {
					"fill": "white",
					"d": "M0 0H8V16H0z"
				}
			}]
		},
		{
			"tag": "g",
			"attrs": { "mask": "url(#star-incomplete-mask)" },
			"children": [{
				"tag": "path",
				"attrs": {
					"fill": "currentColor",
					"d": "M8 1.8L9.73075 5.30631L13.6 5.86863L10.8 8.59897L11.4615 12.4526L8 10.632L4.53853 12.4526L5.2 8.59897L2.4 5.86863L6.26927 5.30631L8 1.8Z"
				}
			}]
		}
	]
};
const StarIncompleteDoubleIcon = forwardRef(function StarIncompleteDoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "star-incomplete-double-icon",
		ref,
		icon: element
	}));
});
StarIncompleteDoubleIcon.displayName = "StarIncompleteDoubleIcon";
//#endregion
export { StarIncompleteDoubleIcon, StarIncompleteDoubleIcon as default };
