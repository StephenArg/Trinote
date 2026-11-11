import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/grid-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "rect",
		"attrs": {
			"width": 12.06,
			"height": 12.06,
			"x": 1.97,
			"y": 1.97,
			"stroke": "currentColor",
			"rx": .63,
			"strokeWidth": 1.27
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M5.7777 1.96817V14.0317M9.90468 1.96817V14.0317M1.96817 6.09516H14.0317M1.96817 9.90468H14.0317",
			"strokeWidth": 1.27
		}
	}]
};
const GridIcon = forwardRef(function GridIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "grid-icon",
		ref,
		icon: element
	}));
});
GridIcon.displayName = "GridIcon";
//#endregion
export { GridIcon, GridIcon as default };
