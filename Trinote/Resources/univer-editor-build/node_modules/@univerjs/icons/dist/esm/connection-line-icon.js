import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/connection-line-icon.tsx
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
			"d": "M1.42765 13.3707H4.67832C5.26375 13.3707 5.73832 12.8961 5.73832 12.3107V8.00003C5.73832 7.41462 6.2129 6.94003 6.79832 6.94003H14.0063",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.35
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M10.685 3.05336L14.1477 6.94003L10.685 10.8267",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.35
		}
	}]
};
const ConnectionLineIcon = forwardRef(function ConnectionLineIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "connection-line-icon",
		ref,
		icon: element
	}));
});
ConnectionLineIcon.displayName = "ConnectionLineIcon";
//#endregion
export { ConnectionLineIcon, ConnectionLineIcon as default };
