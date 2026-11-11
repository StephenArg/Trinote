import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-bent-connector3-arrow1-icon.tsx
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
			"d": "M4 4H10V16H18",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M15 13L18 16L15 19",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeBentConnector3Arrow1Icon = forwardRef(function ShapeBentConnector3Arrow1Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-bent-connector3-arrow1-icon",
		ref,
		icon: element
	}));
});
ShapeBentConnector3Arrow1Icon.displayName = "ShapeBentConnector3Arrow1Icon";
//#endregion
export { ShapeBentConnector3Arrow1Icon, ShapeBentConnector3Arrow1Icon as default };
