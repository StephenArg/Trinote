import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/class-diagram-class-icon.tsx
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
			"d": "M3.8 6v2.683h16.4V6a.2.2 0 0 0-.2-.2H4a.2.2 0 0 0-.2.2m0 7.683v-3.2h16.4v3.2zm0 1.8V18c0 .11.09.2.2.2h16a.2.2 0 0 0 .2-.2v-2.517zM2 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z",
			"transform": "scale(.83333)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ClassDiagramClassIcon = forwardRef(function ClassDiagramClassIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "class-diagram-class-icon",
		ref,
		icon: element
	}));
});
ClassDiagramClassIcon.displayName = "ClassDiagramClassIcon";
//#endregion
export { ClassDiagramClassIcon, ClassDiagramClassIcon as default };
