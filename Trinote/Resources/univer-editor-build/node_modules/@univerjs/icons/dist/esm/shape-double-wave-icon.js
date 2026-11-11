import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-double-wave-icon.tsx
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
			"d": "M2 4.25C4.45 3.45 6.35 3.75 8.1 4.75C9.7 5.65 11.2 5.65 12.85 4.65C14.5 3.65 16.1 3.8 18 4.4V15.75C15.95 16.45 14.15 16.1 12.55 14.85C11.2 13.8 9.55 13.8 8.15 14.8C6.55 15.9 4.55 16.1 2 15.3V4.25Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeDoubleWaveIcon = forwardRef(function ShapeDoubleWaveIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-double-wave-icon",
		ref,
		icon: element
	}));
});
ShapeDoubleWaveIcon.displayName = "ShapeDoubleWaveIcon";
//#endregion
export { ShapeDoubleWaveIcon, ShapeDoubleWaveIcon as default };
