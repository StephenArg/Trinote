import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/data-flow-circle-icon.tsx
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
		"tag": "circle",
		"attrs": {
			"cx": 12,
			"cy": 12,
			"r": 6,
			"stroke": "currentColor",
			"transform": "scale(.83333)",
			"strokeWidth": 2
		}
	}]
};
const DataFlowCircleIcon = forwardRef(function DataFlowCircleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "data-flow-circle-icon",
		ref,
		icon: element
	}));
});
DataFlowCircleIcon.displayName = "DataFlowCircleIcon";
//#endregion
export { DataFlowCircleIcon, DataFlowCircleIcon as default };
