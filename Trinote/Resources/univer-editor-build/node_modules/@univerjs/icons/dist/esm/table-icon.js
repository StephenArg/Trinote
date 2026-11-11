import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/table-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "rect",
		"attrs": {
			"width": 12.4,
			"height": 12.4,
			"x": 1.8,
			"y": 1.8,
			"stroke": "currentColor",
			"rx": 1.8,
			"strokeWidth": 1.2
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M1.8 5.6H14.2M5.6 1.8V14.2",
			"strokeWidth": 1.2
		}
	}]
};
const TableIcon = forwardRef(function TableIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "table-icon",
		ref,
		icon: element
	}));
});
TableIcon.displayName = "TableIcon";
//#endregion
export { TableIcon, TableIcon as default };
