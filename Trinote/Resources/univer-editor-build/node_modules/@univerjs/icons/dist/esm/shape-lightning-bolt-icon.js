import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-lightning-bolt-icon.tsx
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
			"fill": "currentColor",
			"d": "M18 11.5508L12.6367 11.5508L15.0908 19L12.667 19L2 8.5L2 6.5L7 6.5L4 1L12.5 1ZM9.6953 8.1L3.875 8.1L12.6669 16.7542L10.4241 9.9508L15.3617 9.9508L11.5297 2.6L6.6953 2.6Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeLightningBoltIcon = forwardRef(function ShapeLightningBoltIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-lightning-bolt-icon",
		ref,
		icon: element
	}));
});
ShapeLightningBoltIcon.displayName = "ShapeLightningBoltIcon";
//#endregion
export { ShapeLightningBoltIcon, ShapeLightningBoltIcon as default };
