import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/chord-chart-icon.tsx
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
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M88 10.8C88 65 115 115 129.3 152.8",
				"transform": "translate(.1 .1)scale(.08977)",
				"strokeLinecap": "round",
				"strokeWidth": 13
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M146.3 37.5C105 43 67 104 37.3 145.7",
				"transform": "translate(.1 .1)scale(.08977)",
				"strokeLinecap": "round",
				"strokeWidth": 13
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M14.2 65.8C60 82 116 95 161.8 109.8",
				"transform": "translate(.1 .1)scale(.08977)",
				"strokeLinecap": "round",
				"strokeWidth": 13
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M88 5.5A5.5 5.5 0 0 1 93.9 0a88 88 0 0 1 46.1 158.8 5.5 5.5 0 0 1-7.9-1.5l-2.8-4.5A77.2 77.2 0 0 0 88 10.8V5.5Z",
				"transform": "translate(.1 .1)scale(.08977)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M122 162.8a5.5 5.5 0 0 1-3.1 7.4 88 88 0 0 1-84.3-12.5 5.5 5.5 0 0 1-.8-8l3.5-4a77.2 77.2 0 0 0 82.5 12.2l2.2 4.9Z",
				"transform": "translate(.1 .1)scale(.08977)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M25.7 141.6a5.5 5.5 0 0 1-8 .1A88 88 0 0 1 2.2 68.4a5.5 5.5 0 0 1 6.9-4.1l5.1 1.5a77.2 77.2 0 0 0 15.5 72.3l-4 3.5Z",
				"transform": "translate(.1 .1)scale(.08977)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M13.2 53.5a5.5 5.5 0 0 1-2.6-7.6A88 88 0 0 1 70 1.7a5.5 5.5 0 0 1 6.5 4.6l.8 5.3a77.2 77.2 0 0 0-59.3 44.2l-4.8-2.3Z",
				"transform": "translate(.1 .1)scale(.08977)"
			}
		}
	]
};
const ChordChartIcon = forwardRef(function ChordChartIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "chord-chart-icon",
		ref,
		icon: element
	}));
});
ChordChartIcon.displayName = "ChordChartIcon";
//#endregion
export { ChordChartIcon, ChordChartIcon as default };
