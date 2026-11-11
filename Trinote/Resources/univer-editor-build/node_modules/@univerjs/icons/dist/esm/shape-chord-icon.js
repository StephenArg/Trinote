import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-chord-icon.tsx
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
			"d": "M18.2 10C18.2 14.5287 14.5287 18.2 10 18.2C5.4713 18.2 1.8 14.5287 1.8 10C1.8 5.4713 5.4713 1.8 10 1.8L18.2 10Z",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeChordIcon = forwardRef(function ShapeChordIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-chord-icon",
		ref,
		icon: element
	}));
});
ShapeChordIcon.displayName = "ShapeChordIcon";
//#endregion
export { ShapeChordIcon, ShapeChordIcon as default };
