import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-bar-crows-foot-marker-icon.tsx
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
			"d": "M11.751 8a.75.75 0 1 0-1.5 0v3.25L6.45 8.4a.75.75 0 0 0-.9 1.2l2.2 1.65H5a.75.75 0 0 0 0 1.5h2.75l-2.2 1.65a.75.75 0 0 0 .9 1.2l3.8-2.85V16a.75.75 0 0 0 1.5 0v-3.25h7.25a.75.75 0 1 0 0-1.5h-7.25z",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorBarCrowsFootMarkerIcon = forwardRef(function ConnectorBarCrowsFootMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-bar-crows-foot-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorBarCrowsFootMarkerIcon.displayName = "ConnectorBarCrowsFootMarkerIcon";
//#endregion
export { ConnectorBarCrowsFootMarkerIcon, ConnectorBarCrowsFootMarkerIcon as default };
