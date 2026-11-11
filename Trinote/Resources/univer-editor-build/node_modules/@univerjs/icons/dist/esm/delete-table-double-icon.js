import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/delete-table-double-icon.tsx
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
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M1.5 1.5H13.5M1.5 1.5V13.5M5.5 1.5V13.5M9.5 1.5V8M1.5 5.5H13.5M1.5 9.5H8M13.5 1.5V8M1.5 13.5H8",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "colorChannel1",
			"d": "M9.7 9.7L14.5 14.5M14.5 9.7L9.7 14.5",
			"strokeLinecap": "round",
			"strokeWidth": 1.3
		}
	}]
};
const DeleteTableDoubleIcon = forwardRef(function DeleteTableDoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "delete-table-double-icon",
		ref,
		icon: element
	}));
});
DeleteTableDoubleIcon.displayName = "DeleteTableDoubleIcon";
//#endregion
export { DeleteTableDoubleIcon, DeleteTableDoubleIcon as default };
