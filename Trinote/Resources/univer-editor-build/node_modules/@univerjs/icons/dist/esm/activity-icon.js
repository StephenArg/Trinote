import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/activity-icon.tsx
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
			"tag": "circle",
			"attrs": {
				"cx": 8,
				"cy": 8,
				"r": 5.6,
				"stroke": "currentColor",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2.8 6.2C5.2 6.7 8.5 5.4 10.8 2.9",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.1 12.6C5.5 10.4 8.3 7.8 13.2 7.7",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.2 2.8C8.6 5.4 9.8 8.9 9.5 13.3",
				"strokeLinecap": "round",
				"strokeWidth": 1.3
			}
		}
	]
};
const ActivityIcon = forwardRef(function ActivityIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "activity-icon",
		ref,
		icon: element
	}));
});
ActivityIcon.displayName = "ActivityIcon";
//#endregion
export { ActivityIcon, ActivityIcon as default };
