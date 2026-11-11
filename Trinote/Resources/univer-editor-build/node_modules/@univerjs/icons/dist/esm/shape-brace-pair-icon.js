import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-brace-pair-icon.tsx
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
			"d": "M7 2C5.2 2 4.4 2.75 4.4 4.6V7.3C4.4 8.55 3.85 9.35 2.6 9.9C3.85 10.45 4.4 11.25 4.4 12.5V15.4C4.4 17.25 5.2 18 7 18",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M13 2C14.8 2 15.6 2.75 15.6 4.6V7.3C15.6 8.55 16.15 9.35 17.4 9.9C16.15 10.45 15.6 11.25 15.6 12.5V15.4C15.6 17.25 14.8 18 13 18",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeBracePairIcon = forwardRef(function ShapeBracePairIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-brace-pair-icon",
		ref,
		icon: element
	}));
});
ShapeBracePairIcon.displayName = "ShapeBracePairIcon";
//#endregion
export { ShapeBracePairIcon, ShapeBracePairIcon as default };
