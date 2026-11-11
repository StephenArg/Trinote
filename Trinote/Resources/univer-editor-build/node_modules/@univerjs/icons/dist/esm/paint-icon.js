import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/paint-icon.tsx
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
				"d": "M12.1 3.4C11.4 3.2 10.7 3.1 10 3.1C5.9 3.1 2.6 6.3 2.6 10.2C2.6 14.1 5.8 17.2 9.8 17.2H11.5C12.4 17.2 13.1 16.5 13.1 15.7V14.8C13.1 14.1 13.7 13.5 14.4 13.5H15.2C16.4 13.5 17.3 12.5 17.3 11.3C17.3 10.2 16.7 9.2 15.8 8.8",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.7
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M17.5 2.7L9.5 13.6",
				"strokeLinecap": "round",
				"strokeWidth": 1.7
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 6.3,
				"cy": 7.5,
				"r": 1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 9.3,
				"cy": 6,
				"r": 1,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 6.1,
				"cy": 11.2,
				"r": 1,
				"fill": "currentColor"
			}
		}
	]
};
const PaintIcon = forwardRef(function PaintIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "paint-icon",
		ref,
		icon: element
	}));
});
PaintIcon.displayName = "PaintIcon";
//#endregion
export { PaintIcon, PaintIcon as default };
