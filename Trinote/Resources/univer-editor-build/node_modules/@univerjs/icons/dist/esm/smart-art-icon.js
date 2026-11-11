import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/smart-art-icon.tsx
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
				"d": "M1.8 3.7H9.9L12.6 6.55H5.9",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.8 3.7L4.5 6.8L1.8 9.5H5.3",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.9 6.55H14.2V12.3H5.9z",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.2 7.9H7.9M8.8 7.9H13M7.2 9.4H7.9M8.8 9.4H13M7.2 10.9H7.9M8.8 10.9H13",
				"strokeWidth": .8
			}
		}
	]
};
const SmartArtIcon = forwardRef(function SmartArtIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "smart-art-icon",
		ref,
		icon: element
	}));
});
SmartArtIcon.displayName = "SmartArtIcon";
//#endregion
export { SmartArtIcon, SmartArtIcon as default };
