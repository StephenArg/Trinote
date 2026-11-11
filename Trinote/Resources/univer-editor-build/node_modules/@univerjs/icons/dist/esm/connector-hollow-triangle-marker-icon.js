import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-hollow-triangle-marker-icon.tsx
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
			"d": "m5.12 11.134-.023.014-.406.234-.535.309a.357.357 0 0 0 0 .618l.535.31.406.233.023.014 4.38 2.529.023.013.406.235.536.309a.357.357 0 0 0 .535-.31V12.75h8.25a.75.75 0 0 0 0-1.5H11V8.357a.357.357 0 0 0-.535-.309l-.536.31-.406.234-.023.013zM9.5 12v1.663L6.62 12l2.88-1.663z",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorHollowTriangleMarkerIcon = forwardRef(function ConnectorHollowTriangleMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-hollow-triangle-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorHollowTriangleMarkerIcon.displayName = "ConnectorHollowTriangleMarkerIcon";
//#endregion
export { ConnectorHollowTriangleMarkerIcon, ConnectorHollowTriangleMarkerIcon as default };
