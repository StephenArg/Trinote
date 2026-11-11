import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-filled-circle-marker-icon.tsx
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
			"d": "M11.93 11.25h7.32a.75.75 0 0 1 0 1.5h-7.32A4.001 4.001 0 0 1 4 12a4 4 0 0 1 7.93-.75",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorFilledCircleMarkerIcon = forwardRef(function ConnectorFilledCircleMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-filled-circle-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorFilledCircleMarkerIcon.displayName = "ConnectorFilledCircleMarkerIcon";
//#endregion
export { ConnectorFilledCircleMarkerIcon, ConnectorFilledCircleMarkerIcon as default };
