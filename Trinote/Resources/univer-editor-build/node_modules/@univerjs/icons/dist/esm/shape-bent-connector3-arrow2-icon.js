import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-bent-connector3-arrow2-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2 4H10V16H18",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5 1L2 4L5 7",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M15 13L18 16L15 19",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeBentConnector3Arrow2Icon = forwardRef(function ShapeBentConnector3Arrow2Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-bent-connector3-arrow2-icon",
		ref,
		icon: element
	}));
});
ShapeBentConnector3Arrow2Icon.displayName = "ShapeBentConnector3Arrow2Icon";
//#endregion
export { ShapeBentConnector3Arrow2Icon, ShapeBentConnector3Arrow2Icon as default };
