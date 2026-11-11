import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-cross-marker-icon.tsx
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
			"d": "M10.751 8a.75.75 0 1 0-1.5 0v3.25h-4.25a.75.75 0 0 0 0 1.5h4.25V16a.75.75 0 1 0 1.5 0v-3.25h8.25a.75.75 0 1 0 0-1.5h-8.25z",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorCrossMarkerIcon = forwardRef(function ConnectorCrossMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-cross-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorCrossMarkerIcon.displayName = "ConnectorCrossMarkerIcon";
//#endregion
export { ConnectorCrossMarkerIcon, ConnectorCrossMarkerIcon as default };
