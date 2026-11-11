import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/table-border-style-dashed-icon.tsx
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
			"strokeDasharray": "3.2 2.2",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const TableBorderStyleDashedIcon = forwardRef(function TableBorderStyleDashedIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "table-border-style-dashed-icon",
		ref,
		icon: element
	}));
});
TableBorderStyleDashedIcon.displayName = "TableBorderStyleDashedIcon";
//#endregion
export { TableBorderStyleDashedIcon, TableBorderStyleDashedIcon as default };
