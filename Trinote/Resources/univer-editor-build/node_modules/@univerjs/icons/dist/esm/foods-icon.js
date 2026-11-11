import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/foods-icon.tsx
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
				"d": "M8.4 4.3C9.1 3.3 10.1 2.7 11.3 2.6C11.2 3.8 10.5 4.8 9.4 5.3",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.8 4.7C6.8 3.9 5.1 4.1 4.1 5.2C2.8 6.6 2.8 9 3.6 10.9C4.3 12.6 5.4 13.7 6.4 13.7C7.1 13.7 7.4 13.3 8 13.3C8.6 13.3 8.9 13.7 9.6 13.7C10.7 13.7 11.8 12.5 12.4 10.9C13.2 8.8 12.8 6.5 11.7 5.3C10.6 4.1 8.9 3.9 7.8 4.7Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.8 4.7C7.8 3.7 7.5 3 6.8 2.4",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		}
	]
};
const FoodsIcon = forwardRef(function FoodsIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "foods-icon",
		ref,
		icon: element
	}));
});
FoodsIcon.displayName = "FoodsIcon";
//#endregion
export { FoodsIcon, FoodsIcon as default };
