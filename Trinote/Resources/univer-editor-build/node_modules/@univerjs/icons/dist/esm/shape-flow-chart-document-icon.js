import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-document-icon.tsx
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
			"d": "M2 4H18V13.8C15.6 13.45 13.05 14.05 11 15.5C8.45 17.25 5.25 17.35 2 15.45V4Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartDocumentIcon = forwardRef(function ShapeFlowChartDocumentIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-document-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartDocumentIcon.displayName = "ShapeFlowChartDocumentIcon";
//#endregion
export { ShapeFlowChartDocumentIcon, ShapeFlowChartDocumentIcon as default };
