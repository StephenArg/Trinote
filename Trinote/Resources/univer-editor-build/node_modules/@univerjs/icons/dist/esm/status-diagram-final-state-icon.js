import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/status-diagram-final-state-icon.tsx
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
		"tag": "g",
		"attrs": {
			"stroke": "currentColor",
			"transform": "scale(.83333)",
			"strokeWidth": 1.8
		},
		"children": [{
			"tag": "circle",
			"attrs": {
				"cx": 12,
				"cy": 12,
				"r": 9
			}
		}, {
			"tag": "circle",
			"attrs": {
				"cx": 12,
				"cy": 12,
				"r": 6,
				"fill": "currentColor"
			}
		}]
	}]
};
const StatusDiagramFinalStateIcon = forwardRef(function StatusDiagramFinalStateIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "status-diagram-final-state-icon",
		ref,
		icon: element
	}));
});
StatusDiagramFinalStateIcon.displayName = "StatusDiagramFinalStateIcon";
//#endregion
export { StatusDiagramFinalStateIcon, StatusDiagramFinalStateIcon as default };
