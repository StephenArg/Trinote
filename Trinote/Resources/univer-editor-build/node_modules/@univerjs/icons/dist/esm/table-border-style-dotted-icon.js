import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/table-border-style-dotted-icon.tsx
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
			"strokeDasharray": "1 2.4",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const TableBorderStyleDottedIcon = forwardRef(function TableBorderStyleDottedIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "table-border-style-dotted-icon",
		ref,
		icon: element
	}));
});
TableBorderStyleDottedIcon.displayName = "TableBorderStyleDottedIcon";
//#endregion
export { TableBorderStyleDottedIcon, TableBorderStyleDottedIcon as default };
