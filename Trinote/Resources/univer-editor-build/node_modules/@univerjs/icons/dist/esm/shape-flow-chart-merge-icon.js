import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-merge-icon.tsx
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
			"d": "M2.61816 2H17.3818L10 16.7637L2.61816 2Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartMergeIcon = forwardRef(function ShapeFlowChartMergeIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-merge-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartMergeIcon.displayName = "ShapeFlowChartMergeIcon";
//#endregion
export { ShapeFlowChartMergeIcon, ShapeFlowChartMergeIcon as default };
