import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-chart-x-icon.tsx
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
			"d": "M2.92894 2.92891L17.0711 17.0711M17.0711 2.92891L2.92894 17.0711",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeChartXIcon = forwardRef(function ShapeChartXIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-chart-x-icon",
		ref,
		icon: element
	}));
});
ShapeChartXIcon.displayName = "ShapeChartXIcon";
//#endregion
export { ShapeChartXIcon, ShapeChartXIcon as default };
