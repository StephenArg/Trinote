import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/slideshow-theme-icon.tsx
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
				"d": "M12.9 4V3.8C12.9 3.19249 12.4075 2.7 11.8 2.7H3.2C2.59249 2.7 2.1 3.19249 2.1 3.8V9.4C2.1 10.0075 2.59249 10.5 3.2 10.5H11.8C12.4075 10.5 12.9 10.0075 12.9 9.4",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.6 5.3H8.4",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.6 7.7H7.1",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8 10.5V12.7",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.6 13.4H10.4",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 4.5,
				"height": 4.5,
				"x": 9.4,
				"y": 4.5,
				"stroke": "currentColor",
				"rx": .9,
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M9.4 6.75H13.9",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M11.65 4.5V9",
				"strokeWidth": 1.2
			}
		}
	]
};
const SlideshowThemeIcon = forwardRef(function SlideshowThemeIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "slideshow-theme-icon",
		ref,
		icon: element
	}));
});
SlideshowThemeIcon.displayName = "SlideshowThemeIcon";
//#endregion
export { SlideshowThemeIcon, SlideshowThemeIcon as default };
