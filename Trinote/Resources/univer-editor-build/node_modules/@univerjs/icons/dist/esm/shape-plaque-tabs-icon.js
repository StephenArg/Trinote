import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-plaque-tabs-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M7 1C7 4.3137 4.3137 7 1 7V1H7ZM2.6 5.0988A4.4 4.4 0 0 0 5.0988 2.6H2.6V5.0988Z",
				"fillRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M1 13C4.3137 13 7 15.6863 7 19H1V13ZM2.6 17.4H5.0988A4.4 4.4 0 0 0 2.6 14.9012V17.4Z",
				"fillRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M13 1C13 4.3137 15.6863 7 19 7V1H13ZM17.4 5.0988A4.4 4.4 0 0 1 14.9012 2.6H17.4V5.0988Z",
				"fillRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M19 13C15.6863 13 13 15.6863 13 19H19V13ZM17.4 17.4H14.9012A4.4 4.4 0 0 1 17.4 14.9012V17.4Z",
				"fillRule": "evenodd"
			}
		}
	]
};
const ShapePlaqueTabsIcon = forwardRef(function ShapePlaqueTabsIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-plaque-tabs-icon",
		ref,
		icon: element
	}));
});
ShapePlaqueTabsIcon.displayName = "ShapePlaqueTabsIcon";
//#endregion
export { ShapePlaqueTabsIcon, ShapePlaqueTabsIcon as default };
