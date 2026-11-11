import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-sort-icon.tsx
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
			"d": "M10 1.6L16.8 10L10 18.4L3.2 10L10 1.6Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M4 10H16",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartSortIcon = forwardRef(function ShapeFlowChartSortIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-sort-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartSortIcon.displayName = "ShapeFlowChartSortIcon";
//#endregion
export { ShapeFlowChartSortIcon, ShapeFlowChartSortIcon as default };
