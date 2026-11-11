import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/data-flow-rounded-square-icon.tsx
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
		"tag": "rect",
		"attrs": {
			"width": 12,
			"height": 12,
			"x": 6,
			"y": 6,
			"stroke": "currentColor",
			"rx": 3,
			"transform": "scale(.83333)",
			"strokeWidth": 2
		}
	}]
};
const DataFlowRoundedSquareIcon = forwardRef(function DataFlowRoundedSquareIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "data-flow-rounded-square-icon",
		ref,
		icon: element
	}));
});
DataFlowRoundedSquareIcon.displayName = "DataFlowRoundedSquareIcon";
//#endregion
export { DataFlowRoundedSquareIcon, DataFlowRoundedSquareIcon as default };
