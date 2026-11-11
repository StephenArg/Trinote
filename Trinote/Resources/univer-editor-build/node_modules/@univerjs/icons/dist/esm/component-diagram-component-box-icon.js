import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/component-diagram-component-box-icon.tsx
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
		"attrs": { "fill": "currentColor" },
		"children": [{
			"tag": "path",
			"attrs": {
				"d": "M13 9.917c0-.967.672-1.75 1.5-1.75h3c.828 0 1.5.783 1.5 1.75 0 .966-.672 1.75-1.5 1.75h-3c-.828 0-1.5-.784-1.5-1.75",
				"transform": "scale(.71429)"
			}
		}, {
			"tag": "path",
			"attrs": {
				"d": "M2 7c0-1.289.895-2.333 2-2.333h16c1.105 0 2 1.044 2 2.333v14c0 1.288-.895 2.333-2 2.333H4c-1.105 0-2-1.044-2-2.333zm2-.234h16c.11 0 .2.105.2.234v14c0 .129-.09.233-.2.233H4c-.11 0-.2-.104-.2-.233V7c0-.129.09-.234.2-.234",
				"transform": "scale(.71429)",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}]
	}]
};
const ComponentDiagramComponentBoxIcon = forwardRef(function ComponentDiagramComponentBoxIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "component-diagram-component-box-icon",
		ref,
		icon: element
	}));
});
ComponentDiagramComponentBoxIcon.displayName = "ComponentDiagramComponentBoxIcon";
//#endregion
export { ComponentDiagramComponentBoxIcon, ComponentDiagramComponentBoxIcon as default };
