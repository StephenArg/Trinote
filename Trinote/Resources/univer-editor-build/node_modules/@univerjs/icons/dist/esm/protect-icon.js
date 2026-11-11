import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/protect-icon.tsx
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
				"d": "M14.2638 7.63727V3.9999C14.2638 2.89533 13.3683 1.9999 12.2638 1.9999L3.56389 1.99999C2.45932 2 1.56392 2.89542 1.56392 3.99998L1.56387 11.6666C1.56386 12.7712 2.4593 13.6666 3.56387 13.6666H8.0542",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.5639 6.17762H14.2638M5.79725 1.99996V6.17762M10.0307 1.99993V6.17762",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M11.5223 11.2333V10.2333C11.5223 9.681 11.97 9.23328 12.5223 9.23328C13.0746 9.23328 13.5223 9.681 13.5223 10.2333V11.2333",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 4,
				"height": 2.67,
				"x": 10.52,
				"y": 11.23,
				"stroke": "currentColor",
				"rx": 1,
				"strokeWidth": 1.2
			}
		}
	]
};
const ProtectIcon = forwardRef(function ProtectIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "protect-icon",
		ref,
		icon: element
	}));
});
ProtectIcon.displayName = "ProtectIcon";
//#endregion
export { ProtectIcon, ProtectIcon as default };
