import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-collate-icon.tsx
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
			"d": "M4 2H16L10 10L16 18H4L10 10L4 2Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartCollateIcon = forwardRef(function ShapeFlowChartCollateIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-collate-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartCollateIcon.displayName = "ShapeFlowChartCollateIcon";
//#endregion
export { ShapeFlowChartCollateIcon, ShapeFlowChartCollateIcon as default };
