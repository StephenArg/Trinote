import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-wave-icon.tsx
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
			"d": "M2 3.1C5 1.15 8.3 1.15 10.85 3.25C12.9 4.9 15.4 5.45 18 4.55V16.65C15.1 17.25 12.55 16.7 10.35 15.25C7.8 13.55 5.25 13.25 2 14V3.1Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeWaveIcon = forwardRef(function ShapeWaveIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-wave-icon",
		ref,
		icon: element
	}));
});
ShapeWaveIcon.displayName = "ShapeWaveIcon";
//#endregion
export { ShapeWaveIcon, ShapeWaveIcon as default };
