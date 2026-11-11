import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/direct-export-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.2 2H3.2C2.53726 2 2 2.53726 2 3.2V12.8C2 13.4627 2.53726 14 3.2 14H12.8C13.4627 14 14 13.4627 14 12.8V11.7",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.2 2V8C7.2 10.2976 5.76983 12.6271 3.2 14",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M9.4 8H14.4M12 5.6L14.4 8L12 10.4",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const DirectExportIcon = forwardRef(function DirectExportIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "direct-export-icon",
		ref,
		icon: element
	}));
});
DirectExportIcon.displayName = "DirectExportIcon";
//#endregion
export { DirectExportIcon, DirectExportIcon as default };
