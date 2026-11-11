import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/show-dimensions-icon.tsx
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
				"d": "M4.45 3.25H10.9",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M3.25 4.45V8.95",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M12.1 4.45V6.7",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.45 10H7.75",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 2.2,
				"height": 2.2,
				"x": 2.15,
				"y": 2.15,
				"stroke": "currentColor",
				"rx": .18,
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 2.2,
				"height": 2.2,
				"x": 11,
				"y": 2.15,
				"stroke": "currentColor",
				"rx": .18,
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 2.2,
				"height": 2.2,
				"x": 2.15,
				"y": 8.9,
				"stroke": "currentColor",
				"rx": .18,
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M12.55 8.2L12.92 9.1C13.13 9.16 13.33 9.24 13.51 9.36L14.42 8.99L14.97 9.94L14.19 10.53C14.21 10.65 14.22 10.78 14.22 10.9C14.22 11.02 14.21 11.15 14.19 11.27L14.97 11.86L14.42 12.81L13.51 12.44C13.33 12.56 13.13 12.64 12.92 12.7L12.55 13.6H11.45L11.08 12.7C10.87 12.64 10.67 12.56 10.49 12.44L9.58 12.81L9.03 11.86L9.81 11.27C9.79 11.15 9.78 11.02 9.78 10.9C9.78 10.78 9.79 10.65 9.81 10.53L9.03 9.94L9.58 8.99L10.49 9.36C10.67 9.24 10.87 9.16 11.08 9.1L11.45 8.2H12.55ZM12 11.7C12.4418 11.7 12.8 11.3418 12.8 10.9C12.8 10.4582 12.4418 10.1 12 10.1C11.5582 10.1 11.2 10.4582 11.2 10.9C11.2 11.3418 11.5582 11.7 12 11.7Z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}
	]
};
const ShowDimensionsIcon = forwardRef(function ShowDimensionsIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "show-dimensions-icon",
		ref,
		icon: element
	}));
});
ShowDimensionsIcon.displayName = "ShowDimensionsIcon";
//#endregion
export { ShowDimensionsIcon, ShowDimensionsIcon as default };
