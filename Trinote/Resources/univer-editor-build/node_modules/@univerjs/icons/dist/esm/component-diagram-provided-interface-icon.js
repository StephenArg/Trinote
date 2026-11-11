import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/component-diagram-provided-interface-icon.tsx
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
			"d": "M8.705 15.398H3.293a1.05 1.05 0 1 1 0-2.1h5.412a8.516 8.516 0 0 1 16.966 1.05 8.515 8.515 0 0 1-16.966 1.05m2.036-1.05a6.415 6.415 0 1 1 12.83 0 6.415 6.415 0 0 1-12.83 0",
			"transform": "scale(.71429)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ComponentDiagramProvidedInterfaceIcon = forwardRef(function ComponentDiagramProvidedInterfaceIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "component-diagram-provided-interface-icon",
		ref,
		icon: element
	}));
});
ComponentDiagramProvidedInterfaceIcon.displayName = "ComponentDiagramProvidedInterfaceIcon";
//#endregion
export { ComponentDiagramProvidedInterfaceIcon, ComponentDiagramProvidedInterfaceIcon as default };
