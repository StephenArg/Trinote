import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-predefined-process-icon.tsx
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
			"d": "M1.8 2.8H18.2V17.2H1.8z",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M6 2.8V17.2M14 2.8V17.2",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartPredefinedProcessIcon = forwardRef(function ShapeFlowChartPredefinedProcessIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-predefined-process-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartPredefinedProcessIcon.displayName = "ShapeFlowChartPredefinedProcessIcon";
//#endregion
export { ShapeFlowChartPredefinedProcessIcon, ShapeFlowChartPredefinedProcessIcon as default };
