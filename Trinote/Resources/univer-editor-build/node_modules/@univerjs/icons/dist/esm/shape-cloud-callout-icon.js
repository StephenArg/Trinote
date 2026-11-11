import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-cloud-callout-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "circle",
			"attrs": {
				"cx": 8,
				"cy": 17,
				"r": 2,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 4,
				"cy": 19,
				"r": 1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "clipPath",
			"attrs": { "id": "shape-cloud-callout-icon-clip" },
			"children": [{
				"tag": "path",
				"attrs": { "d": "M8 1C9.2853 1 10.457 1.42475 11.3428 2.12207C11.8615 1.96265 12.419 1.875 13 1.875C15.7614 1.875 18 3.83375 18 6.25C18 6.96644 17.801 7.64142 17.4521 8.23828C18.9433 8.74691 20 10.0153 20 11.5C20 13.433 18.2091 15 16 15C15.2712 15 14.5885 14.8283 14 14.5303C13.4115 14.8283 12.7288 15 12 15C10.4354 15 9.0812 14.2137 8.42383 13.0684C7.72298 14.226 6.45206 15 5 15C2.79086 15 1 13.2091 1 11C1 9.31993 2.03608 7.88253 3.50391 7.29004C3.18147 6.71156 3 6.06192 3 5.375C3 2.95875 5.23858 1 8 1Z" }
			}]
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8 1C9.2853 1 10.457 1.42475 11.3428 2.12207C11.8615 1.96265 12.419 1.875 13 1.875C15.7614 1.875 18 3.83375 18 6.25C18 6.96644 17.801 7.64142 17.4521 8.23828C18.9433 8.74691 20 10.0153 20 11.5C20 13.433 18.2091 15 16 15C15.2712 15 14.5885 14.8283 14 14.5303C13.4115 14.8283 12.7288 15 12 15C10.4354 15 9.0812 14.2137 8.42383 13.0684C7.72298 14.226 6.45206 15 5 15C2.79086 15 1 13.2091 1 11C1 9.31993 2.03608 7.88253 3.50391 7.29004C3.18147 6.71156 3 6.06192 3 5.375C3 2.95875 5.23858 1 8 1Z",
				"strokeWidth": 3.2,
				"clipPath": "url(#shape-cloud-callout-icon-clip)"
			}
		}
	]
};
const ShapeCloudCalloutIcon = forwardRef(function ShapeCloudCalloutIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-cloud-callout-icon",
		ref,
		icon: element
	}));
});
ShapeCloudCalloutIcon.displayName = "ShapeCloudCalloutIcon";
//#endregion
export { ShapeCloudCalloutIcon, ShapeCloudCalloutIcon as default };
