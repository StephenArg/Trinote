import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/status-diagram-initial-state-icon.tsx
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
		"tag": "circle",
		"attrs": {
			"cx": 12,
			"cy": 12,
			"r": 8,
			"fill": "currentColor",
			"transform": "scale(.83333)"
		}
	}]
};
const StatusDiagramInitialStateIcon = forwardRef(function StatusDiagramInitialStateIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "status-diagram-initial-state-icon",
		ref,
		icon: element
	}));
});
StatusDiagramInitialStateIcon.displayName = "StatusDiagramInitialStateIcon";
//#endregion
export { StatusDiagramInitialStateIcon, StatusDiagramInitialStateIcon as default };
