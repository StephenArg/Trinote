import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-offpage-connector-icon.tsx
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
			"d": "M4 1H16V15.4194L10 18.8481L4 15.4194V1Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartOffpageConnectorIcon = forwardRef(function ShapeFlowChartOffpageConnectorIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-offpage-connector-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartOffpageConnectorIcon.displayName = "ShapeFlowChartOffpageConnectorIcon";
//#endregion
export { ShapeFlowChartOffpageConnectorIcon, ShapeFlowChartOffpageConnectorIcon as default };
