import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-punched-tape-icon.tsx
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
			"d": "M2 4.5C5 5.35 8 4.95 10.5 3.3C12.75 1.8 15.25 1.35 18 2V13.8C15.3 13.25 12.85 13.95 11 15.5C8.35 17.4 5.35 17.35 2 15.3V4.5Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartPunchedTapeIcon = forwardRef(function ShapeFlowChartPunchedTapeIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-punched-tape-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartPunchedTapeIcon.displayName = "ShapeFlowChartPunchedTapeIcon";
//#endregion
export { ShapeFlowChartPunchedTapeIcon, ShapeFlowChartPunchedTapeIcon as default };
