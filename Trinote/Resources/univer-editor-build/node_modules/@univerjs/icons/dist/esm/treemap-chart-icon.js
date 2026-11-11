import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/treemap-chart-icon.tsx
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
			"d": "M1.8 1.8H14.2V14.2H1.8V1.8ZM1.8 8.8H8.4M8.4 1.8V14.2M8.4 6.2H14.2M11.2 6.2V14.2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const TreemapChartIcon = forwardRef(function TreemapChartIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "treemap-chart-icon",
		ref,
		icon: element
	}));
});
TreemapChartIcon.displayName = "TreemapChartIcon";
//#endregion
export { TreemapChartIcon, TreemapChartIcon as default };
