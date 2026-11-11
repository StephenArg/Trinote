import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/class-diagram-interface-icon.tsx
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
			"d": "M3.8 8.683V6c0-.11.09-.2.2-.2h16c.11 0 .2.09.2.2v2.683zm0 1.8V18c0 .11.09.2.2.2h16a.2.2 0 0 0 .2-.2v-7.517zM4 20a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z",
			"transform": "scale(.83333)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ClassDiagramInterfaceIcon = forwardRef(function ClassDiagramInterfaceIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "class-diagram-interface-icon",
		ref,
		icon: element
	}));
});
ClassDiagramInterfaceIcon.displayName = "ClassDiagramInterfaceIcon";
//#endregion
export { ClassDiagramInterfaceIcon, ClassDiagramInterfaceIcon as default };
