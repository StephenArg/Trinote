import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/graph-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 17 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M6.89541 10.66A4.66667 4.66667 0 1 1 11.8957 6.00527",
			"strokeWidth": 1.2
		}
	}, {
		"tag": "rect",
		"attrs": {
			"width": 8.67,
			"height": 8.67,
			"x": 6.9,
			"y": 6.01,
			"stroke": "currentColor",
			"rx": 2,
			"strokeWidth": 1.2
		}
	}]
};
const GraphIcon = forwardRef(function GraphIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "graph-icon",
		ref,
		icon: element
	}));
});
GraphIcon.displayName = "GraphIcon";
//#endregion
export { GraphIcon, GraphIcon as default };
