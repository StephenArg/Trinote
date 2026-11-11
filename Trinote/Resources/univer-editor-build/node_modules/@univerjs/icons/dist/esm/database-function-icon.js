import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/database-function-icon.tsx
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
			"width": 11.2,
			"height": 13.2,
			"x": 2.4,
			"y": 1.4,
			"stroke": "currentColor",
			"rx": 1.6,
			"strokeWidth": 1.2
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M5 12H11M5.4 5.1C5.4 4.55 6.55 4.1 8 4.1C9.45 4.1 10.6 4.55 10.6 5.1C10.6 5.65 9.45 6.1 8 6.1C6.55 6.1 5.4 5.65 5.4 5.1ZM5.4 5.1V8.9C5.4 9.45 6.55 9.9 8 9.9C9.45 9.9 10.6 9.45 10.6 8.9V5.1M5.4 7C5.4 7.55 6.55 8 8 8C9.45 8 10.6 7.55 10.6 7",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const DatabaseFunctionIcon = forwardRef(function DatabaseFunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "database-function-icon",
		ref,
		icon: element
	}));
});
DatabaseFunctionIcon.displayName = "DatabaseFunctionIcon";
//#endregion
export { DatabaseFunctionIcon, DatabaseFunctionIcon as default };
