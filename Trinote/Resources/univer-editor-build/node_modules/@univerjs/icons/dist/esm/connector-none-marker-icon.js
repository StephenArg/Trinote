import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-none-marker-icon.tsx
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
			"stroke": "currentColor",
			"d": "M4 12h16",
			"transform": "scale(.83333)",
			"strokeLinecap": "round",
			"strokeWidth": 1.5
		}
	}]
};
const ConnectorNoneMarkerIcon = forwardRef(function ConnectorNoneMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-none-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorNoneMarkerIcon.displayName = "ConnectorNoneMarkerIcon";
//#endregion
export { ConnectorNoneMarkerIcon, ConnectorNoneMarkerIcon as default };
