import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/data-flow-rounded-rectangle-icon.tsx
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
			"width": 16,
			"height": 10,
			"x": 4,
			"y": 7,
			"stroke": "currentColor",
			"rx": 3,
			"transform": "scale(.83333)",
			"strokeWidth": 2
		}
	}]
};
const DataFlowRoundedRectangleIcon = forwardRef(function DataFlowRoundedRectangleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "data-flow-rounded-rectangle-icon",
		ref,
		icon: element
	}));
});
DataFlowRoundedRectangleIcon.displayName = "DataFlowRoundedRectangleIcon";
//#endregion
export { DataFlowRoundedRectangleIcon, DataFlowRoundedRectangleIcon as default };
