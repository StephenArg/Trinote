import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/class-diagram-filled-diamond-connector-icon.tsx
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
			"d": "m20.338 3.67-6.836 1.247-.959 5.258-8.617 8.618a.9.9 0 0 0 1.272 1.273l8.594-8.593 5.3-.966z",
			"transform": "scale(.83333)"
		}
	}]
};
const ClassDiagramFilledDiamondConnectorIcon = forwardRef(function ClassDiagramFilledDiamondConnectorIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "class-diagram-filled-diamond-connector-icon",
		ref,
		icon: element
	}));
});
ClassDiagramFilledDiamondConnectorIcon.displayName = "ClassDiagramFilledDiamondConnectorIcon";
//#endregion
export { ClassDiagramFilledDiamondConnectorIcon, ClassDiagramFilledDiamondConnectorIcon as default };
