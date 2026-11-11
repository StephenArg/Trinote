import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/gauge-chart-icon.tsx
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
			"d": "M.7 12.7a7.3 7.6 0 0 1 14.6 0h-2.5a4.8 5 0 0 0-9.6 0H.7ZM2.9 7.1 4.6 8.9M8 4.9v2.5M13.1 7.1 11.4 8.9M8 12.7 11.2 7.7",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}, {
		"tag": "circle",
		"attrs": {
			"cx": 8,
			"cy": 12.7,
			"r": .7,
			"fill": "currentColor"
		}
	}]
};
const GaugeChartIcon = forwardRef(function GaugeChartIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "gauge-chart-icon",
		ref,
		icon: element
	}));
});
GaugeChartIcon.displayName = "GaugeChartIcon";
//#endregion
export { GaugeChartIcon, GaugeChartIcon as default };
