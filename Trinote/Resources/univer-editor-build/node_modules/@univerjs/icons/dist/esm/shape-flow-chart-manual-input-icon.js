import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-manual-input-icon.tsx
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
			"d": "M2 6.80176L18 3.24609V16H2V6.80176Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartManualInputIcon = forwardRef(function ShapeFlowChartManualInputIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-manual-input-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartManualInputIcon.displayName = "ShapeFlowChartManualInputIcon";
//#endregion
export { ShapeFlowChartManualInputIcon, ShapeFlowChartManualInputIcon as default };
