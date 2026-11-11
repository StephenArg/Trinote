import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/progress-0-double-icon.tsx
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
			"r": 6.5,
			"fill": "colorChannel1"
		}
	}, {
		"tag": "circle",
		"attrs": {
			"cx": 8,
			"cy": 8,
			"r": 6.5,
			"stroke": "currentColor",
			"strokeWidth": .75
		}
	}]
};
const Progress0DoubleIcon = forwardRef(function Progress0DoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "progress-0-double-icon",
		ref,
		icon: element
	}));
});
Progress0DoubleIcon.displayName = "Progress0DoubleIcon";
//#endregion
export { Progress0DoubleIcon, Progress0DoubleIcon as default };
