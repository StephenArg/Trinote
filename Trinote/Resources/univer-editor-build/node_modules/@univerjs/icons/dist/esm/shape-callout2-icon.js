import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-callout2-icon.tsx
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
			"d": "M19.0002 4V15H6.00018V4H19.0002Z",
			"strokeDasharray": "4 3",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M1.00018 17L2.50018 9H6.00018",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ShapeCallout2Icon = forwardRef(function ShapeCallout2Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-callout2-icon",
		ref,
		icon: element
	}));
});
ShapeCallout2Icon.displayName = "ShapeCallout2Icon";
//#endregion
export { ShapeCallout2Icon, ShapeCallout2Icon as default };
