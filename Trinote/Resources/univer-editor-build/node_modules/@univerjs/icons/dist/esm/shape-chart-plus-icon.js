import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-chart-plus-icon.tsx
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
			"d": "M1.8 1.8H18.2V18.2H1.8z",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M10 3V17M3 10H17",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeChartPlusIcon = forwardRef(function ShapeChartPlusIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-chart-plus-icon",
		ref,
		icon: element
	}));
});
ShapeChartPlusIcon.displayName = "ShapeChartPlusIcon";
//#endregion
export { ShapeChartPlusIcon, ShapeChartPlusIcon as default };
