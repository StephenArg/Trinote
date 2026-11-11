import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-extract-icon.tsx
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
			"d": "M10 3.23633L17.3818 18H2.61816L10 3.23633Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartExtractIcon = forwardRef(function ShapeFlowChartExtractIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-extract-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartExtractIcon.displayName = "ShapeFlowChartExtractIcon";
//#endregion
export { ShapeFlowChartExtractIcon, ShapeFlowChartExtractIcon as default };
