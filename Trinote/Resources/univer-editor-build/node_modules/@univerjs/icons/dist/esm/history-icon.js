import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/history-icon.tsx
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
				"d": "M2.35 4.9C3.43963 3.06782 5.43849 1.83984 7.725 1.83984C11.1768 1.83984 13.975 4.63806 13.975 8.08984C13.975 11.5416 11.1768 14.3398 7.725 14.3398C4.27322 14.3398 1.475 11.5416 1.475 8.08984",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2.35 2.4V4.9H4.85",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.725 4.9V8.45L10.2 10.65",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const HistoryIcon = forwardRef(function HistoryIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "history-icon",
		ref,
		icon: element
	}));
});
HistoryIcon.displayName = "HistoryIcon";
//#endregion
export { HistoryIcon, HistoryIcon as default };
