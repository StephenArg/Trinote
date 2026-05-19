import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/roundness-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "circle",
		"attrs": {
			"cx": 8,
			"cy": 8,
			"r": 6.5,
			"fill": "currentColor"
		}
	}]
};
const RoundnessIcon = forwardRef(function RoundnessIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "roundness-icon",
		ref,
		icon: element
	}));
});
RoundnessIcon.displayName = "RoundnessIcon";
//#endregion
export { RoundnessIcon, RoundnessIcon as default };
