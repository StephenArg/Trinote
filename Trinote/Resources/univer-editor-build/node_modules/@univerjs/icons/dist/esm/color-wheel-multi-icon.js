import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/color-wheel-multi-icon.tsx
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
				"cx": 10,
				"cy": 10,
				"r": 9,
				"fill": "#F5F5F5"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#6646E8",
				"d": "M10 10L10 1A9 9 0 0 1 19 10Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#55B144",
				"d": "M10 10L19 10A9 9 0 0 1 10 19Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#CBC443",
				"d": "M10 10L10 19A9 9 0 0 1 1 10Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#E8433D",
				"d": "M10 10L1 10A9 9 0 0 1 10 1Z"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10,
				"cy": 10,
				"r": 9,
				"fill": "url(#color-wheel-multi-icon_color-wheel-multi-icon-radial)"
			}
		},
		{
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "radialGradient",
				"attrs": {
					"id": "color-wheel-multi-icon_color-wheel-multi-icon-radial",
					"cx": 0,
					"cy": 0,
					"r": 1,
					"gradientTransform": "matrix(0 9 -9 0 10 10)",
					"gradientUnits": "userSpaceOnUse"
				},
				"children": [{
					"tag": "stop",
					"attrs": {
						"stopColor": "white",
						"stopOpacity": .82
					}
				}, {
					"tag": "stop",
					"attrs": {
						"offset": 1,
						"stopColor": "#F5F5F5",
						"stopOpacity": .01
					}
				}]
			}]
		}
	],
	"defIds": ["color-wheel-multi-icon_color-wheel-multi-icon-radial"]
};
const ColorWheelMultiIcon = forwardRef(function ColorWheelMultiIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "color-wheel-multi-icon",
		ref,
		icon: element
	}));
});
ColorWheelMultiIcon.displayName = "ColorWheelMultiIcon";
//#endregion
export { ColorWheelMultiIcon, ColorWheelMultiIcon as default };
