import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/status-diagram-state-bar-icon.tsx
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
		"tag": "rect",
		"attrs": {
			"width": 18,
			"height": 4,
			"x": 3,
			"y": 10,
			"fill": "currentColor",
			"rx": 2,
			"transform": "scale(.83333)"
		}
	}]
};
const StatusDiagramStateBarIcon = forwardRef(function StatusDiagramStateBarIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "status-diagram-state-bar-icon",
		ref,
		icon: element
	}));
});
StatusDiagramStateBarIcon.displayName = "StatusDiagramStateBarIcon";
//#endregion
export { StatusDiagramStateBarIcon, StatusDiagramStateBarIcon as default };
