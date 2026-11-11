import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-circle-marker-icon.tsx
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
			"d": "M10.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m1.43.75A4.001 4.001 0 0 1 4 12a4 4 0 0 1 7.93-.75H19a.75.75 0 0 1 0 1.5z",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorCircleMarkerIcon = forwardRef(function ConnectorCircleMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-circle-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorCircleMarkerIcon.displayName = "ConnectorCircleMarkerIcon";
//#endregion
export { ConnectorCircleMarkerIcon, ConnectorCircleMarkerIcon as default };
