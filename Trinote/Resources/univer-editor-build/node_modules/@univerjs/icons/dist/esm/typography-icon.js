import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/typography-icon.tsx
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
				"d": "M1.8 13.5L6.1 2.5L10.2 13.5",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.35
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M3.7 9.4H8.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.35
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8.8 2.1H14.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10.2 5.9H14.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M11.5 9.7H14.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M12.7 13.5H14.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const TypographyIcon = forwardRef(function TypographyIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "typography-icon",
		ref,
		icon: element
	}));
});
TypographyIcon.displayName = "TypographyIcon";
//#endregion
export { TypographyIcon, TypographyIcon as default };
