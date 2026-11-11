import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-or-icon.tsx
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
			"d": "M10 2.8V17.2M2.8 10H17.2",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartOrIcon = forwardRef(function ShapeFlowChartOrIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-or-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartOrIcon.displayName = "ShapeFlowChartOrIcon";
//#endregion
export { ShapeFlowChartOrIcon, ShapeFlowChartOrIcon as default };
