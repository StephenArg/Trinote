import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/line-dashed-none-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M5 15.833L15.607 5.227",
			"strokeDasharray": "3.2 3.2",
			"strokeLinecap": "round",
			"strokeWidth": 1.6
		}
	}]
};
const LineDashedNoneIcon = forwardRef(function LineDashedNoneIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "line-dashed-none-icon",
		ref,
		icon: element
	}));
});
LineDashedNoneIcon.displayName = "LineDashedNoneIcon";
//#endregion
export { LineDashedNoneIcon, LineDashedNoneIcon as default };
