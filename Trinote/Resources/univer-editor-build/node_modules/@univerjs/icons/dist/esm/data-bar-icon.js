import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/data-bar-icon.tsx
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
		"tag": "rect",
		"attrs": {
			"width": 13,
			"height": 5,
			"x": 1.5,
			"y": 5.5,
			"stroke": "currentColor",
			"rx": 2.5,
			"strokeWidth": 1.2
		}
	}, {
		"tag": "rect",
		"attrs": {
			"width": 6.4,
			"height": 2.6,
			"x": 2.7,
			"y": 6.7,
			"fill": "currentColor",
			"rx": 1.3
		}
	}]
};
const DataBarIcon = forwardRef(function DataBarIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "data-bar-icon",
		ref,
		icon: element
	}));
});
DataBarIcon.displayName = "DataBarIcon";
//#endregion
export { DataBarIcon, DataBarIcon as default };
