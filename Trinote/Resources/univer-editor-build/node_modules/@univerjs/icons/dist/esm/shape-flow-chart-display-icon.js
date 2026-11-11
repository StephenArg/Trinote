import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-display-icon.tsx
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
			"d": "M8.6 2H10C14.4 2 18 5.6 18 10C18 14.4 14.4 18 10 18H8.6L2.25 10L8.6 2Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartDisplayIcon = forwardRef(function ShapeFlowChartDisplayIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-display-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartDisplayIcon.displayName = "ShapeFlowChartDisplayIcon";
//#endregion
export { ShapeFlowChartDisplayIcon, ShapeFlowChartDisplayIcon as default };
