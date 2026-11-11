import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-summing-junction-icon.tsx
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
		"tag": "circle",
		"attrs": {
			"cx": 10,
			"cy": 10,
			"r": 8.2,
			"stroke": "currentColor",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M5 5L15 15M15 5L5 15",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartSummingJunctionIcon = forwardRef(function ShapeFlowChartSummingJunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-summing-junction-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartSummingJunctionIcon.displayName = "ShapeFlowChartSummingJunctionIcon";
//#endregion
export { ShapeFlowChartSummingJunctionIcon, ShapeFlowChartSummingJunctionIcon as default };
