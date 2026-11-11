import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-circle-bar-marker-icon.tsx
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
			"d": "M7.75 8a.75.75 0 1 0-1.5 0v3.25H5a.75.75 0 0 0 0 1.5h1.25V16a.75.75 0 0 0 1.5 0v-3.25h1.576a3.751 3.751 0 0 0 7.35 0H19a.75.75 0 1 0 0-1.5h-2.325a3.751 3.751 0 0 0-7.35 0H7.75zm3 4a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorCircleBarMarkerIcon = forwardRef(function ConnectorCircleBarMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-circle-bar-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorCircleBarMarkerIcon.displayName = "ConnectorCircleBarMarkerIcon";
//#endregion
export { ConnectorCircleBarMarkerIcon, ConnectorCircleBarMarkerIcon as default };
