import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-action-button-sound-icon.tsx
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
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.8 1.8H18.2V18.2H1.8z",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M12 16L8 13H4V7H8L12 4V16ZM8.5 8.6H5.6V11.4H8.5L10.4 12.825V7.174L8.5 8.6Z",
				"fillRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M13.5 7.8L15.2 6.8",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M13.5 10H15.5",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M13.5 12.2L15.2 13.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const ShapeActionButtonSoundIcon = forwardRef(function ShapeActionButtonSoundIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-action-button-sound-icon",
		ref,
		icon: element
	}));
});
ShapeActionButtonSoundIcon.displayName = "ShapeActionButtonSoundIcon";
//#endregion
export { ShapeActionButtonSoundIcon, ShapeActionButtonSoundIcon as default };
