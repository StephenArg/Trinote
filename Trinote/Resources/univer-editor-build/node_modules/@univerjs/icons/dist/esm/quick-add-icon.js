import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/quick-add-icon.tsx
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
			"d": "M13.518 3.816a.51.51 0 0 1 0 .72l-.798.797.797.798a.51.51 0 0 1-.72.72L12 6.054l-.797.797a.51.51 0 0 1-.72-.72l.797-.798-.798-.797a.51.51 0 0 1 .72-.72l.798.797.797-.797a.51.51 0 0 1 .72 0M9.25 8.25a1 1 0 0 0-1 1v5.5a1 1 0 0 0 1 1h5.5a1 1 0 0 0 1-1v-5.5a1 1 0 0 0-1-1zm4.268 9.62a.51.51 0 0 0-.72-.72l-.798.797-.797-.798a.51.51 0 0 0-.72.72l.797.798-.798.797a.51.51 0 0 0 .72.72l.798-.797.797.797a.51.51 0 0 0 .72-.72l-.797-.797zM6.85 10.482a.51.51 0 0 1 0 .72L6.053 12l.798.797a.51.51 0 0 1-.72.72l-.798-.797-.797.798a.51.51 0 1 1-.72-.72L4.613 12l-.797-.797a.51.51 0 1 1 .72-.72l.797.797.798-.797a.51.51 0 0 1 .72 0m13.333.72a.51.51 0 1 0-.72-.72l-.797.797-.798-.797a.51.51 0 1 0-.72.72l.797.797-.797.797a.51.51 0 1 0 .72.72l.798-.797.797.798a.51.51 0 1 0 .72-.72L19.387 12zM9.75 9.75v4.5h4.5v-4.5z",
			"transform": "scale(.83333)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const QuickAddIcon = forwardRef(function QuickAddIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "quick-add-icon",
		ref,
		icon: element
	}));
});
QuickAddIcon.displayName = "QuickAddIcon";
//#endregion
export { QuickAddIcon, QuickAddIcon as default };
