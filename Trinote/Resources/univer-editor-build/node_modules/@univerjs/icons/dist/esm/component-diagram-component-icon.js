import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/component-diagram-component-icon.tsx
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
			"d": "M4.667 18.667V21A2.333 2.333 0 0 0 7 23.333h16.333A2.333 2.333 0 0 0 25.667 21V7a2.333 2.333 0 0 0-2.334-2.333H7A2.333 2.333 0 0 0 4.667 7v2.333h-.584a1.75 1.75 0 0 0 0 3.5h.584v2.333h-.584a1.75 1.75 0 1 0 0 3.5zm18.666-11.9H7A.233.233 0 0 0 6.767 7v2.333h.816a1.75 1.75 0 0 1 0 3.5h-.816v2.333h.816a1.75 1.75 0 1 1 0 3.5h-.816V21c0 .129.104.233.233.233h16.333a.233.233 0 0 0 .234-.233V7a.233.233 0 0 0-.234-.234",
			"transform": "scale(.71429)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ComponentDiagramComponentIcon = forwardRef(function ComponentDiagramComponentIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "component-diagram-component-icon",
		ref,
		icon: element
	}));
});
ComponentDiagramComponentIcon.displayName = "ComponentDiagramComponentIcon";
//#endregion
export { ComponentDiagramComponentIcon, ComponentDiagramComponentIcon as default };
