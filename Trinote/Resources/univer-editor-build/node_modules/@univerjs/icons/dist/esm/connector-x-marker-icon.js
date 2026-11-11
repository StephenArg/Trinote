import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-x-marker-icon.tsx
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
			"d": "M5.642 15.359a.75.75 0 0 1 0-1.061L7.19 12.75H5a.75.75 0 0 1 0-1.5h2.19L5.642 9.702a.75.75 0 0 1 1.06-1.06l2.299 2.297 2.298-2.298a.75.75 0 0 1 1.06 1.06l-1.547 1.549H19a.75.75 0 0 1 0 1.5h-8.188l1.548 1.548a.75.75 0 0 1-1.061 1.06L9.001 13.06 6.703 15.36a.75.75 0 0 1-1.06 0",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorXMarkerIcon = forwardRef(function ConnectorXMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-x-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorXMarkerIcon.displayName = "ConnectorXMarkerIcon";
//#endregion
export { ConnectorXMarkerIcon, ConnectorXMarkerIcon as default };
