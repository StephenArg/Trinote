import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/histogram-chart-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M1.8 13.8H14.2M2.4 13.8V9.2H5.2V13.8M5.2 13.8V4.8H8V13.8M8 13.8V2.2H10.8V13.8M10.8 13.8V7H13.6V13.8",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const HistogramChartIcon = forwardRef(function HistogramChartIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "histogram-chart-icon",
		ref,
		icon: element
	}));
});
HistogramChartIcon.displayName = "HistogramChartIcon";
//#endregion
export { HistogramChartIcon, HistogramChartIcon as default };
