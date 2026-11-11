import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/objects-icon.tsx
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
				"stroke": "currentColor",
				"d": "M5.5 10.2C4.4 9.4 3.8 8.1 3.8 6.8C3.8 4.5 5.7 2.7 8 2.7C10.3 2.7 12.2 4.5 12.2 6.8C12.2 8.1 11.6 9.4 10.5 10.2C9.9 10.7 9.7 11.1 9.7 11.8H6.3C6.3 11.1 6.1 10.7 5.5 10.2Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.4 13.4H9.6",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.7 11.8H9.3",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		}
	]
};
const ObjectsIcon = forwardRef(function ObjectsIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "objects-icon",
		ref,
		icon: element
	}));
});
ObjectsIcon.displayName = "ObjectsIcon";
//#endregion
export { ObjectsIcon, ObjectsIcon as default };
