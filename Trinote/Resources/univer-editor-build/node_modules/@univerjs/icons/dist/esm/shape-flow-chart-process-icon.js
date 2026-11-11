import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-process-icon.tsx
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
			"d": "M1.8 3.8H18.2V16.2H1.8z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartProcessIcon = forwardRef(function ShapeFlowChartProcessIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-process-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartProcessIcon.displayName = "ShapeFlowChartProcessIcon";
//#endregion
export { ShapeFlowChartProcessIcon, ShapeFlowChartProcessIcon as default };
