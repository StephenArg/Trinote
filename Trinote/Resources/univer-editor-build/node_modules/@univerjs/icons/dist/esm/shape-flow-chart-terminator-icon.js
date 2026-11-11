import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-terminator-icon.tsx
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
			"width": 18.4,
			"height": 12.4,
			"x": .8,
			"y": 3.8,
			"stroke": "currentColor",
			"rx": 6.2,
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartTerminatorIcon = forwardRef(function ShapeFlowChartTerminatorIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-terminator-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartTerminatorIcon.displayName = "ShapeFlowChartTerminatorIcon";
//#endregion
export { ShapeFlowChartTerminatorIcon, ShapeFlowChartTerminatorIcon as default };
