import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/object-layers-icon.tsx
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
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M2 4.75 8 1.8l6 2.95L8 7.7 2 4.75Z",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.3
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "m2 7.75 6 2.95 6-2.95M2 10.75l6 2.95 6-2.95",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.3
		}
	}]
};
const ObjectLayersIcon = forwardRef(function ObjectLayersIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "object-layers-icon",
		ref,
		icon: element
	}));
});
ObjectLayersIcon.displayName = "ObjectLayersIcon";
//#endregion
export { ObjectLayersIcon, ObjectLayersIcon as default };
