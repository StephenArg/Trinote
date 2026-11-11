import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-bar-marker-icon.tsx
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
			"d": "M10.001 7.25a.75.75 0 0 1 .75.75v3.25h8.25a.75.75 0 1 1 0 1.5h-8.25V16a.75.75 0 1 1-1.5 0v-3.25h-1.5V16a.75.75 0 0 1-1.5 0v-3.25h-1.25a.75.75 0 0 1 0-1.5h1.25V8a.75.75 0 1 1 1.5 0v3.25h1.5V8a.75.75 0 0 1 .75-.75",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorBarMarkerIcon = forwardRef(function ConnectorBarMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-bar-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorBarMarkerIcon.displayName = "ConnectorBarMarkerIcon";
//#endregion
export { ConnectorBarMarkerIcon, ConnectorBarMarkerIcon as default };
