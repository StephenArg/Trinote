import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-decision-icon.tsx
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
			"d": "M10 3.28027L18.3994 10L10 16.7197L1.6001 10L10 3.28027Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartDecisionIcon = forwardRef(function ShapeFlowChartDecisionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-decision-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartDecisionIcon.displayName = "ShapeFlowChartDecisionIcon";
//#endregion
export { ShapeFlowChartDecisionIcon, ShapeFlowChartDecisionIcon as default };
