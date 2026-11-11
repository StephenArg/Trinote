import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-manual-operation-icon.tsx
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
			"d": "M1.41943 4H18.5806L14.2949 16H5.70508L1.41943 4Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartManualOperationIcon = forwardRef(function ShapeFlowChartManualOperationIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-manual-operation-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartManualOperationIcon.displayName = "ShapeFlowChartManualOperationIcon";
//#endregion
export { ShapeFlowChartManualOperationIcon, ShapeFlowChartManualOperationIcon as default };
