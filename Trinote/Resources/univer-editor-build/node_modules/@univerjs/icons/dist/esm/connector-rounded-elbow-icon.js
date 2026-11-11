import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-rounded-elbow-icon.tsx
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
			"d": "M14.25 8.025a1.1 1.1 0 0 0-1.1 1.1v5.75a2.9 2.9 0 0 1-2.9 2.9H5.16a.9.9 0 0 1 0-1.8h5.09a1.1 1.1 0 0 0 1.1-1.1v-5.75a2.9 2.9 0 0 1 2.9-2.9h5.09a.9.9 0 1 1 0 1.8z",
			"transform": "scale(.83333) translate(-2.16 -2.16)scale(1.18)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ConnectorRoundedElbowIcon = forwardRef(function ConnectorRoundedElbowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-rounded-elbow-icon",
		ref,
		icon: element
	}));
});
ConnectorRoundedElbowIcon.displayName = "ConnectorRoundedElbowIcon";
//#endregion
export { ConnectorRoundedElbowIcon, ConnectorRoundedElbowIcon as default };
