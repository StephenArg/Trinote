import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-magnetic-tape-icon.tsx
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
			"d": "M9 2C13.4 2 17 5.6 17 10C17 11.45 16.6 12.85 15.95 14H19V18H9C4.6 18 1 14.4 1 10C1 5.6 4.6 2 9 2Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartMagneticTapeIcon = forwardRef(function ShapeFlowChartMagneticTapeIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-magnetic-tape-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartMagneticTapeIcon.displayName = "ShapeFlowChartMagneticTapeIcon";
//#endregion
export { ShapeFlowChartMagneticTapeIcon, ShapeFlowChartMagneticTapeIcon as default };
