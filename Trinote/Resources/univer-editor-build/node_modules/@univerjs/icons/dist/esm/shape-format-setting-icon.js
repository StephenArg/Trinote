import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-format-setting-icon.tsx
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
				"d": "M13.5 7V4.29412C13.5 3.5794 12.8679 3 12 3H2.57143C1.70356 3 1.5 3.5794 1.5 4.29412V7V10C1.5 10.7147 1.70356 11 2.57143 11H7.71429",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.2 5.5H10.5",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.2 8.3H6.8",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M11.5565 8H12.4435L12.913 8.78261L13.8 8.57391L14.4261 9.2L14.2174 10.087L15 10.5565V11.4435L14.2174 11.913L14.4261 12.8L13.8 13.4261L12.913 13.2174L12.4435 14H11.5565L11.087 13.2174L10.2 13.4261L9.57391 12.8L9.78261 11.913L9 11.4435V10.5565L9.78261 10.087L9.57391 9.2L10.2 8.57391L11.087 8.78261L11.5565 8Z",
				"strokeLinejoin": "round"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M12.05 12.1C12.6299 12.1 13.1 11.6299 13.1 11.05C13.1 10.4701 12.6299 10 12.05 10C11.4701 10 11 10.4701 11 11.05C11 11.6299 11.4701 12.1 12.05 12.1Z"
			}
		}
	]
};
const ShapeFormatSettingIcon = forwardRef(function ShapeFormatSettingIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-format-setting-icon",
		ref,
		icon: element
	}));
});
ShapeFormatSettingIcon.displayName = "ShapeFormatSettingIcon";
//#endregion
export { ShapeFormatSettingIcon, ShapeFormatSettingIcon as default };
