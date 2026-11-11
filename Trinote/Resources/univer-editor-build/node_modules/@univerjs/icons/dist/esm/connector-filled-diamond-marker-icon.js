import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-filled-diamond-marker-icon.tsx
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
			"d": "M11.875 11.25 8.5 9 4 12l4.5 3 3.375-2.25h7.043a.75.75 0 1 0 0-1.5z",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorFilledDiamondMarkerIcon = forwardRef(function ConnectorFilledDiamondMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-filled-diamond-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorFilledDiamondMarkerIcon.displayName = "ConnectorFilledDiamondMarkerIcon";
//#endregion
export { ConnectorFilledDiamondMarkerIcon, ConnectorFilledDiamondMarkerIcon as default };
