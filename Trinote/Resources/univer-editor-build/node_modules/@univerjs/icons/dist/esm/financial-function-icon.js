import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/financial-function-icon.tsx
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
			"d": "M5 12H11M8 3.9V10M9.7 5.1C9.25 4.72 8.65 4.52 8 4.52C6.98 4.52 6.32 4.95 6.32 5.6C6.32 7.28 9.8 6.3 9.8 7.98C9.8 8.7 9.1 9.18 8 9.18C7.27 9.18 6.58 8.98 6.02 8.6",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const FinancialFunctionIcon = forwardRef(function FinancialFunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "financial-function-icon",
		ref,
		icon: element
	}));
});
FinancialFunctionIcon.displayName = "FinancialFunctionIcon";
//#endregion
export { FinancialFunctionIcon, FinancialFunctionIcon as default };
