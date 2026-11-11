import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-chart-star-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.8 1.8H18.2V18.2H1.8z",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2.9289 2.9289L17.0711 17.0711",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M17.0711 2.9289L2.9289 17.0711",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10 3V17",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeChartStarIcon = forwardRef(function ShapeChartStarIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-chart-star-icon",
		ref,
		icon: element
	}));
});
ShapeChartStarIcon.displayName = "ShapeChartStarIcon";
//#endregion
export { ShapeChartStarIcon, ShapeChartStarIcon as default };
