import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-multidocument-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4 6V4.5H16V12H14",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7 3V1.5H19V9H17",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1 8H13V15C11.25 14.8 9.6 15.25 8.25 16.35L7.6 16.85C5.95 18.15 3.65 18.25 1 16.75V8Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeFlowChartMultidocumentIcon = forwardRef(function ShapeFlowChartMultidocumentIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-multidocument-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartMultidocumentIcon.displayName = "ShapeFlowChartMultidocumentIcon";
//#endregion
export { ShapeFlowChartMultidocumentIcon, ShapeFlowChartMultidocumentIcon as default };
