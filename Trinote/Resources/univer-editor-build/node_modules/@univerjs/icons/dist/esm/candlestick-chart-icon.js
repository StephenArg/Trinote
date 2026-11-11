import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/candlestick-chart-icon.tsx
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
				"d": "M.7 4.4h14.6M.7 9.5h14.6M.7 15.1h14.6",
				"strokeLinecap": "round",
				"strokeWidth": .5
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2.3 2.1v12.2M6.1 3.8v8.9M9.9.8v8.6M13.7 2.8V13",
				"strokeLinecap": "round",
				"strokeWidth": 1.1
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M1.1 5h2.4v6.3H1.1zM4.9 6.2h2.4V10H4.9zM8.7 2.8h2.4v4H8.7zM12.5 5h2.4v4.2h-2.4z"
			}
		}
	]
};
const CandlestickChartIcon = forwardRef(function CandlestickChartIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "candlestick-chart-icon",
		ref,
		icon: element
	}));
});
CandlestickChartIcon.displayName = "CandlestickChartIcon";
//#endregion
export { CandlestickChartIcon, CandlestickChartIcon as default };
