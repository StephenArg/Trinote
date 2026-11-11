import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/component-diagram-required-interface-icon.tsx
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
			"d": "M6.883 3.5a1.05 1.05 0 0 0 0 2.1 8.283 8.283 0 0 1 0 16.567 1.05 1.05 0 0 0 0 2.1c5.385 0 9.812-4.1 10.333-9.347q.081.013.167.013h4.667a1.05 1.05 0 1 0 0-2.1h-4.667q-.086 0-.167.014C16.696 7.599 12.268 3.5 6.883 3.5",
			"transform": "scale(.71429)"
		}
	}]
};
const ComponentDiagramRequiredInterfaceIcon = forwardRef(function ComponentDiagramRequiredInterfaceIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "component-diagram-required-interface-icon",
		ref,
		icon: element
	}));
});
ComponentDiagramRequiredInterfaceIcon.displayName = "ComponentDiagramRequiredInterfaceIcon";
//#endregion
export { ComponentDiagramRequiredInterfaceIcon, ComponentDiagramRequiredInterfaceIcon as default };
