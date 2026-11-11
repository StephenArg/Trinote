import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sunburst-chart-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "circle",
			"attrs": {
				"cx": 8,
				"cy": 7.5,
				"r": 1.6,
				"stroke": "currentColor",
				"strokeWidth": 1.4
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8 3.5a4 4 0 0 1 3.9 3M12 7.8a4 4 0 0 1-3 3.6M8 11.5a4 4 0 0 1-4-3.7M4.1 6.8a4 4 0 0 1 2.9-3.2",
				"strokeWidth": 1.7
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M9.1 1.1a6.5 6.5 0 0 1 5.4 7M9.4 13.9a6.5 6.5 0 0 1-7.7-4.7M1.5 8a6.5 6.5 0 0 1 5.4-6.9",
				"strokeWidth": 1.9
			}
		}
	]
};
const SunburstChartIcon = forwardRef(function SunburstChartIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sunburst-chart-icon",
		ref,
		icon: element
	}));
});
SunburstChartIcon.displayName = "SunburstChartIcon";
//#endregion
export { SunburstChartIcon, SunburstChartIcon as default };
