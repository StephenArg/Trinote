import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-flow-chart-online-storage-icon.tsx
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
			"d": "M15 2.75C13.25 4.45 12 7.2 12 10C12 12.95 13.25 15.6 15 17.25",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M15 2H7C4.2 2 2 5.6 2 10C2 14.4 4.2 18 7 18H15",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFlowChartOnlineStorageIcon = forwardRef(function ShapeFlowChartOnlineStorageIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-flow-chart-online-storage-icon",
		ref,
		icon: element
	}));
});
ShapeFlowChartOnlineStorageIcon.displayName = "ShapeFlowChartOnlineStorageIcon";
//#endregion
export { ShapeFlowChartOnlineStorageIcon, ShapeFlowChartOnlineStorageIcon as default };
