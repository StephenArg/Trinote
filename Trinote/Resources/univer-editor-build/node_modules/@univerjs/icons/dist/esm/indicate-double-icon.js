import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/indicate-double-icon.tsx
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
			"width": 12,
			"height": 12,
			"x": 2,
			"y": 2,
			"fill": "currentColor",
			"rx": 2.4
		}
	}, {
		"tag": "circle",
		"attrs": {
			"cx": 8,
			"cy": 8,
			"r": 3.75,
			"fill": "colorChannel1"
		}
	}]
};
const IndicateDoubleIcon = forwardRef(function IndicateDoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "indicate-double-icon",
		ref,
		icon: element
	}));
});
IndicateDoubleIcon.displayName = "IndicateDoubleIcon";
//#endregion
export { IndicateDoubleIcon, IndicateDoubleIcon as default };
