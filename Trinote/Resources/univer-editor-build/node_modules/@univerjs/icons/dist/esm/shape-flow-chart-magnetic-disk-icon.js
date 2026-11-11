import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-magnetic-disk-icon.tsx
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
			"cx": 10,
			"cy": 7,
			"stroke": "currentColor",
			"rx": 8,
			"ry": 4,
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M2 7V12C2 14.2 5.6 16.5 10 16.5C14.4 16.5 18 14.2 18 12V7",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartMagneticDiskIcon = forwardRef(function ShapeFlowChartMagneticDiskIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-magnetic-disk-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartMagneticDiskIcon.displayName = "ShapeFlowChartMagneticDiskIcon";
//#endregion
export { ShapeFlowChartMagneticDiskIcon, ShapeFlowChartMagneticDiskIcon as default };
