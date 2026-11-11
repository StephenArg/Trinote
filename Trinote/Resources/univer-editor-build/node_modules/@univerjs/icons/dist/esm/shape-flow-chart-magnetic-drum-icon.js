import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-magnetic-drum-icon.tsx
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
		"tag": "ellipse",
		"attrs": {
			"cx": 13,
			"cy": 10,
			"stroke": "currentColor",
			"rx": 4,
			"ry": 8,
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M13 2H8C5.8 2 3.5 5.6 3.5 10C3.5 14.4 5.8 18 8 18H13",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartMagneticDrumIcon = forwardRef(function ShapeFlowChartMagneticDrumIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-magnetic-drum-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartMagneticDrumIcon.displayName = "ShapeFlowChartMagneticDrumIcon";
//#endregion
export { ShapeFlowChartMagneticDrumIcon, ShapeFlowChartMagneticDrumIcon as default };
