import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/table-border-width-icon.tsx
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
			"strokeLinecap": "round"
		},
		"children": [
			{
				"tag": "path",
				"attrs": {
					"d": "M3 3.25H13",
					"transform": "translate(2 2)",
					"strokeWidth": 1.1
				}
			},
			{
				"tag": "path",
				"attrs": {
					"d": "M3 6.5H13",
					"transform": "translate(2 2)",
					"strokeWidth": 1.4
				}
			},
			{
				"tag": "path",
				"attrs": {
					"d": "M3 10H13",
					"transform": "translate(2 2)",
					"strokeWidth": 1.8
				}
			},
			{
				"tag": "path",
				"attrs": {
					"d": "M3 13.25H13",
					"transform": "translate(2 2)",
					"strokeWidth": 2.2
				}
			}
		]
	}]
};
const TableBorderWidthIcon = forwardRef(function TableBorderWidthIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "table-border-width-icon",
		ref,
		icon: element
	}));
});
TableBorderWidthIcon.displayName = "TableBorderWidthIcon";
//#endregion
export { TableBorderWidthIcon, TableBorderWidthIcon as default };
