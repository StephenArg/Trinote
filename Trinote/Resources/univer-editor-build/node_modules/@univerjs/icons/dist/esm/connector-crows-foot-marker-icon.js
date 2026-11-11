import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-crows-foot-marker-icon.tsx
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
			"d": "M6.45 8.4a.75.75 0 0 0-.9 1.2l2.2 1.65H5.002a.75.75 0 0 0 0 1.5h2.75l-2.2 1.65a.75.75 0 0 0 .9 1.2l3.8-2.85H19a.75.75 0 1 0 0-1.5h-8.75z",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorCrowsFootMarkerIcon = forwardRef(function ConnectorCrowsFootMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-crows-foot-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorCrowsFootMarkerIcon.displayName = "ConnectorCrowsFootMarkerIcon";
//#endregion
export { ConnectorCrowsFootMarkerIcon, ConnectorCrowsFootMarkerIcon as default };
