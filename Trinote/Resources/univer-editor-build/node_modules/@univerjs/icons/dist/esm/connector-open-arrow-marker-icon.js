import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-open-arrow-marker-icon.tsx
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
			"d": "M6.419 12.75H19.25a.75.75 0 0 0 0-1.5H6.06l3.9-3.899a.75.75 0 0 0-1.061-1.06l-4.94 4.94-.028.03-.032.03a.75.75 0 0 0 0 1.06l4.94 4.94a.75.75 0 0 0 1.06-1.061z",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorOpenArrowMarkerIcon = forwardRef(function ConnectorOpenArrowMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-open-arrow-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorOpenArrowMarkerIcon.displayName = "ConnectorOpenArrowMarkerIcon";
//#endregion
export { ConnectorOpenArrowMarkerIcon, ConnectorOpenArrowMarkerIcon as default };
