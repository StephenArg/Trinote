import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/cell-0-double-icon.tsx
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
				"width": 4,
				"height": 4,
				"x": 3,
				"y": 3,
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
				"y": 3,
				"fill": "colorChannel1",
				"rx": .8
			}
		}
	]
};
const Cell0DoubleIcon = forwardRef(function Cell0DoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "cell-0-double-icon",
		ref,
		icon: element
	}));
});
Cell0DoubleIcon.displayName = "Cell0DoubleIcon";
//#endregion
export { Cell0DoubleIcon, Cell0DoubleIcon as default };
