import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/checkbox-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "rect",
		"attrs": {
			"width": 13,
			"height": 13,
			"x": 1.5,
			"y": 1.5,
			"stroke": "currentColor",
			"rx": 1.5,
			"strokeWidth": 1.2
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M4.5 8L6.8 10.3L11.5 5.6",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const CheckboxIcon = forwardRef(function CheckboxIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "checkbox-icon",
		ref,
		icon: element
	}));
});
CheckboxIcon.displayName = "CheckboxIcon";
//#endregion
export { CheckboxIcon, CheckboxIcon as default };
