import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-connector-icon.tsx
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
	}]
};
const ShapeFlowChartConnectorIcon = forwardRef(function ShapeFlowChartConnectorIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-connector-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartConnectorIcon.displayName = "ShapeFlowChartConnectorIcon";
//#endregion
export { ShapeFlowChartConnectorIcon, ShapeFlowChartConnectorIcon as default };
