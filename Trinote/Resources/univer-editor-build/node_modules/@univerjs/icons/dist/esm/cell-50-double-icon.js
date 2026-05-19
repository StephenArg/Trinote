import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/cell-50-double-icon.tsx
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
				"width": 4,
				"height": 4,
				"x": 3,
				"y": 9,
				"fill": "colorChannel1",
				"rx": .8
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 4,
				"height": 4,
				"x": 9,
				"y": 9,
				"fill": "colorChannel1",
				"rx": .8
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
const Cell50DoubleIcon = forwardRef(function Cell50DoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "cell-50-double-icon",
		ref,
		icon: element
	}));
});
Cell50DoubleIcon.displayName = "Cell50DoubleIcon";
//#endregion
export { Cell50DoubleIcon, Cell50DoubleIcon as default };
