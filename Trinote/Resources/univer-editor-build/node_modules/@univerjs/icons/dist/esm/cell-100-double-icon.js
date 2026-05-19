import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/cell-100-double-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "rect",
			"attrs": {
				"width": 3.2,
				"height": 3.2,
				"x": 3.4,
				"y": 9.4,
				"fill": "white",
				"stroke": "currentColor",
				"rx": .55,
				"strokeWidth": .8
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.2,
				"height": 3.2,
				"x": 9.4,
				"y": 9.4,
				"fill": "white",
				"stroke": "currentColor",
				"rx": .55,
				"strokeWidth": .8
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.2,
				"height": 3.2,
				"x": 3.4,
				"y": 3.4,
				"fill": "white",
				"stroke": "currentColor",
				"rx": .55,
				"strokeWidth": .8
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.2,
				"height": 3.2,
				"x": 9.4,
				"y": 3.4,
				"fill": "white",
				"stroke": "currentColor",
				"rx": .55,
				"strokeWidth": .8
			}
		}
	]
};
const Cell100DoubleIcon = forwardRef(function Cell100DoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "cell-100-double-icon",
		ref,
		icon: element
	}));
});
Cell100DoubleIcon.displayName = "Cell100DoubleIcon";
//#endregion
export { Cell100DoubleIcon, Cell100DoubleIcon as default };
