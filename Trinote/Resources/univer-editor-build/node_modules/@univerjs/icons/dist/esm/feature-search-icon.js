import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/feature-search-icon.tsx
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
				"d": "M6.5 10.5H2.83299C2.43517 10.5 2.05364 10.342 1.77233 10.0607C1.49103 9.77935 1.33299 9.39782 1.33299 9V3.2C1.33299 2.80217 1.49103 2.42064 1.77233 2.13934C2.05364 1.85803 2.43517 1.7 2.83299 1.7H13.167C13.5648 1.7 13.9463 1.85803 14.2277 2.13934C14.509 2.42064 14.667 2.80217 14.667 3.2V5.5",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M4.84999 3.39999H3.74999C3.55669 3.39999 3.39999 3.55669 3.39999 3.74999V4.84999C3.39999 5.04329 3.55669 5.19999 3.74999 5.19999H4.84999C5.04329 5.19999 5.19999 5.04329 5.19999 4.84999V3.74999C5.19999 3.55669 5.04329 3.39999 4.84999 3.39999Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M8.45 3.39999H7.35C7.1567 3.39999 7 3.55669 7 3.74999V4.84999C7 5.04329 7.1567 5.19999 7.35 5.19999H8.45C8.6433 5.19999 8.8 5.04329 8.8 4.84999V3.74999C8.8 3.55669 8.6433 3.39999 8.45 3.39999Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M12.45 3.39999H11.35C11.1567 3.39999 11 3.55669 11 3.74999V4.84999C11 5.04329 11.1567 5.19999 11.35 5.19999H12.45C12.6433 5.19999 12.8 5.04329 12.8 4.84999V3.74999C12.8 3.55669 12.6433 3.39999 12.45 3.39999Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M4.84999 7H3.74999C3.55669 7 3.39999 7.1567 3.39999 7.35V8.45C3.39999 8.6433 3.55669 8.8 3.74999 8.8H4.84999C5.04329 8.8 5.19999 8.6433 5.19999 8.45V7.35C5.19999 7.1567 5.04329 7 4.84999 7Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10.9 11.8C12.5016 11.8 13.8 10.5016 13.8 8.9C13.8 7.29837 12.5016 6 10.9 6C9.29837 6 8 7.29837 8 8.9C8 10.5016 9.29837 11.8 10.9 11.8Z",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M12.95 10.95L15.15 13.15",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const FeatureSearchIcon = forwardRef(function FeatureSearchIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "feature-search-icon",
		ref,
		icon: element
	}));
});
FeatureSearchIcon.displayName = "FeatureSearchIcon";
//#endregion
export { FeatureSearchIcon, FeatureSearchIcon as default };
