import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/class-diagram-dashed-filled-arrow-connector-icon.tsx
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
		"attrs": {
			"stroke": "currentColor",
			"strokeWidth": 1.8
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"d": "m4 19.917 10.35-10.35",
				"transform": "scale(.83333)",
				"strokeDasharray": "3.6 3.6",
				"strokeLinecap": "round"
			}
		}, {
			"tag": "path",
			"attrs": {
				"d": "M18.777 5.003a.2.2 0 0 1 .232.233l-1.292 7.116a.2.2 0 0 1-.338.106l-5.824-5.824a.2.2 0 0 1 .105-.338z",
				"transform": "scale(.83333)"
			}
		}]
	}]
};
const ClassDiagramDashedFilledArrowConnectorIcon = forwardRef(function ClassDiagramDashedFilledArrowConnectorIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "class-diagram-dashed-filled-arrow-connector-icon",
		ref,
		icon: element
	}));
});
ClassDiagramDashedFilledArrowConnectorIcon.displayName = "ClassDiagramDashedFilledArrowConnectorIcon";
//#endregion
export { ClassDiagramDashedFilledArrowConnectorIcon, ClassDiagramDashedFilledArrowConnectorIcon as default };
