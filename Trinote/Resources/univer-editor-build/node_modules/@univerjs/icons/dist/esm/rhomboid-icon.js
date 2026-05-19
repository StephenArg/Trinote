import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/rhomboid-icon.tsx
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
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M7.57574 1.92426C7.81005 1.68995 8.18995 1.68995 8.42426 1.92426L14.0757 7.57574C14.3101 7.81005 14.3101 8.18995 14.0757 8.42426L8.42426 14.0757C8.18995 14.3101 7.81005 14.3101 7.57574 14.0757L1.92426 8.42426C1.68995 8.18995 1.68995 7.81005 1.92426 7.57574L7.57574 1.92426Z"
		}
	}]
};
const RhomboidIcon = forwardRef(function RhomboidIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "rhomboid-icon",
		ref,
		icon: element
	}));
});
RhomboidIcon.displayName = "RhomboidIcon";
//#endregion
export { RhomboidIcon, RhomboidIcon as default };
