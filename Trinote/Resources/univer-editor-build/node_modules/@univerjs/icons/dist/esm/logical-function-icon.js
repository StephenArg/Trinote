import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/logical-function-icon.tsx
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
			"d": "M5 12H11M6.35 5.45C6.35 4.4 7.05 3.78 8.05 3.78C9.05 3.78 9.75 4.4 9.75 5.3C9.75 6.08 9.28 6.48 8.68 6.88C8.2 7.2 8 7.6 8 8.18M8 9.75H8.01",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const LogicalFunctionIcon = forwardRef(function LogicalFunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "logical-function-icon",
		ref,
		icon: element
	}));
});
LogicalFunctionIcon.displayName = "LogicalFunctionIcon";
//#endregion
export { LogicalFunctionIcon, LogicalFunctionIcon as default };
