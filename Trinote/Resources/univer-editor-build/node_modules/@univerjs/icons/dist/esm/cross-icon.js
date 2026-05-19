import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/cross-icon.tsx
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
			"width": 10,
			"height": 2,
			"x": 3,
			"y": 7,
			"fill": "currentColor",
			"rx": .75
		}
	}]
};
const CrossIcon = forwardRef(function CrossIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "cross-icon",
		ref,
		icon: element
	}));
});
CrossIcon.displayName = "CrossIcon";
//#endregion
export { CrossIcon, CrossIcon as default };
