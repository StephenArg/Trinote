import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/freeze-to-selected-icon.tsx
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
				"d": "M1.74014 4.65986L4.66011 1.73989M1.74014 7.85986L7.86011 1.73989M1.74014 11.0599L11.2601 1.73989M1.74014 14.2599L7.39256 8.60744M8.89317 7.10684L14.2601 1.73989M4.94011 14.2599L7.39256 11.8074M12.0932 7.10684L14.2601 4.93989",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.39256 7.10684H14.2601M7.39256 7.10684V14.2599",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 12.52,
				"height": 12.52,
				"x": 1.74,
				"y": 1.74,
				"stroke": "currentColor",
				"rx": 2,
				"strokeWidth": 1.2
			}
		}
	]
};
const FreezeToSelectedIcon = forwardRef(function FreezeToSelectedIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "freeze-to-selected-icon",
		ref,
		icon: element
	}));
});
FreezeToSelectedIcon.displayName = "FreezeToSelectedIcon";
//#endregion
export { FreezeToSelectedIcon, FreezeToSelectedIcon as default };
