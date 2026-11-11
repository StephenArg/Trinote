import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-straight-connector1-icon.tsx
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
			"d": "M3.6 3.6L16.4 16.4",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M12.4 16.4H16.4V12.4",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeStraightConnector1Icon = forwardRef(function ShapeStraightConnector1Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-straight-connector1-icon",
		ref,
		icon: element
	}));
});
ShapeStraightConnector1Icon.displayName = "ShapeStraightConnector1Icon";
//#endregion
export { ShapeStraightConnector1Icon, ShapeStraightConnector1Icon as default };
