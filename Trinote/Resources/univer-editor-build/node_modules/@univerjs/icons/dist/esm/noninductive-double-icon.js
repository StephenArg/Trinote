import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/noninductive-double-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "circle",
			"attrs": {
				"cx": 8,
				"cy": 8,
				"r": 6.4,
				"fill": "colorChannel1",
				"stroke": "currentColor",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 1.5,
				"height": 1.1,
				"x": 5,
				"y": 5.85,
				"fill": "currentColor",
				"rx": .55
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 1.5,
				"height": 1.1,
				"x": 9.5,
				"y": 5.85,
				"fill": "currentColor",
				"rx": .55
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.2 10.4H10.8",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const NoninductiveDoubleIcon = forwardRef(function NoninductiveDoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "noninductive-double-icon",
		ref,
		icon: element
	}));
});
NoninductiveDoubleIcon.displayName = "NoninductiveDoubleIcon";
//#endregion
export { NoninductiveDoubleIcon, NoninductiveDoubleIcon as default };
