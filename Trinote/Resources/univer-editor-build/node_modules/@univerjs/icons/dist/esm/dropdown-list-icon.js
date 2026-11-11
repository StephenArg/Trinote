import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/dropdown-list-icon.tsx
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
				"d": "M8 5.5H2C1.72386 5.5 1.5 5.27614 1.5 5V2C1.5 1.72386 1.72386 1.5 2 1.5H14C14.2761 1.5 14.5 1.72386 14.5 2V5C14.5 5.27614 14.2761 5.5 14 5.5H13",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8.5 3.5L10.5 5.5L12.5 3.5",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2 7.5H14C14.2761 7.5 14.5 7.72386 14.5 8V14C14.5 14.2761 14.2761 14.5 14 14.5H2C1.72386 14.5 1.5 14.2761 1.5 14V8C1.5 7.72386 1.72386 7.5 2 7.5Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M3.5 9.5H9.5M3.5 12.5H7.5",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const DropdownListIcon = forwardRef(function DropdownListIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "dropdown-list-icon",
		ref,
		icon: element
	}));
});
DropdownListIcon.displayName = "DropdownListIcon";
//#endregion
export { DropdownListIcon, DropdownListIcon as default };
