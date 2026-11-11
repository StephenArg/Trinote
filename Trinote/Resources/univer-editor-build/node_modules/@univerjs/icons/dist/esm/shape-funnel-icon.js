import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-funnel-icon.tsx
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
			"d": "M1 4.5C1 2.567 5.0294 1 10 1C14.9706 1 19 2.567 19 4.5L14.454 15.4104C13.7046 17.209 11.9474 18.4 10 18.4C8.0526 18.4 6.2954 17.209 5.546 15.4104L1 4.5Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "ellipse",
		"attrs": {
			"cx": 10,
			"cy": 5.5,
			"stroke": "currentColor",
			"rx": 5.2,
			"ry": 1.7,
			"strokeWidth": 1.6
		}
	}]
};
const ShapeFunnelIcon = forwardRef(function ShapeFunnelIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-funnel-icon",
		ref,
		icon: element
	}));
});
ShapeFunnelIcon.displayName = "ShapeFunnelIcon";
//#endregion
export { ShapeFunnelIcon, ShapeFunnelIcon as default };
