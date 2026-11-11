import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/component-diagram-assembly-connector-icon.tsx
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
				"d": "M12.25 3.325a1.05 1.05 0 1 0 0 2.1 8.575 8.575 0 0 1 0 17.15 1.05 1.05 0 1 0 0 2.1c5.74 0 10.42-4.529 10.665-10.208h2.752a1.05 1.05 0 1 0 0-2.1H22.8c-.786-5.12-5.21-9.042-10.551-9.042",
				"transform": "scale(.71429)"
			}
		}, {
			"tag": "path",
			"attrs": {
				"d": "M12.25 6.534a7.47 7.47 0 0 0-7.287 5.833h-2.63a1.05 1.05 0 1 0 0 2.1h2.465a7.467 7.467 0 1 0 7.452-7.933M6.883 14a5.367 5.367 0 1 1 10.734 0 5.367 5.367 0 0 1-10.734 0",
				"transform": "scale(.71429)",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}]
	}]
};
const ComponentDiagramAssemblyConnectorIcon = forwardRef(function ComponentDiagramAssemblyConnectorIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "component-diagram-assembly-connector-icon",
		ref,
		icon: element
	}));
});
ComponentDiagramAssemblyConnectorIcon.displayName = "ComponentDiagramAssemblyConnectorIcon";
//#endregion
export { ComponentDiagramAssemblyConnectorIcon, ComponentDiagramAssemblyConnectorIcon as default };
