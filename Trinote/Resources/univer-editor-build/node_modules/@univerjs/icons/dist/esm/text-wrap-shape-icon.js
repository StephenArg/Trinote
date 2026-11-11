import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/text-wrap-shape-icon.tsx
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
			"tag": "rect",
			"attrs": {
				"width": 17,
				"height": 1.2,
				"x": 1.5,
				"y": 2.45,
				"fill": "currentColor",
				"rx": .6
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.25,
				"height": 1.2,
				"x": 1.5,
				"y": 6.1,
				"fill": "currentColor",
				"rx": .6
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.25,
				"height": 1.2,
				"x": 15.25,
				"y": 6.1,
				"fill": "currentColor",
				"rx": .6
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.25,
				"height": 1.2,
				"x": 1.5,
				"y": 9.4,
				"fill": "currentColor",
				"rx": .6
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.25,
				"height": 1.2,
				"x": 15.25,
				"y": 9.4,
				"fill": "currentColor",
				"rx": .6
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.25,
				"height": 1.2,
				"x": 1.5,
				"y": 12.7,
				"fill": "currentColor",
				"rx": .6
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.25,
				"height": 1.2,
				"x": 15.25,
				"y": 12.7,
				"fill": "currentColor",
				"rx": .6
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 17,
				"height": 1.2,
				"x": 1.5,
				"y": 16.35,
				"fill": "currentColor",
				"rx": .6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M7.55 5.45C6.50066 5.45 5.65 6.30066 5.65 7.35V12.65C5.65 13.6993 6.50066 14.55 7.55 14.55H12.45C13.4993 14.55 14.35 13.6993 14.35 12.65V7.35C14.35 6.30066 13.4993 5.45 12.45 5.45H7.55ZM7.8 6.75C7.24772 6.75 6.8 7.19772 6.8 7.75V12.25C6.8 12.8023 7.24772 13.25 7.8 13.25H12.2C12.7523 13.25 13.2 12.8023 13.2 12.25V7.75C13.2 7.19772 12.7523 6.75 12.2 6.75H7.8Z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}
	]
};
const TextWrapShapeIcon = forwardRef(function TextWrapShapeIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "text-wrap-shape-icon",
		ref,
		icon: element
	}));
});
TextWrapShapeIcon.displayName = "TextWrapShapeIcon";
//#endregion
export { TextWrapShapeIcon, TextWrapShapeIcon as default };
