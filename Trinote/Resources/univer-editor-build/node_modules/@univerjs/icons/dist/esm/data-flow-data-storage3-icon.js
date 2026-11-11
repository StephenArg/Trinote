import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/data-flow-data-storage3-icon.tsx
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
		"tag": "g",
		"attrs": {
			"stroke": "currentColor",
			"strokeLinecap": "round",
			"strokeWidth": 2
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"d": "M4 7h16M4 17h16",
				"transform": "scale(.83333)",
				"strokeLinejoin": "round"
			}
		}, {
			"tag": "path",
			"attrs": {
				"d": "M8 12h.01M12 12h.01M16 12h.01",
				"transform": "scale(.83333)"
			}
		}]
	}]
};
const DataFlowDataStorage3Icon = forwardRef(function DataFlowDataStorage3Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "data-flow-data-storage3-icon",
		ref,
		icon: element
	}));
});
DataFlowDataStorage3Icon.displayName = "DataFlowDataStorage3Icon";
//#endregion
export { DataFlowDataStorage3Icon, DataFlowDataStorage3Icon as default };
