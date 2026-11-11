import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/class-diagram-filled-arrow-connector-icon.tsx
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
			"d": "M20.388 4.938A1.1 1.1 0 0 0 19.11 3.66l-7.116 1.292a1.1 1.1 0 0 0-.582 1.86L13.64 9.04l-9.782 9.782a.9.9 0 0 0 1.273 1.273l9.782-9.782 2.324 2.323a1.1 1.1 0 0 0 1.86-.58zM13.63 6.484l4.808-.873-.873 4.808z",
			"transform": "scale(.83333)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ClassDiagramFilledArrowConnectorIcon = forwardRef(function ClassDiagramFilledArrowConnectorIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "class-diagram-filled-arrow-connector-icon",
		ref,
		icon: element
	}));
});
ClassDiagramFilledArrowConnectorIcon.displayName = "ClassDiagramFilledArrowConnectorIcon";
//#endregion
export { ClassDiagramFilledArrowConnectorIcon, ClassDiagramFilledArrowConnectorIcon as default };
