import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/class-diagram-hollow-diamond-connector-icon.tsx
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
			"d": "M20.611 3.39 12.66 4.84l-1.179 6.464-7.825 7.768a.9.9 0 0 0 1.268 1.277l7.912-7.853 6.326-1.154zm-6.993 6.993.707-3.877 3.877-.707-.707 3.877z",
			"transform": "scale(.83333)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const ClassDiagramHollowDiamondConnectorIcon = forwardRef(function ClassDiagramHollowDiamondConnectorIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "class-diagram-hollow-diamond-connector-icon",
		ref,
		icon: element
	}));
});
ClassDiagramHollowDiamondConnectorIcon.displayName = "ClassDiagramHollowDiamondConnectorIcon";
//#endregion
export { ClassDiagramHollowDiamondConnectorIcon, ClassDiagramHollowDiamondConnectorIcon as default };
