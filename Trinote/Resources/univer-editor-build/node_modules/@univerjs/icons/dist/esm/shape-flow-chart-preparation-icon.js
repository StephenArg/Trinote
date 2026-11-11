import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-preparation-icon.tsx
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
			"d": "M14.4854 4L18.771 10L14.4854 16H5.51465L1.229 10L5.51465 4H14.4854Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartPreparationIcon = forwardRef(function ShapeFlowChartPreparationIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-preparation-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartPreparationIcon.displayName = "ShapeFlowChartPreparationIcon";
//#endregion
export { ShapeFlowChartPreparationIcon, ShapeFlowChartPreparationIcon as default };
