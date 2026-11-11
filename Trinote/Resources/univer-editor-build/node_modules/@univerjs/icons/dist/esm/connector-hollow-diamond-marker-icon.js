import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-hollow-diamond-marker-icon.tsx
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
			"d": "M6.704 12 8.5 10.803 10.296 12 8.5 13.197zM8.5 9l3.148 2.099.227.151H19a.75.75 0 0 1 0 1.5h-7.125l-.227.151L8.5 15l-3.148-2.099L4 12l1.352-.901z",
			"transform": "scale(.83333) rotate(180 12 12)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorHollowDiamondMarkerIcon = forwardRef(function ConnectorHollowDiamondMarkerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-hollow-diamond-marker-icon",
		ref,
		icon: element
	}));
});
ConnectorHollowDiamondMarkerIcon.displayName = "ConnectorHollowDiamondMarkerIcon";
//#endregion
export { ConnectorHollowDiamondMarkerIcon, ConnectorHollowDiamondMarkerIcon as default };
