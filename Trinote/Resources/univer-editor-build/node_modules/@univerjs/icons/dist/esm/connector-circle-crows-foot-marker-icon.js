import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-circle-crows-foot-marker-icon.tsx
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
			"fill": "currentColor",
			"d": "M10.75 11.99a2.25 2.25 0 1 1 0 .02v-.02m-1.26-1.31a3.751 3.751 0 0 1 7.186.57H19a.75.75 0 0 1 0 1.5h-2.325a3.751 3.751 0 0 1-7.186.57L6.45 15.6a.75.75 0 1 1-.9-1.2l2.2-1.65H6.002a.75.75 0 0 1 0-1.5h1.75L5.55 9.6a.75.75 0 1 1 .9-1.2z",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorCircleCrowsFootMarkerIcon = forwardRef(function ConnectorCircleCrowsFootMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-circle-crows-foot-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorCircleCrowsFootMarkerIcon.displayName = "ConnectorCircleCrowsFootMarkerIcon";
//#endregion
export { ConnectorCircleCrowsFootMarkerIcon, ConnectorCircleCrowsFootMarkerIcon as default };
