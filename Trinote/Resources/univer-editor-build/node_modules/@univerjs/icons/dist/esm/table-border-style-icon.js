import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/table-border-style-icon.tsx
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
		"tag": "g",
		"attrs": {
			"stroke": "currentColor",
			"strokeLinecap": "round",
			"strokeWidth": 1.5
		},
		"children": [
			{
				"tag": "path",
				"attrs": {
					"d": "M3 3.5H13",
					"transform": "translate(2 2)"
				}
			},
			{
				"tag": "path",
				"attrs": {
					"d": "M3 8H13",
					"transform": "translate(2 2)",
					"strokeDasharray": "1.2 2.2"
				}
			},
			{
				"tag": "path",
				"attrs": {
					"d": "M3 12.5H13",
					"transform": "translate(2 2)",
					"strokeDasharray": "3 2"
				}
			}
		]
	}]
};
const TableBorderStyleIcon = forwardRef(function TableBorderStyleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "table-border-style-icon",
		ref,
		icon: element
	}));
});
TableBorderStyleIcon.displayName = "TableBorderStyleIcon";
//#endregion
export { TableBorderStyleIcon, TableBorderStyleIcon as default };
