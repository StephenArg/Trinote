import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-filled-arrow-marker-icon.tsx
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
			"d": "M4.406 12.31a.357.357 0 0 1 0-.62l6.309-3.642a.357.357 0 0 1 .535.31v2.892h8a.75.75 0 0 1 0 1.5h-8v2.893a.357.357 0 0 1-.535.309z",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorFilledArrowMarkerIcon = forwardRef(function ConnectorFilledArrowMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-filled-arrow-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorFilledArrowMarkerIcon.displayName = "ConnectorFilledArrowMarkerIcon";
//#endregion
export { ConnectorFilledArrowMarkerIcon, ConnectorFilledArrowMarkerIcon as default };
