import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-heptagon-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "clipPath",
			"attrs": { "id": "shape-heptagon-icon-frame-clip" },
			"children": [{
				"tag": "path",
				"attrs": { "d": "M6.2721 1L13.7279 1L19 6.2721L19 13.7279L13.7279 19L6.2721 19L1 13.7279L1 6.2721Z" }
			}]
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.2721 1L13.7279 1L19 6.2721L19 13.7279L13.7279 19L6.2721 19L1 13.7279L1 6.2721Z",
				"strokeWidth": 3.2,
				"clipPath": "url(#shape-heptagon-icon-frame-clip)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M7.25625 6.594C7.25625 6.26594 7.5222 6 7.85025 6H12.1322C12.6204 6 13.0163 6.39582 13.0163 6.8841C13.0163 6.99764 12.9944 7.11011 12.9518 7.21538L10.1416 14.1688C10.0441 14.4101 9.80992 14.568 9.54973 14.568C9.09318 14.568 8.78423 14.1027 8.96143 13.6819L11.6963 7.188H7.85025C7.5222 7.188 7.25625 6.92206 7.25625 6.594Z"
			}
		}
	]
};
const ShapeHeptagonIcon = forwardRef(function ShapeHeptagonIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-heptagon-icon",
		ref,
		icon: element
	}));
});
ShapeHeptagonIcon.displayName = "ShapeHeptagonIcon";
//#endregion
export { ShapeHeptagonIcon, ShapeHeptagonIcon as default };
