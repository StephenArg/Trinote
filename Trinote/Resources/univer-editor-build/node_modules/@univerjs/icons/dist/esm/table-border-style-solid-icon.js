import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/table-border-style-solid-icon.tsx
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
			"d": "M4.5 10h11",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const TableBorderStyleSolidIcon = forwardRef(function TableBorderStyleSolidIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "table-border-style-solid-icon",
		ref,
		icon: element
	}));
});
TableBorderStyleSolidIcon.displayName = "TableBorderStyleSolidIcon";
//#endregion
export { TableBorderStyleSolidIcon, TableBorderStyleSolidIcon as default };
