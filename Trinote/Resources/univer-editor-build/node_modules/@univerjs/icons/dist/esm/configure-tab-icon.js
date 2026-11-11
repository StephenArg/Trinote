import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/configure-tab-icon.tsx
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
			"stroke": "currentColor",
			"d": "M8.7 3.2h2.6l.4 1.7 1.4.6 1.5-.9 1.8 1.8-.9 1.5.6 1.4 1.7.4v2.6l-1.7.4-.6 1.4.9 1.5-1.8 1.8-1.5-.9-1.4.6-.4 1.7H8.7l-.4-1.7-1.4-.6-1.5.9-1.8-1.8.9-1.5-.6-1.4-1.7-.4V9.7l1.7-.4.6-1.4-.9-1.5 1.8-1.8 1.5.9 1.4-.6.4-1.7Z",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "circle",
		"attrs": {
			"cx": 10,
			"cy": 11,
			"r": 2.2,
			"stroke": "currentColor",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.6
		}
	}]
};
const ConfigureTabIcon = forwardRef(function ConfigureTabIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "configure-tab-icon",
		ref,
		icon: element
	}));
});
ConfigureTabIcon.displayName = "ConfigureTabIcon";
//#endregion
export { ConfigureTabIcon, ConfigureTabIcon as default };
