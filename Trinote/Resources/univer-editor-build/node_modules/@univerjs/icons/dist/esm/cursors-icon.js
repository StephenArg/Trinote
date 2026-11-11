import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/cursors-icon.tsx
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
			"stroke": "currentColor",
			"d": "M2.16434 1.85401C1.87594 1.73369 1.58459 2.02503 1.70492 2.31343L6.63002 14.1206C6.7519 14.4127 7.16877 14.3979 7.26964 14.098L8.69811 9.85023C8.73242 9.7482 8.81299 9.66763 8.91502 9.63332L13.9494 7.94055C14.2554 7.83766 14.2641 7.4082 13.9625 7.28235L2.16434 1.85401Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.3
		}
	}]
};
const CursorsIcon = forwardRef(function CursorsIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "cursors-icon",
		ref,
		icon: element
	}));
});
CursorsIcon.displayName = "CursorsIcon";
//#endregion
export { CursorsIcon, CursorsIcon as default };
