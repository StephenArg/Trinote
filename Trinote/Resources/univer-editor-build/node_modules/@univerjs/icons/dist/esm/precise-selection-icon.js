import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/precise-selection-icon.tsx
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
			"d": "M2.2 3.4C2.2 2.73726 2.73726 2.2 3.4 2.2H12.6C13.2627 2.2 13.8 2.73726 13.8 3.4V9.6C13.8 9.93137 13.5314 10.2 13.2 10.2C12.8686 10.2 12.6 9.93137 12.6 9.6V3.4H3.4V11.2H8.9C9.23137 11.2 9.5 11.4686 9.5 11.8C9.5 12.1314 9.23137 12.4 8.9 12.4H3.4C2.73726 12.4 2.2 11.8627 2.2 11.2V3.4Z"
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M10.0699 9.56616C10.0326 9.34249 10.282 9.17561 10.4918 9.28357L14.0903 11.1366C14.3375 11.2639 14.2635 11.6182 13.9843 11.6469L12.3317 12.0609L11.1808 13.409C11.0443 13.6291 10.6918 13.566 10.6498 13.3136L10.0699 9.56616Z"
		}
	}]
};
const PreciseSelectionIcon = forwardRef(function PreciseSelectionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "precise-selection-icon",
		ref,
		icon: element
	}));
});
PreciseSelectionIcon.displayName = "PreciseSelectionIcon";
//#endregion
export { PreciseSelectionIcon, PreciseSelectionIcon as default };
