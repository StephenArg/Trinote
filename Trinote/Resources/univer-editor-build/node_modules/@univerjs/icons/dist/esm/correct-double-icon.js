import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/correct-double-icon.tsx
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
		"tag": "circle",
		"attrs": {
			"cx": 8,
			"cy": 8,
			"r": 7,
			"fill": "currentColor"
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "colorChannel1",
			"d": "M11.7245 5.57564C11.4901 5.34132 11.1102 5.34132 10.8759 5.57564L7.3002 9.15137L5.72446 7.57564C5.49014 7.34132 5.11025 7.34132 4.87593 7.57564C4.64162 7.80995 4.64162 8.18985 4.87593 8.42417L6.87593 10.4242C7.11025 10.6585 7.49014 10.6585 7.72446 10.4242L11.7245 6.42417C11.9588 6.18985 11.9588 5.80995 11.7245 5.57564Z"
		}
	}]
};
const CorrectDoubleIcon = forwardRef(function CorrectDoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "correct-double-icon",
		ref,
		icon: element
	}));
});
CorrectDoubleIcon.displayName = "CorrectDoubleIcon";
//#endregion
export { CorrectDoubleIcon, CorrectDoubleIcon as default };
