import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-bracket-pair-icon.tsx
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
			"d": "M5 3H2V17H5",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M15 3H18V17H15",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeBracketPairIcon = forwardRef(function ShapeBracketPairIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-bracket-pair-icon",
		ref,
		icon: element
	}));
});
ShapeBracketPairIcon.displayName = "ShapeBracketPairIcon";
//#endregion
export { ShapeBracketPairIcon, ShapeBracketPairIcon as default };
