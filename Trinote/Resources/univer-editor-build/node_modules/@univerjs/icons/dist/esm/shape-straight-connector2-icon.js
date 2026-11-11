import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-straight-connector2-icon.tsx
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
				"d": "M3.6 3.6L16.4 16.4",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.6 3.6H3.6V7.6",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M12.4 16.4H16.4V12.4",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeStraightConnector2Icon = forwardRef(function ShapeStraightConnector2Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-straight-connector2-icon",
		ref,
		icon: element
	}));
});
ShapeStraightConnector2Icon.displayName = "ShapeStraightConnector2Icon";
//#endregion
export { ShapeStraightConnector2Icon, ShapeStraightConnector2Icon as default };
