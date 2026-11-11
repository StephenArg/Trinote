import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connector-swap-markers-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M3.73 4.009c-1.372.828-2.502 1.778-2.502 4.194 0 2.69 2.436 4.25 4.467 4.25h3.787",
				"transform": "translate(2 2)",
				"strokeWidth": 1.5
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M11.102 12.146a.36.36 0 0 1 0 .543l-1.825 1.588a.36.36 0 0 1-.597-.271v-3.177a.36.36 0 0 1 .597-.272z",
				"transform": "translate(2 2)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M12.182 12.017c1.374-.829 2.503-1.78 2.503-4.195 0-2.69-2.436-4.25-4.467-4.25H6.43",
				"transform": "translate(2 2)",
				"strokeWidth": 1.5
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M4.81 3.88a.36.36 0 0 1 0-.544l1.826-1.588a.36.36 0 0 1 .597.272v3.176a.36.36 0 0 1-.597.272z",
				"transform": "translate(2 2)"
			}
		}
	]
};
const ConnectorSwapMarkersIcon = forwardRef(function ConnectorSwapMarkersIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connector-swap-markers-icon",
		ref,
		icon: element
	}));
});
ConnectorSwapMarkersIcon.displayName = "ConnectorSwapMarkersIcon";
//#endregion
export { ConnectorSwapMarkersIcon, ConnectorSwapMarkersIcon as default };
