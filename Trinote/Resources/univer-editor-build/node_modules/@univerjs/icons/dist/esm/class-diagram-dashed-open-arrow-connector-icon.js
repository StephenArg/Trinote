import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/class-diagram-dashed-open-arrow-connector-icon.tsx
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
			"stroke": "currentColor",
			"d": "M6 19 18.728 6.272",
			"transform": "scale(.83333)",
			"strokeDasharray": "5 4",
			"strokeLinecap": "round",
			"strokeMiterlimit": 3.52,
			"strokeWidth": 1.8
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M19.9 6a.9.9 0 0 0-.9-.9h-6a.9.9 0 1 0 0 1.8h5.1V12a.9.9 0 0 0 1.8 0z",
			"transform": "scale(.83333)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ClassDiagramDashedOpenArrowConnectorIcon = forwardRef(function ClassDiagramDashedOpenArrowConnectorIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "class-diagram-dashed-open-arrow-connector-icon",
		ref,
		icon: element
	}));
});
ClassDiagramDashedOpenArrowConnectorIcon.displayName = "ClassDiagramDashedOpenArrowConnectorIcon";
//#endregion
export { ClassDiagramDashedOpenArrowConnectorIcon, ClassDiagramDashedOpenArrowConnectorIcon as default };
