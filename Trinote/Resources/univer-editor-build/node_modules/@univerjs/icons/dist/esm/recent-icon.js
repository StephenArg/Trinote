import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/recent-icon.tsx
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
			"r": 5.7,
			"stroke": "currentColor",
			"strokeWidth": 1.3
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M8 4.8V8.2L10.4 9.6",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.3
		}
	}]
};
const RecentIcon = forwardRef(function RecentIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "recent-icon",
		ref,
		icon: element
	}));
});
RecentIcon.displayName = "RecentIcon";
//#endregion
export { RecentIcon, RecentIcon as default };
