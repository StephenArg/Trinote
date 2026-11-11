import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/slideshow-play-icon.tsx
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
			"tag": "rect",
			"attrs": {
				"width": 11.8,
				"height": 8.2,
				"x": 2.1,
				"y": 2.6,
				"stroke": "currentColor",
				"rx": 1.1,
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M7.1 5.7V7.9C7.1 8.34551 7.59008 8.61687 7.96748 8.37991L9.71862 7.28094C10.0717 7.05931 10.0717 6.54069 9.71862 6.31906L7.96748 5.22009C7.59008 4.98313 7.1 5.25449 7.1 5.7Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8 10.8V12.8",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.5 13.4H10.5",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		}
	]
};
const SlideshowPlayIcon = forwardRef(function SlideshowPlayIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "slideshow-play-icon",
		ref,
		icon: element
	}));
});
SlideshowPlayIcon.displayName = "SlideshowPlayIcon";
//#endregion
export { SlideshowPlayIcon, SlideshowPlayIcon as default };
