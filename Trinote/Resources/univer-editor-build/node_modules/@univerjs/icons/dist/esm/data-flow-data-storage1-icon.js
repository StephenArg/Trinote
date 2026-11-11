import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/data-flow-data-storage1-icon.tsx
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
			"d": "M20 7H7.2A3.2 3.2 0 0 0 4 10.2v3.6A3.2 3.2 0 0 0 7.2 17H20",
			"transform": "scale(.83333)",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 2
		}
	}]
};
const DataFlowDataStorage1Icon = forwardRef(function DataFlowDataStorage1Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "data-flow-data-storage1-icon",
		ref,
		icon: element
	}));
});
DataFlowDataStorage1Icon.displayName = "DataFlowDataStorage1Icon";
//#endregion
export { DataFlowDataStorage1Icon, DataFlowDataStorage1Icon as default };
